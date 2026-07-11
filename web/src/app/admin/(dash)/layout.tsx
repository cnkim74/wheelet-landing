import { Sidebar, MobileNav } from "@/components/admin/Sidebar";
import { isAdminConfigured } from "@/lib/supabase/admin";

function SetupNotice() {
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-orange/30 bg-orange/[0.06] p-6">
      <h2 className="text-lg font-bold text-orange">설정이 필요합니다</h2>
      <p className="mt-2 text-sm leading-relaxed text-mute-100">
        관리자 콘솔이 실 DB에 접근하려면 서버 환경변수{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold">
          SUPABASE_SERVICE_ROLE_KEY
        </code>{" "}
        와{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold">
          SUPABASE_URL
        </code>{" "}
        이 필요합니다.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-mute-200">
        로컬은 <code className="text-gold">web/.env.local</code>, 배포는 Vercel
        프로젝트 환경변수에 추가한 뒤 다시 시도하세요.
      </p>
    </div>
  );
}

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1 p-5 sm:p-7 lg:p-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            {isAdminConfigured ? children : <SetupNotice />}
          </div>
        </main>
      </div>
    </div>
  );
}
