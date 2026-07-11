"use client";

import { useTransition } from "react";
import type { DriverRef } from "@/lib/fleet/queries";
import { assignDriver, unassignDriver } from "@/lib/fleet/actions";

const roleLabel = (r: string) => (r === "manager" ? "매니저" : "기사");

export function AssignmentManager({
  vehicleId,
  assigned,
  available,
}: {
  vehicleId: string;
  assigned: DriverRef[];
  available: DriverRef[];
}) {
  const [pending, startTransition] = useTransition();

  const toggle = (memberId: string, on: boolean) =>
    startTransition(async () => {
      try {
        if (on) await assignDriver(vehicleId, memberId);
        else await unassignDriver(vehicleId, memberId);
      } catch (e) {
        alert(e instanceof Error ? e.message : "처리 실패");
      }
    });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/[0.07] bg-ink-700 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">배차된 기사</span>
          <span className="text-xs text-mute-400">{assigned.length}명</span>
        </div>
        <div className="flex flex-col gap-2">
          {assigned.length === 0 && (
            <p className="text-xs text-mute-400">아직 배차된 기사가 없습니다.</p>
          )}
          {assigned.map((d) => (
            <div
              key={d.memberId}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
            >
              <div className="flex flex-col">
                <span className="text-sm">{d.label}</span>
                <span className="text-[11px] text-mute-400">{roleLabel(d.role)}</span>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => toggle(d.memberId, false)}
                className="rounded-full border border-orange/40 px-3 py-1 text-xs text-orange disabled:opacity-50"
              >
                배차 해제
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-ink-700 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">배차 가능한 기사</span>
          <span className="text-xs text-mute-400">{available.length}명</span>
        </div>
        <div className="flex flex-col gap-2">
          {available.length === 0 && (
            <p className="text-xs text-mute-400">
              같은 플리트에 배차 가능한 기사가 없습니다.
            </p>
          )}
          {available.map((d) => (
            <div
              key={d.memberId}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
            >
              <div className="flex flex-col">
                <span className="text-sm">{d.label}</span>
                <span className="text-[11px] text-mute-400">{roleLabel(d.role)}</span>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => toggle(d.memberId, true)}
                className="rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-ink disabled:opacity-50"
              >
                + 배차
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
