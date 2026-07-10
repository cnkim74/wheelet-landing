import { HERO_STATS } from "@/lib/content";
import { PhoneFrame, StoreButtons } from "./ui";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[560px] bg-[radial-gradient(1000px_480px_at_50%_0%,rgba(212,179,106,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-[13px]">
            Premium AI Car Ledger
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.6rem,8vw,5.5rem)] font-black leading-[1.05] tracking-[-0.02em]">
            차의 모든 지출,
            <br className="hidden sm:block" /> AI가 알아서{" "}
            <span className="text-gradient-gold">기록하고 아껴드립니다</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-mute-200 sm:text-lg">
            충전·주유 자동 기록, 렌트 약정거리 예측, 월간 리포트까지. 전기차와
            내연기관, 오토바이까지 한 곳에서.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <StoreButtons size="lg" className="mt-8 justify-center" />
        </Reveal>

        {/* stats */}
        <Reveal delay={280}>
          <dl className="mx-auto mt-10 flex max-w-md items-center justify-center divide-x divide-white/10">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-5 sm:px-7">
                <dd className="font-display text-2xl font-bold text-gold sm:text-[26px]">
                  {s.value}
                </dd>
                <dt className="text-xs text-mute-300">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* phone fan */}
      <Reveal delay={200} className="relative mx-auto mt-14 max-w-4xl sm:mt-16">
        <div className="flex items-end justify-center">
          <PhoneFrame
            src="/screens/3-stats.png"
            alt="Wheelet 통계 화면"
            sizes="(max-width: 640px) 30vw, 230px"
            className="w-[26vw] max-w-[230px] translate-x-6 translate-y-8 -rotate-6 sm:translate-x-8"
          />
          <PhoneFrame
            src="/screens/1-home.png"
            alt="Wheelet 홈 화면"
            featured
            priority
            sizes="(max-width: 640px) 42vw, 290px"
            className="z-10 w-[40vw] max-w-[290px]"
          />
          <PhoneFrame
            src="/screens/4-garage.png"
            alt="Wheelet 차고 화면"
            sizes="(max-width: 640px) 30vw, 230px"
            className="w-[26vw] max-w-[230px] -translate-x-6 translate-y-8 rotate-6 sm:-translate-x-8"
          />
        </div>
        {/* fade base into page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
        />
      </Reveal>
    </section>
  );
}
