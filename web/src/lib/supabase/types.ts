// Generated from Supabase (project: vault-ai-carledger). Only the tables the CMS
// touches are typed in detail; the rest of the app schema is elided.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Fleet = {
  id: string;
  name: string;
  plan: string;
  owner_id: string | null;
  join_code: string | null;
  created_at: string;
};

export type FleetVehicle = {
  id: string;
  fleet_id: string;
  plate: string | null;
  name: string | null;
  model: string | null;
  maker: string | null;
  year: number | null;
  category: string;
  fuel: string | null;
  odometer_km: number;
  lease_limit_km: number | null;
  driver_name: string | null;
  driver_phone: string | null;
  memo: string | null;
  status: string;
  next_service_km: number | null;
  assigned_user_id: string | null;
  created_at: string;
};

export type FleetMember = {
  id: string;
  fleet_id: string;
  user_id: string;
  role: string;
  email: string | null;
  created_at: string;
};

export type FleetAssignment = {
  id: string;
  fleet_vehicle_id: string;
  user_id: string;
  created_at: string | null;
};

export type FleetRecord = {
  id: string;
  fleet_id: string;
  fleet_vehicle_id: string;
  kind: string;
  title: string | null;
  amount_won: number | null;
  distance_km: number | null;
  odometer_km: number | null;
  occurred_at: string;
  memo: string | null;
  created_at: string;
};
