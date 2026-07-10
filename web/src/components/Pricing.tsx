import { PLANS } from "@/lib/content";
import { SectionKicker } from "./ui";
import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-white/[0.06] bg-ink-800 px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 flex flex-col items-center gap-3 text-center">
          <SectionKicker>Pricing</SectionKicker>
          <h2 className="text-[clamp(1.9rem,4vw,2.5rem)] font-black">
            필요한 만큼만
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 90}
              className={`relative flex flex-col gap-5 rounded-3xl p-8 ${
                plan.featured
                  ? "border border-gold/50 bg-[linear-gradient(170deg,#1c1a14,#141419)] md:-mt-4 md:mb-0"
                  : "border border-white/[0.08] bg-ink-700"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-xl bg-gradient-gold px-3.5 py-1 text-[11px] font-bold text-ink">
                  {plan.badge}
                </span>
              )}
              <span
                className={`text-[15px] font-semibold ${
                  plan.featured ? "text-gold" : "text-mute-100"
                }`}
              >
                {plan.name}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">
                  {plan.price}
                </span>
                {plan.suffix && (
                  <span className="text-sm text-mute-300">{plan.suffix}</span>
                )}
              </div>
              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.features.map((feat, j) => (
                  <li
                    key={feat}
                    className={
                      plan.featured && j === 0
                        ? "text-gold"
                        : plan.featured
                          ? "text-mute-100"
                          : "text-mute-200"
                    }
                  >
                    <span className="mr-1.5 text-gold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href={plan.name === "Business" ? "#business" : "#download"}
                className={`mt-auto rounded-full py-3 text-center text-sm transition-transform hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-gradient-gold font-bold text-ink"
                    : "border border-white/15 text-fg-soft"
                }`}
              >
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
