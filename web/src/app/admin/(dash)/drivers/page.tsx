import { isAdminConfigured } from "@/lib/supabase/admin";
import { getDriverRows, getFleets } from "@/lib/fleet/queries";
import { DriversManager } from "@/components/admin/DriversManager";

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  if (!isAdminConfigured) return null;
  const [rows, fleets] = await Promise.all([getDriverRows(), getFleets()]);
  return <DriversManager rows={rows} fleets={fleets} />;
}
