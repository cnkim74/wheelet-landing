import "server-only";
import { getAdminClient } from "@/lib/supabase/admin";
import type {
  Fleet,
  FleetVehicle,
  FleetMember,
  FleetAssignment,
  FleetRecord,
} from "@/lib/supabase/types";

export type DriverRef = { memberId: string; label: string; role: string };

export type VehicleRow = FleetVehicle & {
  fleetName: string;
  drivers: DriverRef[];
  leaseUsage: number | null; // % of lease limit consumed
  risk: "danger" | "warn" | "safe" | "none";
  serviceDue: boolean;
};

export type DriverRow = FleetMember & {
  fleetName: string;
  label: string;
  vehicleCount: number;
  vehicles: { id: string; label: string }[];
};

function memberLabel(m: FleetMember): string {
  return (m.name ?? "").trim() || (m.email ?? "").trim() || "이름 미지정";
}

function displayVehicle(v: FleetVehicle): string {
  return v.name || v.model || v.plate || "차량";
}

function leaseInfo(v: FleetVehicle): {
  usage: number | null;
  risk: VehicleRow["risk"];
} {
  if (!v.lease_limit_km || v.lease_limit_km <= 0)
    return { usage: null, risk: "none" };
  const usage = Math.round((v.odometer_km / v.lease_limit_km) * 100);
  const risk = usage >= 95 ? "danger" : usage >= 85 ? "warn" : "safe";
  return { usage, risk };
}

function serviceDue(v: FleetVehicle): boolean {
  if (!v.next_service_km) return false;
  return v.odometer_km >= v.next_service_km - 1500;
}

/** Bundles every fleet_* read into a single fetch so pages hit the DB once. */
async function fetchAll() {
  const db = getAdminClient();
  const [fleets, vehicles, members, assignments, records] = await Promise.all([
    db.from("fleets").select("*").order("created_at"),
    db.from("fleet_vehicles").select("*").order("created_at"),
    db.from("fleet_members").select("*").order("created_at"),
    db.from("fleet_assignments").select("*"),
    db.from("fleet_records").select("*").order("occurred_at", { ascending: false }),
  ]);
  const err =
    fleets.error || vehicles.error || members.error || assignments.error || records.error;
  if (err) throw new Error(`Fleet 데이터 조회 실패: ${err.message}`);
  return {
    fleets: (fleets.data ?? []) as Fleet[],
    vehicles: (vehicles.data ?? []) as FleetVehicle[],
    members: (members.data ?? []) as FleetMember[],
    assignments: (assignments.data ?? []) as FleetAssignment[],
    records: (records.data ?? []) as FleetRecord[],
  };
}

export async function getVehicleRows(): Promise<VehicleRow[]> {
  const { fleets, vehicles, members, assignments } = await fetchAll();
  const fleetName = new Map(fleets.map((f) => [f.id, f.name]));
  const memberByUser = new Map(members.map((m) => [m.user_id, m]));

  return vehicles.map((v) => {
    const drivers: DriverRef[] = assignments
      .filter((a) => a.fleet_vehicle_id === v.id)
      .map((a) => memberByUser.get(a.user_id))
      .filter((m): m is FleetMember => Boolean(m))
      .map((m) => ({ memberId: m.id, label: memberLabel(m), role: m.role }));
    // Fall back to the denormalized single driver_name when no assignments exist.
    if (drivers.length === 0 && v.driver_name) {
      drivers.push({ memberId: "", label: v.driver_name, role: "driver" });
    }
    const { usage, risk } = leaseInfo(v);
    return {
      ...v,
      fleetName: fleetName.get(v.fleet_id) ?? "—",
      drivers,
      leaseUsage: usage,
      risk,
      serviceDue: serviceDue(v),
    };
  });
}

export async function getDriverRows(): Promise<DriverRow[]> {
  const { fleets, vehicles, members, assignments } = await fetchAll();
  const fleetName = new Map(fleets.map((f) => [f.id, f.name]));
  const vehicleById = new Map(vehicles.map((v) => [v.id, v]));

  return members.map((m) => {
    const myVehicles = assignments
      .filter((a) => a.user_id === m.user_id)
      .map((a) => vehicleById.get(a.fleet_vehicle_id))
      .filter((v): v is FleetVehicle => Boolean(v))
      .map((v) => ({ id: v.id, label: displayVehicle(v) }));
    return {
      ...m,
      fleetName: fleetName.get(m.fleet_id) ?? "—",
      label: memberLabel(m),
      vehicleCount: myVehicles.length,
      vehicles: myVehicles,
    };
  });
}

export type VehicleDetail = {
  vehicle: VehicleRow;
  assignedDrivers: DriverRef[];
  availableDrivers: DriverRef[];
};

export async function getVehicleDetail(id: string): Promise<VehicleDetail | null> {
  const [rows, { members, assignments }] = await Promise.all([
    getVehicleRows(),
    fetchAll(),
  ]);
  const vehicle = rows.find((v) => v.id === id);
  if (!vehicle) return null;

  const assignedUserIds = new Set(
    assignments.filter((a) => a.fleet_vehicle_id === id).map((a) => a.user_id)
  );
  const sameFleet = members.filter((m) => m.fleet_id === vehicle.fleet_id);
  const assignedDrivers = sameFleet
    .filter((m) => assignedUserIds.has(m.user_id))
    .map((m) => ({ memberId: m.id, label: memberLabel(m), role: m.role }));
  const availableDrivers = sameFleet
    .filter((m) => !assignedUserIds.has(m.user_id))
    .map((m) => ({ memberId: m.id, label: memberLabel(m), role: m.role }));
  return { vehicle, assignedDrivers, availableDrivers };
}

