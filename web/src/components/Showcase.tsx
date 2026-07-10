import { SHOWCASE } from "@/lib/content";
import { PhoneFrame } from "./ui";
import { Reveal } from "./Reveal";

const accentText: Record<string, string> = {
  gold: "text-gold",
  orange: "text-orange",
  silver: "text-mute-100",
};

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative bg-gradient-to-b from-ink to-ink-800 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-24 sm:gap-32">
        {SHOWCASE.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal
              key={item.index}
              className={`flex flex-col items-center gap-10 lg:gap-16 ${
                reversed ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* copy */}
              <div className="flex flex-1 flex-col gap-4">
                <span
                  className={`font-display text-sm font-bold ${accentText[item.accent]}`}
                >
                  {item.index} — {item.kicker}
                </span>
                <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-black leading-[1.2]">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-mute-200 sm:text-[17px]">
                  {item.desc}
                </p>
                <a
                  href="#download"
                  className="mt-1 w-fit text-sm text-gold transition-colors hover:text-gold-light"
                >
                  자세히 보기 →
                </a>
              </div>

              {/* phones */}
              <div className="flex flex-none justify-center gap-4">
                {item.images.map((src, j) => {
                  const multi = item.images.length > 1;
                  return (
                    <PhoneFrame
                      key={src}
                      src={src}
                      alt={`${item.kicker} 화면`}
                      sizes={multi ? "(max-width: 640px) 40vw, 220px" : "(max-width: 640px) 55vw, 300px"}
                      className={
                        multi
                          ? `w-[40vw] max-w-[220px] ${j === 1 ? "mt-9" : ""}`
                          : "w-[55vw] max-w-[300px]"
                      }
                    />
                  );
                })}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
