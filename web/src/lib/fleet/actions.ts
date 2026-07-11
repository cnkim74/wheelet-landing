"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase/admin";

function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}
function num(fd: FormData, key: string): number | null {
  const s = str(fd, key);
  if (s == null) return null;
  const n = Number(s.replace(/[,\s]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function revalidateAll() {
  revalidatePath("/admin");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin/drivers");
  revalidatePath("/admin/reports");
}

// ---- Vehicles -----------------------------------------------------------

export async function createVehicle(fd: FormData) {
  const fleet_id = str(fd, "fleet_id");
  if (!fleet_id) throw new Error("플리트를 선택하세요.");
  const db = getAdminClient();
  const { error } = await db.from("fleet_vehicles").insert({
    fleet_id,
    name: str(fd, "name"),
    model: str(fd, "model"),
    maker: str(fd, "maker"),
    plate: str(fd, "plate"),
    fuel: str(fd, "fuel"),
    category: str(fd, "category") ?? "car",
    year: num(fd, "year"),
    odometer_km: num(fd, "odometer_km") ?? 0,
    lease_limit_km: num(fd, "lease_limit_km"),
    next_service_km: num(fd, "next_service_km"),
    driver_name: str(fd, "driver_name"),
    driver_phone: str(fd, "driver_phone"),
    status: str(fd, "status") ?? "active",
    memo: str(fd, "memo"),
  });
  if (error) throw new Error(`차량 등록 실패: ${error.message}`);
  revalidateAll();
}

export async function updateVehicle(fd: FormData) {
  const id = str(fd, "id");
  if (!id) throw new Error("차량 ID가 없습니다.");
  const db = getAdminClient();
  const { error } = await db
    .from("fleet_vehicles")
    .update({
      name: str(fd, "name"),
      model: str(fd, "model"),
      maker: str(fd, "maker"),
      plate: str(fd, "plate"),
      fuel: str(fd, "fuel"),
      category: str(fd, "category") ?? "car",
      year: num(fd, "year"),
      odometer_km: num(fd, "odometer_km") ?? 0,
      lease_limit_km: num(fd, "lease_limit_km"),
      next_service_km: num(fd, "next_service_km"),
      driver_name: str(fd, "driver_name"),
      driver_phone: str(fd, "driver_phone"),
      status: str(fd, "status") ?? "active",
      memo: str(fd, "memo"),
    })
    .eq("id", id);
  if (error) throw new Error(`차량 수정 실패: ${error.message}`);
  revalidateAll();
}

export async function deleteVehicle(fd: FormData) {
  const id = str(fd, "id");
  if (!id) throw new Error("차량 ID가 없습니다.");
  const db = getAdminClient();
  await db.from("fleet_assignments").delete().eq("fleet_vehicle_id", id);
  const { error } = await db.from("fleet_vehicles").delete().eq("id", id);
  if (error) throw new Error(`차량 삭제 실패: ${error.message}`);
  revalidateAll();
}

// ---- Drivers (fleet_members) -------------------------------------------

export async function createDriver(fd: FormData) {
  const fleet_id = str(fd, "fleet_id");
  const name = str(fd, "name");
  if (!fleet_id) throw new Error("플리트를 선택하세요.");
  if (!name) throw new Error("기사 이름을 입력하세요.");
  const db = getAdminClient();
  const { error } = await db.from("fleet_members").insert({
    fleet_id,
    user_id: crypto.randomUUID(),
    role: str(fd, "role") ?? "driver",
    name,
    email: str(fd, "email"),
    phone: str(fd, "phone"),
  });
  if (error) throw new Error(`기사 등록 실패: ${error.message}`);
  revalidateAll();
}

export async function updateDriver(fd: FormData) {
  const id = str(fd, "id");
  const name = str(fd, "name");
  if (!id) throw new Error("기사 ID가 없습니다.");
  if (!name) throw new Error("기사 이름을 입력하세요.");
  const db = getAdminClient();
  const { error } = await db
    .from("fleet_members")
    .update({
      name,
      email: str(fd, "email"),
      phone: str(fd, "phone"),
      role: str(fd, "role") ?? "driver",
    })
    .eq("id", id);
  if (error) throw new Error(`기사 수정 실패: ${error.message}`);
  revalidateAll();
}

export async function deleteDriver(fd: FormData) {
  const id = str(fd, "id");
  if (!id) throw new Error("기사 ID가 없습니다.");
  const db = getAdminClient();
  // Remove the member's assignments first (assignments key on user_id).
  const { data: member } = await db
    .from("fleet_members")
    .select("user_id")
    .eq("id", id)
    .maybeSingle();
  if (member?.user_id) {
    await db.from("fleet_assignments").delete().eq("user_id", member.user_id);
  }
  const { error } = await db.from("fleet_members").delete().eq("id", id);
  if (error) throw new Error(`기사 삭제 실패: ${error.message}`);
  revalidateAll();
}

// ---- Assignments (배차) -------------------------------------------------

export async function assignDriver(vehicleId: string, memberId: string) {
  const db = getAdminClient();
  const { data: member, error: mErr } = await db
    .from("fleet_members")
    .select("user_id")
    .eq("id", memberId)
    .maybeSingle();
  if (mErr || !member) throw new Error("기사를 찾을 수 없습니다.");

  // Avoid duplicate assignment.
  const { data: existing } = await db
    .from("fleet_assignments")
    .select("id")
    .eq("fleet_vehicle_id", vehicleId)
    .eq("user_id", member.user_id)
    .maybeSingle();
  if (!existing) {
    const { error } = await db
      .from("fleet_assignments")
      .insert({ fleet_vehicle_id: vehicleId, user_id: member.user_id });
    if (error) throw new Error(`배차 실패: ${error.message}`);
  }
  revalidateAll();
  revalidatePath(`/admin/vehicles/${vehicleId}`);
}

export async function unassignDriver(vehicleId: string, memberId: string) {
  const db = getAdminClient();
  const { data: member } = await db
    .from("fleet_members")
    .select("user_id")
    .eq("id", memberId)
    .maybeSingle();
  if (!member) throw new Error("기사를 찾을 수 없습니다.");
  const { error } = await db
    .from("fleet_assignments")
    .delete()
    .eq("fleet_vehicle_id", vehicleId)
    .eq("user_id", member.user_id);
  if (error) throw new Error(`배차 해제 실패: ${error.message}`);
  revalidateAll();
  revalidatePath(`/admin/vehicles/${vehicleId}`);
}
