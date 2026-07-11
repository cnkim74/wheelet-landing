import Link from "next/link";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { getMonthlyReport } from "@/lib/fleet/queries";
import { Card, PageHeader, won } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const KIND_COLORS: Record<string, string> = {
  charge: "#d4b36a",
  fuel: "#ff7a2f",
  maintenance: "#c9cdd4",
  toll: "#6fbf8a",
  etc: "rgba(255,255,255,.3)",
};

function monthName(ym: string): string {
  const [y, m] = ym.split("-");
  return `${y}년 ${Number(m)}월`;
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  if (!isAdminConfigured) return null;
  const { month } = await searchParams;
  const r = await getMonthlyReport(month);

  return (
    <>
      <PageHeader
        title="월간 리포트"
        subtitle={r.months.length ? monthName(r.month) : "데이터 없음"}
      />

      {/* month picker */}
      {r.months.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {r.months.map((m) => (
            <Link
              key={m}
              href={`/admin/reports?month=${m}`}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                m === r.month
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/12 text-mute-200 hover:text-fg"
              }`}
            >
              {monthName(m)}
            </Link>
          ))}
        </div>
      )}

      {r.recordCount === 0 ? (
        <Card>
          <p className="py-8 text-center text-sm text-mute-400">
            이 기간에 집계된 기록이 없습니다.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Card>
              <span className="text-xs text-mute-300">총 지출</span>
              <div className="mt-1.5 font-display text-xl font-bold text-gold">
                {won(r.totalAmount)}
              </div>
            </Card>
            <Card>
              <span className="text-xs text-mute-300">총 주행</span>
              <div className="mt-1.5 font-display text-xl font-bold">
                {Math.round(r.totalDistance).toLocaleString("ko-KR")} km
              </div>
            </Card>
            <Card>
              <span className="text-xs text-mute-300">기록 건수</span>
              <div className="mt-1.5 font-display text-xl font-bold">
                {r.recordCount}건
              </div>
            </Card>
            <Card>
              <span className="text-xs text-mute-300">차량당 평균</span>
              <div className="mt-1.5 font-display text-xl font-bold">
                {won(
                  r.byVehicle.length
                    ? Math.round(r.totalAmount / r.byVehicle.length)
                    : 0
                )}
              </div>
            </Card>
          </div>

          {/* breakdown by kind */}
          <Card>
            <span className="text-sm font-semibold">지출 구성</span>
            <div className="mt-4 flex flex-col gap-3">
              {r.byKind.map((k) => (
                <div key={k.kind} className="flex items-center gap-3">
                  <span className="w-14 text-xs text-mute-200">{k.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${k.pct}%`,
                        background: KIND_COLORS[k.kind] ?? "#d4b36a",
                      }}
                    />
                  </div>
                  <span className="w-24 text-right text-xs text-mute-100">
                    {won(k.amount)}
                  </span>
                  <span className="w-9 text-right text-xs text-mute-400">
                    {k.pct}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* by vehicle */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-ink-700">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-left text-xs text-mute-300">
                  <th className="px-4 py-3 font-medium">차량</th>
                  <th className="px-4 py-3 font-medium">플리트</th>
                  <th className="px-4 py-3 font-medium text-right">지출</th>
                  <th className="px-4 py-3 font-medium text-right">주행(km)</th>
                  <th className="px-4 py-3 font-medium text-right">건수</th>
                </tr>
              </thead>
              <tbody>
                {r.byVehicle.map((v) => (
                  <tr
                    key={v.vehicleId}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{v.label}</span>
                        <span className="text-[11px] text-mute-400">
                          {v.plate ?? "번호 미등록"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-mute-100">{v.fleetName}</td>
                    <td className="px-4 py-3 text-right font-display">{won(v.amount)}</td>
                    <td className="px-4 py-3 text-right text-mute-100">
                      {Math.round(v.distance).toLocaleString("ko-KR")}
                    </td>
                    <td className="px-4 py-3 text-right text-mute-100">{v.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
