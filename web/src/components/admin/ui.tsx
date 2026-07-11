import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-ink-700 p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  hintTone = "mute",
  danger = false,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  hintTone?: "mute" | "green" | "orange" | "gold";
  danger?: boolean;
}) {
  const toneClass = {
    mute: "text-mute-300",
    green: "text-green",
    orange: "text-orange",
    gold: "text-gold",
  }[hintTone];
  return (
    <div
      className={`rounded-2xl border bg-ink-700 p-5 ${
        danger ? "border-orange/30" : "border-white/[0.07]"
      }`}
    >
      <span className={`text-xs ${danger ? "text-orange" : "text-mute-300"}`}>
        {label}
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={`font-display text-2xl font-bold ${danger ? "text-orange" : "text-fg"}`}
        >
          {value}
        </span>
        {hint != null && <span className={`text-xs ${toneClass}`}>{hint}</span>}
      </div>
    </div>
  );
}

const RISK_STYLES: Record<string, { label: string; cls: string }> = {
  danger: { label: "위험", cls: "text-orange border-orange/40 bg-orange/10" },
  warn: { label: "주의", cls: "text-orange border-orange/40" },
  safe: { label: "안전", cls: "text-green border-green/40" },
  none: { label: "—", cls: "text-mute-300 border-white/12" },
};

export function RiskBadge({ risk }: { risk: string }) {
  const s = RISK_STYLES[risk] ?? RISK_STYLES.none;
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: "운행중", cls: "text-green border-green/40 bg-green/10" },
    idle: { label: "대기", cls: "text-mute-100 border-white/15" },
    service: { label: "정비중", cls: "text-orange border-orange/40 bg-orange/10" },
    inactive: { label: "비활성", cls: "text-mute-300 border-white/12" },
  };
  const s = map[status] ?? { label: status, cls: "text-mute-100 border-white/15" };
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
        {subtitle && <p className="text-sm text-mute-300">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function LeaseBar({ usage }: { usage: number | null }) {
  if (usage == null)
    return <span className="text-xs text-mute-400">약정 없음</span>;
  const tone =
    usage >= 95
      ? "from-gold to-orange"
      : usage >= 85
        ? "from-gold to-gold-dark"
        : "from-gold to-gold";
  const textTone = usage >= 85 ? "text-orange" : "text-mute-300";
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone}`}
          style={{ width: `${Math.min(usage, 100)}%` }}
        />
      </div>
      <span className={`text-[10.5px] ${textTone}`}>적정 대비 {usage}%</span>
    </div>
  );
}

export function won(n: number | null | undefined): string {
  if (n == null) return "—";
  return "₩" + n.toLocaleString("ko-KR");
}
