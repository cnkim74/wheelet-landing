import { BUSINESS_STATS } from "@/lib/content";
import { SectionKicker, GoldButton, GhostButton } from "./ui";
import { Reveal } from "./Reveal";

const valueTint: Record<string, string> = {
  gold: "text-gold",
  green: "text-green",
  plain: "text-fg",
};

export function Business() {
  return (
    <section id="business" className="px-5 py-14 sm:px-8 lg:px-12">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-10 rounded-[2rem] border border-gold/30 bg-[linear-gradient(140deg,#1c1a14,#101013)] p-8 sm:p-12 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-4">
          <SectionKicker>Wheelet for Business</SectionKicker>
          <h2 className="text-[clamp(1.7rem,3.5vw,2.15rem)] font-black leading-[1.3]">
            법인차 수십 대도,
            <br />
            대시보드 하나로
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-mute-200">
            차량별 지출·주행·약정거리를 실시간으로 모니터링하고, 월별 정산
            리포트를 자동 생성하세요. 임직원 배차와 운전자 관리까지.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <GoldButton href="#download" className="px-6 py-3 text-sm">
              데모 신청
            </GoldButton>
            <GhostButton href="#" className="px-6 py-3 text-sm">
              CMS 살펴보기
            </GhostButton>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3.5 lg:w-[380px] lg:flex-none">
          {BUSINESS_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 sm:p-5"
            >
              <span className="text-xs text-mute-300">{s.label}</span>
              <div
                className={`mt-1.5 font-display text-xl font-bold sm:text-2xl ${valueTint[s.tint]}`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