// ---- Dashboard ----------------------------------------------------------

function monthKey(iso: string): string {
  return iso.slice(0, 7); // YYYY-MM
}

export type DashboardData = {
  totalVehicles: number;
  activeVehicles: number;
  fleetCount: number;
  driverCount: number;
  monthExpense: number;
  monthExpensePrev: number;
  riskVehicles: VehicleRow[];
  serviceDueCount: number;
  monthlySeries: { label: string; total: number; current: boolean }[];
  recent: {
    id: string;
    title: string;
    vehicle: string;
    amount: number | null;
    kind: string;
    when: string;
  }[];
};

export async function getDashboard(): Promise<DashboardData> {
  const [rows, { fleets, members, records, vehicles }] = await Promise.all([
    getVehicleRows(),
    fetchAll(),
  ]);
  const vehicleName = new Map(vehicles.map((v) => [v.id, displayVehicle(v)]));

  const now = new Date();
  const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const curKey = ym(now);
  const prevKey = ym(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  const sumByMonth = new Map<string, number>();
  for (const r of records) {
    const k = monthKey(r.occurred_at);
    sumByMonth.set(k, (sumByMonth.get(k) ?? 0) + (r.amount_won ?? 0));
  }

  const monthlySeries = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const k = ym(d);
    return { label: `${d.getMonth() + 1}월`, total: sumByMonth.get(k) ?? 0, current: k === curKey };
  });

  const riskVehicles = rows
    .filter((v) => v.risk === "danger" || v.risk === "warn")
    .sort((a, b) => (b.leaseUsage ?? 0) - (a.leaseUsage ?? 0));

  return {
    totalVehicles: rows.length,
    activeVehicles: rows.filter((v) => v.status === "active").length,
    fleetCount: fleets.length,
    driverCount: members.length,
    monthExpense: sumByMonth.get(curKey) ?? 0,
    monthExpensePrev: sumByMonth.get(prevKey) ?? 0,
    riskVehicles,
    serviceDueCount: rows.filter((v) => v.serviceDue).length,
    monthlySeries,
    recent: records.slice(0, 6).map((r) => ({
      id: r.id,
      title: r.title || kindLabel(r.kind),
      vehicle: vehicleName.get(r.fleet_vehicle_id) ?? "차량",
      amount: r.amount_won,
      kind: r.kind,
      when: r.occurred_at,
    })),
  };
}

// ---- Monthly report -----------------------------------------------------

export function kindLabel(kind: string): string {
  return (
    { fuel: "주유", charge: "충전", maintenance: "정비", toll: "통행료", etc: "기타" }[kind] ??
    kind
  );
}

export type MonthlyReport = {
  month: string; // YYYY-MM
  months: string[]; // available months for the picker
  totalAmount: number;
  totalDistance: number;
  recordCount: number;
  byKind: { kind: string; label: string; amount: number; pct: number }[];
  byVehicle: {
    vehicleId: string;
    label: string;
    plate: string | null;
    fleetName: string;
    amount: number;
    distance: number;
    count: number;
  }[];
};

export async function getMonthlyReport(month?: string): Promise<MonthlyReport> {
  const { fleets, vehicles, records } = await fetchAll();
  const fleetName = new Map(fleets.map((f) => [f.id, f.name]));
  const vById = new Map(vehicles.map((v) => [v.id, v]));

  const months = Array.from(new Set(records.map((r) => monthKey(r.occurred_at)))).sort().reverse();
  const target = month && months.includes(month) ? month : months[0] ?? monthKey(new Date().toISOString());
  const inMonth = records.filter((r) => monthKey(r.occurred_at) === target);

  const totalAmount = inMonth.reduce((s, r) => s + (r.amount_won ?? 0), 0);
  const totalDistance = inMonth.reduce((s, r) => s + Number(r.distance_km ?? 0), 0);

  const kindMap = new Map<string, number>();
  for (const r of inMonth) kindMap.set(r.kind, (kindMap.get(r.kind) ?? 0) + (r.amount_won ?? 0));
  const byKind = [...kindMap.entries()]
    .map(([kind, amount]) => ({
      kind,
      label: kindLabel(kind),
      amount,
      pct: totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const vMap = new Map<string, { amount: number; distance: number; count: number }>();
  for (const r of inMonth) {
    const cur = vMap.get(r.fleet_vehicle_id) ?? { amount: 0, distance: 0, count: 0 };
    cur.amount += r.amount_won ?? 0;
    cur.distance += Number(r.distance_km ?? 0);
    cur.count += 1;
    vMap.set(r.fleet_vehicle_id, cur);
  }
  const byVehicle = [...vMap.entries()]
    .map(([vehicleId, agg]) => {
      const v = vById.get(vehicleId);
      return {
        vehicleId,
        label: v ? displayVehicle(v) : "차량",
        plate: v?.plate ?? null,
        fleetName: v ? fleetName.get(v.fleet_id) ?? "—" : "—",
        ...agg,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  return {
    month: target,
    months,
    totalAmount,
    totalDistance,
    recordCount: inMonth.length,
    byKind,
    byVehicle,
  };
}

export async function getFleets(): Promise<Fleet[]> {
  const { fleets } = await fetchAll();
  return fleets;
}
