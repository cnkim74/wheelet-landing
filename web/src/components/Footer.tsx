import { Wordmark, StoreButtons } from "./ui";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <>
      {/* final CTA */}
      <section
        id="download"
        className="relative overflow-hidden border-t border-white/[0.06] px-5 py-24 text-center sm:px-8 sm:py-28 lg:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[radial-gradient(700px_320px_at_50%_0%,rgba(212,179,106,0.1),transparent_70%)]"
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,5vw,2.9rem)] font-black">
            오늘부터 차계부는 AI에게
          </h2>
          <p className="mt-4 text-base text-mute-200 sm:text-[17px]">
            지금 다운로드하고 14일간 Premium을 무료로 써보세요.
          </p>
          <StoreButtons size="lg" className="mt-8 justify-center" />
        </Reveal>
      </section>

      {/* footer */}
      <footer className="border-t border-white/[0.06] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <Wordmark className="text-lg text-mute-100" />
          <nav className="flex gap-6 text-[13px] text-mute-300">
            <a href="#" className="transition-colors hover:text-fg">
              이용약관
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              개인정보처리방침
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              문의
            </a>
          </nav>
          <span className="text-[13px] text-mute-400">© 2026 Wheelet</span>
        </div>
      </footer>
    </>
  );
}
