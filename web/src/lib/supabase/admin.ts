import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key.
 *
 * The CMS has no per-user login, so it relies on the service_role key to read
 * and write the fleet_* tables (whose RLS policies are all owner/auth-based).
 * This key MUST NEVER reach the browser — only import this module from Server
 * Components, Server Actions, or Route Handlers. The `server-only` import above
 * makes a client-side import a build error.
 */
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getAdminClient() {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase 관리자 클라이언트 설정 누락: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 환경변수를 확인하세요."
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isAdminConfigured = Boolean(url && serviceRoleKey);
