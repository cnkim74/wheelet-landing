import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { getVehicleDetail } from "@/lib/fleet/queries";
import { AssignmentManager } from "@/components/admin/AssignmentManager";
import { Card, StatusBadge, RiskBadge, LeaseBar } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isAdminConfigured) return null;
  const { id } = await params;
  const detail = await getVehicleDetail(id);
  if (!detail) notFound();
  const { vehicle: v, assignedDrivers, availableDrivers } = detail;

  return (
    <>
      <div className="flex flex-col gap-1">
        <Link href="/admin/vehicles" className="text-xs text-gold">
          ← 차량 목록
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold sm:text-2xl">
            {v.name || v.model || "차량"}
          </h1>
          <StatusBadge status={v.status} />
          {(v.risk === "danger" || v.risk === "warn") && <RiskBadge risk={v.risk} />}
        </div>
        <p className="text-sm text-mute-300">
          {v.fleetName} · {v.plate ?? "번호 미등록"}
          {v.fuel ? ` · ${v.fuel}` : ""}
          {v.maker ? ` · ${v.maker}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <span className="text-xs text-mute-300">현재 주행</span>
          <div className="mt-1.5 font-display text-lg font-bold">
            {v.odometer_km.toLocaleString("ko-KR")} km
          </div>
        </Card>
        <Card>
          <span className="text-xs text-mute-300">약정거리</span>
          <div className="mt-2">
            <LeaseBar usage={v.leaseUsage} />
          </div>
        </Card>
        <Card>
          <span className="text-xs text-mute-300">다음 정비</span>
          <div className="mt-1.5 font-display text-lg font-bold">
            {v.next_service_km ? `${v.next_service_km.toLocaleString("ko-KR")} km` : "—"}
          </div>
        </Card>
        <Card>
          <span className="text-xs text-mute-300">배차 인원</span>
          <div className="mt-1.5 font-display text-lg font-bold">
            {assignedDrivers.length}명
          </div>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-mute-100">
          배차 관리 <span className="text-mute-400">· 한 차량에 여러 기사 배차 가능</span>
        </h2>
        <AssignmentManager
          vehicleId={v.id}
          assigned={assignedDrivers}
          available={availableDrivers}
        />
      </div>
    </>
  );
}
