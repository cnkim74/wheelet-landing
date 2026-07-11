"use client";

import { useState, useTransition } from "react";
import type { DriverRow } from "@/lib/fleet/queries";
import type { Fleet } from "@/lib/supabase/types";
import { createDriver, updateDriver, deleteDriver } from "@/lib/fleet/actions";
import { Modal, Field, SelectField } from "./Modal";

const ROLES = [
  { value: "driver", label: "기사" },
  { value: "manager", label: "매니저" },
];

export function DriversManager({
  rows,
  fleets,
}: {
  rows: DriverRow[];
  fleets: Fleet[];
}) {
  const [editing, setEditing] = useState<DriverRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const open = creating || editing != null;
  const close = () => {
    setCreating(false);
    setEditing(null);
    setError(null);
  };

  function submit(fd: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (editing) await updateDriver(fd);
        else await createDriver(fd);
        close();
      } catch (e) {
        setError(e instanceof Error ? e.message : "저장 실패");
      }
    });
  }

  function remove(row: DriverRow) {
    if (!confirm(`'${row.label}' 기사를 삭제할까요? 배차도 함께 해제됩니다.`)) return;
    const fd = new FormData();
    fd.set("id", row.id);
    startTransition(async () => {
      try {
        await deleteDriver(fd);
      } catch (e) {
        alert(e instanceof Error ? e.message : "삭제 실패");
      }
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">기사</h1>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-ink"
        >
          + 기사 등록
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-ink-700">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-mute-300">
              <th className="px-4 py-3 font-medium">기사</th>
              <th className="px-4 py-3 font-medium">역할</th>
              <th className="px-4 py-3 font-medium">플리트</th>
              <th className="px-4 py-3 font-medium">배차 차량</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-mute-400">
                  등록된 기사가 없습니다. ‘기사 등록’으로 추가하세요.
                </td>
              </tr>
            )}
            {rows.map((m) => (
              <tr
                key={m.id}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{m.label}</span>
                    {(m.phone || m.email) && (
                      <span className="text-[11px] text-mute-400">
                        {[m.phone, m.email].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-white/12 px-2 py-0.5 text-[11px] text-mute-100">
                    {m.role === "manager" ? "매니저" : "기사"}
                  </span>
                </td>
                <td className="px-4 py-3 text-mute-100">{m.fleetName}</td>
                <td className="px-4 py-3">
                  {m.vehicles.length ? (
                    <div className="flex flex-wrap gap-1">
                      {m.vehicles.map((v) => (
                        <span
                          key={v.id}
                          className="rounded-full border border-white/12 px-2 py-0.5 text-[11px] text-mute-100"
                        >
                          {v.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-mute-400">미배차</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditing(m)}
                      className="text-mute-200 hover:text-fg"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(m)}
                      className="text-mute-300 hover:text-orange"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={close} title={editing ? "기사 수정" : "기사 등록"}>
        <form action={submit} className="flex flex-col gap-4">
          {editing && <input type="hidden" name="id" value={editing.id} />}
          {!editing && (
            <SelectField
              label="플리트"
              name="fleet_id"
              required
              defaultValue={fleets[0]?.id}
              options={fleets.map((f) => ({ value: f.id, label: f.name }))}
            />
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="이름"
              name="name"
              required
              defaultValue={editing?.name}
              placeholder="김기사"
            />
            <Field
              label="연락처"
              name="phone"
              defaultValue={editing?.phone}
              placeholder="010-1234-5678"
            />
          </div>
          <Field
            label="이메일 (선택)"
            name="email"
            defaultValue={editing?.email}
            placeholder="kim@company.com"
          />
          <SelectField
            label="역할"
            name="role"
            defaultValue={editing?.role ?? "driver"}
            options={ROLES}
          />
          {error && <p className="text-sm text-orange">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-full bg-gradient-gold py-3 text-sm font-bold text-ink disabled:opacity-60"
            >
              {pending ? "저장 중…" : editing ? "저장" : "등록"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-mute-100"
            >
              취소
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
