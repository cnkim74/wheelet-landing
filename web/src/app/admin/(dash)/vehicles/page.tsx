import { isAdminConfigured } from "@/lib/supabase/admin";
import { getVehicleRows, getFleets } from "@/lib/fleet/queries";
import { VehiclesManager } from "@/components/admin/VehiclesManager";

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  if (!isAdminConfigured) return null;
  const [rows, fleets] = await Promise.all([getVehicleRows(), getFleets()]);
  return <VehiclesManager rows={rows} fleets={fleets} />;
}
