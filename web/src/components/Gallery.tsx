import { SCREENS } from "@/lib/content";
import { PhoneFrame, SectionKicker } from "./ui";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section
      id="screens"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(800px_400px_at_50%_100%,rgba(212,179,106,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto mb-12 flex max-w-6xl flex-col gap-3 px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col gap-3">
          <SectionKicker>Screens</SectionKicker>
          <h2 className="text-[clamp(1.9rem,4vw,2.5rem)] font-black">
            실제 화면으로 만나보세요
          </h2>
        </Reveal>
      </div>

      {/* horizontal scroll on mobile, centered fan on desktop */}
      <div className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:gap-6 sm:px-8 lg:justify-center lg:overflow-visible lg:px-12">
        {SCREENS.map((s, i) => (
          <Reveal
            key={s.src}
            delay={i * 70}
            className={`shrink-0 snap-center ${s.offset}`}
          >
            <PhoneFrame
              src={s.src}
              alt={s.alt}
              featured={s.featured}
              sizes="(max-width: 1024px) 45vw, 216px"
              className="w-[45vw] max-w-[216px] sm:w-[216px]"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
