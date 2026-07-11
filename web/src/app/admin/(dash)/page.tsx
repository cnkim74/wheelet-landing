import Link from "next/link";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { getDashboard, kindLabel } from "@/lib/fleet/queries";
import {
  StatCard,
  Card,
  PageHeader,
  RiskBadge,
  won,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function pctChange(cur: number, prev: number): string | null {
  if (!prev) return null;
  const d = Math.round(((cur - prev) / prev) * 100);
  return `${d > 0 ? "+" : ""}${d}%`;
}

export default async function DashboardPage() {
  if (!isAdminConfigured) return null;
  const d = await getDashboard();

  const today = new Date();
  const dateLabel = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const change = pctChange(d.monthExpense, d.monthExpensePrev);
  const maxBar = Math.max(...d.monthlySeries.map((m) => m.total), 1);

  return (
    <>
      <PageHeader title="플리트 대시보드" subtitle={`${dateLabel} · 실시간`} />

      {/* AI briefing */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gold/30 bg-[linear-gradient(120deg,#1c1a14,#101013)] p-5 sm:flex-row sm:items-center sm:gap-5">
        <div className="grid size-11 flex-none place-items-center rounded-full bg-gradient-gold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth={2}>
            <path d="M12 2l1.9 5.8L20 9.7l-5 4 1.7 6.3L12 16.4 7.3 20l1.7-6.3-5-4 6.1-1.9z" />
          </svg>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-fg-soft">
          오늘 기준 차량 <b className="text-gold">{d.totalVehicles}대</b> 중 운행중{" "}
          {d.activeVehicles}대.{" "}
          {d.riskVehicles.length > 0 ? (
            <>
              약정 위험 차량이{" "}
              <b className="text-orange">{d.riskVehicles.length}대</b> 있어요 —
              아래에서 조치하세요.
            </>
          ) : (
            <>약정 위험 차량은 없습니다.</>
          )}{" "}
          이번 달 지출 <b className="text-gold">{won(d.monthExpense)}</b>
          {change && ` (전월 대비 ${change})`}.
        </p>
        <Link
          href="/admin/reports"
          className="flex-none rounded-full bg-gradient-gold px-4 py-2 text-center text-xs font-semibold text-ink"
        >
          리포트 생성
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="관리 차량"
          value={d.totalVehicles}
          hint={`운행중 ${d.activeVehicles}`}
          hintTone="green"
        />
        <StatCard
          label="이번 달 지출"
          value={won(d.monthExpense)}
          hint={change ?? undefined}
          hintTone={
            change && change.startsWith("-") ? "green" : "orange"
          }
        />
        <StatCard
          label="약정 위험 차량"
          value={d.riskVehicles.length}
          hint="주행 페이스 주의"
          danger={d.riskVehicles.length > 0}
        />
        <StatCard
          label="정비 예정"
          value={d.serviceDueCount}
          hint={`기사 ${d.driverCount}명`}
        />
      </div>

      {/* chart + recent */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <span className="text-sm font-semibold">월별 지출 추이</span>
          <div className="mt-5 flex h-40 items-end gap-3 sm:gap-4">
            {d.monthlySeries.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md ${
                      m.current
                        ? "bg-gradient-to-t from-gold-dark to-gold-light shadow-[0_0_20px_rgba(212,179,106,.3)]"
                        : "bg-white/12"
                    }`}
                    style={{ height: `${Math.max((m.total / maxBar) * 100, 3)}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] ${m.current ? "font-semibold text-gold" : "text-mute-300"}`}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <span className="text-sm font-semibold">최근 활동</span>
          <div className="mt-4 flex flex-col gap-3">
            {d.recent.length === 0 && (
              <p className="text-xs text-mute-400">아직 기록이 없습니다.</p>
            )}
            {d.recent.map((r) => (
              <div key={r.id} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 flex-none rounded-full bg-gold" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13px]">
                    {r.title}
                    {r.amount != null && (
                      <span className="text-mute-200"> · {won(r.amount)}</span>
                    )}
                  </span>
                  <span className="text-[11px] text-mute-400">
                    {r.vehicle} · {kindLabel(r.kind)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* risk vehicles */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">약정거리 위험 차량</span>
          <Link href="/admin/vehicles" className="text-xs text-gold">
            전체 차량 →
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {d.riskVehicles.length === 0 && (
            <p className="text-xs text-mute-400">위험 차량이 없습니다. 👍</p>
          )}
          {d.riskVehicles.map((v) => (
            <Link
              key={v.id}
              href={`/admin/vehicles/${v.id}`}
              className="flex items-center gap-3 rounded-xl border border-orange/20 bg-orange/[0.05] px-4 py-3 transition-colors hover:border-orange/40"
            >
              <span className="flex-none rounded-lg bg-orange/15 px-2.5 py-1.5 text-xs font-bold text-orange">
                {v.leaseUsage}%
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  {v.name || v.model} · {v.plate ?? "번호 미등록"}
                </span>
                <span className="text-[11px] text-mute-400">
                  {v.fleetName} · {v.drivers.map((dr) => dr.label).join(", ") || "미배차"}
                </span>
              </div>
              <RiskBadge risk={v.risk} />
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
