import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col gap-2 text-center">
          <span className="text-2xl font-black">
            Wheelet<span className="text-gold">.</span>{" "}
            <span className="text-xs font-semibold tracking-widest text-mute-300">
              BIZ
            </span>
          </span>
          <p className="text-sm text-mute-300">플리트 관리자 콘솔</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-ink-800 p-6">
          <LoginForm next={next?.startsWith("/admin") ? next : "/admin"} />
        </div>
        <p className="mt-4 text-center text-xs text-mute-400">
          실제 플리트 데이터에 접근합니다. 승인된 관리자만 로그인하세요.
        </p>
      </div>
    </div>
  );
}
