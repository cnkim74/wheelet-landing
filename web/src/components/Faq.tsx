"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { SectionKicker } from "./ui";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-3 lg:w-80 lg:flex-none">
          <SectionKicker>FAQ</SectionKicker>
          <h2 className="text-[clamp(1.9rem,4vw,2.5rem)] font-black">
            자주 묻는 질문
          </h2>
        </div>

        <div className="flex-1">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors sm:text-[16.5px] ${
                      isOpen ? "text-gold" : "text-fg"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-[15px] leading-relaxed text-mute-200">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
