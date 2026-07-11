"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "대시보드", icon: "grid", exact: true },
  { href: "/admin/vehicles", label: "차량", icon: "car" },
  { href: "/admin/drivers", label: "기사", icon: "users" },
  { href: "/admin/reports", label: "월간 리포트", icon: "report" },
];

function Icon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "grid")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    );
  if (name === "car")
    return (
      <svg {...common}>
        <path d="M5 17h14M6 17l1.5-5h9L18 17M7.5 12l1-3h7l1 3" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    );
  if (name === "users")
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
        <circle cx="17.5" cy="9" r="2.5" />
        <path d="M15.5 15.2c2.9.1 5.2 1.6 6 4.8" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M14 3v6h6" />
    </svg>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? "border border-gold/30 bg-gradient-to-r from-gold/20 to-gold/5 font-semibold text-gold-light"
                : "border border-transparent text-mute-200 hover:bg-white/[0.04] hover:text-fg"
            }`}
          >
            <Icon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <span className="flex items-baseline gap-1.5 px-2 text-lg font-black">
      Wheelet<span className="text-gold">.</span>
      <span className="text-[10px] font-semibold tracking-widest text-mute-300">
        BIZ
      </span>
    </span>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-60 flex-none flex-col gap-7 border-r border-white/[0.07] bg-ink-900 p-4 lg:flex">
      <Brand />
      <NavLinks />
      <div className="mt-auto rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
        <span className="text-[11px] font-semibold text-gold">AI 요약</span>
        <p className="mt-1.5 text-xs leading-relaxed text-mute-100">
          약정 위험 차량을 우선 확인하세요. 대시보드에서 실시간 상태를 볼 수
          있어요.
        </p>
      </div>
    </aside>
  );
}

/** Mobile top bar with a slide-down menu. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-ink-900 px-4 py-3">
        <Brand />
        <button
          type="button"
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-lg border border-white/15 text-fg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-b border-white/[0.07] bg-ink-900 px-4 py-3">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
