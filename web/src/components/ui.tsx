import Image from "next/image";
import { AppleIcon, PlayIcon } from "./icons";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight ${className ?? ""}`}>
      Wheelet<span className="text-gold">.</span>
    </span>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
      {children}
    </span>
  );
}

/** Phone screenshot in a rounded device-style frame. Size via parent width. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  featured = false,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 300px",
}: {
  src: string;
  alt: string;
  className?: string;
  featured?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative aspect-[1320/2868] overflow-hidden rounded-[clamp(1.4rem,2.2vw,2.2rem)] border ${
        featured
          ? "border-gold/40 shadow-[0_40px_90px_rgba(0,0,0,.7),0_0_70px_rgba(212,179,106,.12)]"
          : "border-white/10 shadow-[0_30px_70px_rgba(0,0,0,.6)]"
      } ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

export function StoreButtons({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const pad = size === "lg" ? "px-6 py-3.5" : "px-5 py-3";
  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      <a
        href="#"
        aria-label="App Store에서 다운로드"
        className={`flex items-center gap-2.5 rounded-2xl bg-fg text-ink transition-transform hover:-translate-y-0.5 ${pad}`}
      >
        <AppleIcon className="size-[22px]" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px]">Download on the</span>
          <span className="text-base font-bold">App Store</span>
        </span>
      </a>
      <a
        href="#"
        aria-label="Google Play에서 다운로드"
        className={`flex items-center gap-2.5 rounded-2xl border border-white/20 text-fg transition-transform hover:-translate-y-0.5 hover:border-white/35 ${pad}`}
      >
        <PlayIcon className="size-5 text-gold" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] text-mute-200">GET IT ON</span>
          <span className="text-base font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}

export function GoldButton({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-gradient-gold font-semibold text-ink shadow-[0_10px_30px_rgba(212,179,106,.25)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}

export function GhostButton({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-white/15 text-fg-soft transition-colors hover:border-white/30 hover:text-fg ${className}`}
    >
      {children}
    </a>
  );
}
