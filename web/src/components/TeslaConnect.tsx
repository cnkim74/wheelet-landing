"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TESLA_STEPS } from "@/lib/content";

const TESLA_RED = "#e82127";

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

export function TeslaConnect() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(212,179,106,.25)] transition-transform hover:-translate-y-0.5"
        >
          <Bolt className="size-4" />
          테슬라 연결 방법 보기
        </button>
        <a
          href="#download"
          className="text-sm text-mute-100 underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          앱 다운로드 →
        </a>
      </div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tesla-connect-title"
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
            onClick={() => setOpen(false)}
          >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-lg flex-col gap-6 rounded-t-3xl border border-white/10 bg-ink-800 p-6 shadow-[0_40px_120px_rgba(0,0,0,.7)] sm:rounded-3xl sm:p-8"
            style={{
              backgroundImage: `radial-gradient(600px 300px at 90% -10%, ${TESLA_RED}14, transparent 60%)`,
            }}
          >
            {/* close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/10 text-mute-200 transition-colors hover:border-white/25 hover:text-fg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-2 pr-10">
              <span
                className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ borderColor: `${TESLA_RED}55`, color: "#ff5b5f", background: `${TESLA_RED}12` }}
              >
                <Bolt className="size-3" />
                Tesla API
              </span>
              <h3 id="tesla-connect-title" className="text-2xl font-black">
                연결은 1분, 이후엔 원클릭
              </h3>
              <p className="text-sm leading-relaxed text-mute-200">
                테슬라 공식 API(OAuth)로 안전하게 연결됩니다. 계정 비밀번호는
                Wheelet에 저장되지 않아요.
              </p>
            </div>

            <ol className="flex flex-col gap-4">
              {TESLA_STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span
                    className="grid size-9 flex-none place-items-center rounded-xl font-display text-sm font-bold text-ink"
                    style={{ background: "linear-gradient(120deg,#e9cd8d,#b78f3e)" }}
                  >
                    {s.n}
                  </span>
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <span className="text-[15px] font-semibold text-fg">
                      {s.title}
                    </span>
                    <span className="text-sm leading-relaxed text-mute-300">
                      {s.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
              <a
                href="#download"
                className="flex-1 rounded-full bg-gradient-gold py-3 text-center text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                앱 다운로드하고 연결하기
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-mute-100 transition-colors hover:border-white/30 hover:text-fg"
              >
                닫기
              </button>
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
