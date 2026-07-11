/**
 * Lightweight shared-password gate for /admin.
 *
 * This is intentionally NOT a per-user auth system (the CMS was scoped without
 * login). It only keeps the production-data admin off the open internet: a
 * single shared password, set via the ADMIN_PASSWORD env var, unlocks a signed
 * cookie. If ADMIN_PASSWORD is unset the gate is disabled (dev convenience).
 */
export const ADMIN_COOKIE = "wl_admin";

export function gateEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Derives the cookie token from the password (SHA-256 hex, Web Crypto). */
export async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`wheelet-cms::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** True when the presented cookie value matches the configured password. */
export async function isValidToken(token: string | undefined): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return true; // gate disabled
  if (!token) return false;
  return token === (await gateToken(password));
}
