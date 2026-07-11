"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, gateToken } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/admin");
  const next = nextRaw.startsWith("/admin") ? nextRaw : "/admin";

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) redirect(next); // gate disabled — nothing to check

  if (password !== expected) {
    return { error: "비밀번호가 올바르지 않습니다." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await gateToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect(next);
}
