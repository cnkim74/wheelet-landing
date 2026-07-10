import { TESLA_CAPABILITIES } from "@/lib/content";
import { PhoneFrame } from "./ui";
import { Reveal } from "./Reveal";
import { TeslaConnect } from "./TeslaConnect";

const TESLA_RED = "#e82127";

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function CheckBadge({ soon = false }: { soon?: boolean }) {
  if (soon) {
    return (
      <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-white/10">
        {/* clock — coming soon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#c9cdd4" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="mt-0.5 grid size-5 flex-none place-items-center rounded-full"
      style={{ background: `${TESLA_RED}22` }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke={TESLA_RED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

/** Small floating live-data chip overlaid on the phone. */
function DataChip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full border border-white/15 bg-ink-800/80 px-3.5 py-2 text-xs font-medium text-fg-soft shadow-[0_10px_30px_rgba(0,0,0,.5)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

export function Tesla() {
  return (
    <section
      id="tesla"
      className="relative overflow-hidden border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* ambient glow — tesla red meets gold */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 420px at 78% 18%, rgba(232,33,39,0.12), transparent 62%), radial-gradient(680px 420px at 12% 88%, rgba(212,179,106,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <Reveal className="flex flex-col gap-5">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ borderColor: `${TESLA_RED}55`, color: "#ff5b5f", background: `${TESLA_RED}12` }}
          >
            <Bolt className="size-3.5" />
            For Tesla Owners
          </span>

          <h2 className="text-[clamp(1.9rem,4.4vw,2.9rem)] font-black leading-[1.15]">
            테슬라 오너라면,
            <br />
            <span className="text-gradient-gold">원클릭으로 현재 상태 동기화</span>
          </h2>

          <p className="max-w-lg text-base leading-relaxed text-mute-200 sm:text-[17px]">
            테슬라 전용 API로 계정을 한 번만 연결하면, 버튼 한 번에 배터리·주행거리가
            지금 상태로 맞춰집니다. 슈퍼차저 충전 이력은 그 사이 자동으로 기록되고요.
          </p>

          <ul className="mt-1 flex flex-col gap-4">
            {TESLA_CAPABILITIES.map((c) => (
              <li key={c.title} className={`flex gap-3 ${c.soon ? "opacity-70" : ""}`}>
                <CheckBadge soon={c.soon} />
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-[15px] font-semibold text-fg">
                    {c.title}
                    {c.soon && (
                      <span className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mute-100">
                        추후 제공
                      </span>
                    )}
                  </span>
                  <span className="text-sm leading-relaxed text-mute-300">
                    {c.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <TeslaConnect />
        </Reveal>

        {/* phone with floating live-data chips */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-[340px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-70"
            style={{ background: `radial-gradient(closest-side, ${TESLA_RED}1f, transparent)` }}
          />
          <PhoneFrame
            src="/screens/4-garage.png"
            alt="테슬라 동기화가 적용된 Wheelet 차고 화면"
            featured
            sizes="(max-width: 1024px) 70vw, 340px"
            className="relative w-full"
          />

          <DataChip className="-left-3 top-16 sm:-left-6">
            <span className="grid size-6 place-items-center rounded-full" style={{ background: `${TESLA_RED}` }}>
              <Bolt className="size-3.5 text-white" />
            </span>
            슈퍼차저 이력 <span className="text-gold">3건 동기화</span>
          </DataChip>

          <DataChip className="-right-2 top-40 sm:-right-5">
            🔋 배터리 <span className="text-green">82%</span> · 실시간
          </DataChip>

          <DataChip className="bottom-16 left-2 sm:-left-4">
            📍 주행거리 <span className="text-fg">39,895 km</span>
          </DataChip>
        </Reveal>
      </div>
    </section>
  );
}
