# Wheelet — 랜딩페이지

AI 차계부 **Wheelet**의 마케팅 랜딩페이지. 다크/골드 테마, 반응형.

**Live:** https://wheelet-landing.vercel.app

## 구조

```
.
├── web/            # Next.js 16 앱 (App Router · TypeScript · Tailwind v4)
│   └── src/
│       ├── app/            # layout, page, globals.css (디자인 토큰)
│       ├── components/     # Nav, Hero, Showcase, Features, Gallery, Pricing, Business, Faq, Footer
│       └── lib/content.ts  # 섹션 콘텐츠 데이터
└── ai/project/     # Claude Design 핸드오프 (HTML 목업 · 앱 스크린샷)
```

## 개발

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
```

## 배포

Vercel에 연결되어 있습니다 (Root Directory: `web`). `main` 브랜치 푸시 시 자동 배포됩니다.

## 디자인 시스템

- **컬러:** ink 다크 배경 + 골드(`#d4b36a`, 그라데이션 `#e9cd8d → #b78f3e`)
- **폰트:** Pretendard(본문) · GmarketSans(숫자·디스플레이)
- 토큰은 `web/src/app/globals.css`의 `@theme`에 정의

## 남은 작업

- B2B 웹 CMS 대시보드 (`ai/project/Wheelet CMS.dc.html`)
- 앱 메인화면 (`ai/project/AI 차계부 메인화면.dc.html`)
- 앱스토어/구글플레이 실제 링크, OG 이미지
