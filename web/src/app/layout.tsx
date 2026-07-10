import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wheelet.app"),
  title: {
    default: "Wheelet · AI 차계부 — 차의 모든 지출, AI가 기록하고 아껴드립니다",
    template: "%s · Wheelet",
  },
  description:
    "충전·주유 자동 기록, 렌트 약정거리 예측, 월간 리포트까지. 전기차와 내연기관, 오토바이까지 한 곳에서 관리하는 AI 차계부 Wheelet.",
  keywords: [
    "차계부",
    "AI 차계부",
    "전기차 충전 기록",
    "약정거리",
    "테슬라 연동",
    "차량 관리",
    "Wheelet",
  ],
  openGraph: {
    title: "Wheelet · AI 차계부",
    description:
      "충전·주유 자동 기록부터 약정거리 예측, 월간 리포트까지. 차의 모든 지출을 AI가 알아서.",
    type: "website",
    locale: "ko_KR",
    siteName: "Wheelet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheelet · AI 차계부",
    description: "차의 모든 지출, AI가 알아서 기록하고 아껴드립니다.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
