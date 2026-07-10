"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { Wordmark, GoldButton } from "./ui";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex-none">
          <Wordmark className="text-xl sm:text-2xl" />
        </a>

        {/* center pill nav — desktop */}
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-mute-200 transition-colors hover:bg-white/[0.06] hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href="#"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-mute-100 transition-colors hover:border-white/30 hover:text-fg"
            >
              로그인
            </a>
            <GoldButton href="#download" className="px-5 py-2.5 text-sm">
              앱 다운로드
            </GoldButton>
          </div>

          {/* hamburger — mobile / tablet */}
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-fg transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-white/[0.06] bg-ink/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-mute-100 transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2.5">
              <a
                href="#"
                className="flex-1 rounded-full border border-white/15 py-3 text-center text-sm text-mute-100"
              >
                로그인
              </a>
              <GoldButton href="#download" className="flex-1 py-3 text-sm">
                앱 다운로드
              </GoldButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
