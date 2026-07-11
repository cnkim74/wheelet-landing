"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { VehicleRow } from "@/lib/fleet/queries";
import type { Fleet } from "@/lib/supabase/types";
import { createVehicle, updateVehicle, deleteVehicle } from "@/lib/fleet/actions";
import { Modal, Field, SelectField } from "./Modal";
import { RiskBadge, StatusBadge, LeaseBar } from "./ui";

const FUELS = ["전기", "가솔린", "디젤", "하이브리드", "LPG"].map((v) => ({
  value: v,
  label: v,
}));
const CATEGORIES = [
  { value: "car", label: "자동차" },
  { value: "bike", label: "이륜차" },
  { value: "truck", label: "트럭" },
  { value: "van", label: "밴" },
];
const STATUSES = [
  { value: "active", label: "운행중" },
  { value: "idle", label: "대기" },
  { value: "service", label: "정비중" },
  { value: "inactive", label: "비활성" },
];

export function VehiclesManager({
  rows,
  fleets,
}: {
  rows: VehicleRow[];
  fleets: Fleet[];
}) {
  const [editing, setEditing] = useState<VehicleRow | null>(null);
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
        if (editing) await updateVehicle(fd);
        else await createVehicle(fd);
        close();
      } catch (e) {
        setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
      }
    });
  }

  function remove(row: VehicleRow) {
    if (!confirm(`'${row.name || row.model || row.plate}' 차량을 삭제할까요?`)) return;
    const fd = new FormData();
    fd.set("id", row.id);
    startTransition(async () => {
      try {
        await deleteVehicle(fd);
      } catch (e) {
        alert(e instanceof Error ? e.message : "삭제 실패");
      }
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">차량</h1>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-ink"
        >
          + 차량 등록
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-ink-700">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-mute-300">
              <th className="px-4 py-3 font-medium">차량</th>
              <th className="px-4 py-3 font-medium">플리트</th>
              <th className="px-4 py-3 font-medium">배차 기사</th>
              <th className="px-4 py-3 font-medium">약정거리</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-mute-400">
                  등록된 차량이 없습니다. ‘차량 등록’으로 추가하세요.
                </td>
              </tr>
            )}
            {rows.map((v) => (
              <tr
                key={v.id}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{v.name || v.model || "차량"}</span>
                    <span className="text-[11px] text-mute-400">
                      {v.plate ?? "번호 미등록"}
                      {v.fuel ? ` · ${v.fuel}` : ""}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-mute-100">{v.fleetName}</td>
                <td className="px-4 py-3">
                  {v.drivers.length ? (
                    <div className="flex flex-wrap gap-1">
                      {v.drivers.map((dr, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/12 px-2 py-0.5 text-[11px] text-mute-100"
                        >
                          {dr.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-mute-400">미배차</span>
                  )}
                </td>
                <td className="px-4 py-3 w-40">
                  <LeaseBar usage={v.leaseUsage} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={v.status} />
                    {(v.risk === "danger" || v.risk === "warn") && (
                      <RiskBadge risk={v.risk} />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 text-xs">
                    <Link href={`/admin/vehicles/${v.id}`} className="text-gold">
                      배차
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEditing(v)}
                      className="text-mute-200 hover:text-fg"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(v)}
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

      <Modal open={open} onClose={close} title={editing ? "차량 수정" : "차량 등록"}>
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
            <Field label="차량명" name="name" defaultValue={editing?.name} placeholder="예: Model 3" />
            <Field label="차량번호" name="plate" defaultValue={editing?.plate} placeholder="12가3456" />
            <Field label="제조사" name="maker" defaultValue={editing?.maker} placeholder="테슬라" />
            <Field label="모델" name="model" defaultValue={editing?.model} placeholder="Model 3" />
            <SelectField label="연료" name="fuel" defaultValue={editing?.fuel ?? "전기"} options={FUELS} />
            <SelectField label="종류" name="category" defaultValue={editing?.category ?? "car"} options={CATEGORIES} />
            <Field label="연식" name="year" type="number" defaultValue={editing?.year} placeholder="2024" />
            <SelectField label="상태" name="status" defaultValue={editing?.status ?? "active"} options={STATUSES} />
            <Field label="현재 주행(km)" name="odometer_km" type="number" defaultValue={editing?.odometer_km} placeholder="21000" />
            <Field label="약정거리(km)" name="lease_limit_km" type="number" defaultValue={editing?.lease_limit_km} placeholder="예: 100000" />
            <Field label="다음 정비(km)" name="next_service_km" type="number" defaultValue={editing?.next_service_km} placeholder="50000" />
            <Field label="대표 기사" name="driver_name" defaultValue={editing?.driver_name} placeholder="김기사" />
          </div>
          <Field label="메모" name="memo" defaultValue={editing?.memo} placeholder="비고" />
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
