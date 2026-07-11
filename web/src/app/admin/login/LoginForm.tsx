"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-2">
        <span className="text-sm text-mute-200">관리자 비밀번호</span>
        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          className="rounded-xl border border-white/12 bg-ink-800 px-4 py-3 text-sm outline-none transition-colors focus:border-gold/50"
          placeholder="••••••••"
        />
      </label>
      {state.error && <p className="text-sm text-orange">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-gradient-gold py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
