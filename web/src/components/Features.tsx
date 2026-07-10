import { FEATURES } from "@/lib/content";
import { FeatureIcon } from "./icons";
import { SectionKicker } from "./ui";
import { Reveal } from "./Reveal";

const tintClasses: Record<string, { box: string; icon: string }> = {
  gold: { box: "bg-gradient-gold", icon: "text-ink" },
  orange: { box: "bg-orange/15", icon: "text-orange" },
  silver: { box: "bg-mute-100/12", icon: "text-mute-100" },
  green: { box: "bg-green/13", icon: "text-green" },
  plain: { box: "bg-white/[0.08]", icon: "text-fg-soft" },
};

export function Features() {
  return (
    <section className="border-t border-white/[0.06] bg-ink-800 px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-3">
          <SectionKicker>Features</SectionKicker>
          <h2 className="text-[clamp(1.9rem,4vw,2.5rem)] font-black">
            기록은 AI가, 결정은 당신이
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const t = tintClasses[f.tint] ?? tintClasses.plain;
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 80}
                className="group rounded-3xl border border-white/[0.07] bg-ink-700 p-7 transition-colors hover:border-white/15"
              >
                <div
                  className={`mb-5 grid size-11 place-items-center rounded-2xl ${t.box}`}
                >
                  <FeatureIcon icon={f.icon} className={`size-5 ${t.icon}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-mute-200">
                  {f.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
