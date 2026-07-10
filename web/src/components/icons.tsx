import type { IconKey } from "@/lib/content";

const paths: Record<IconKey, React.ReactNode> = {
  sparkle: <path d="M12 2l1.9 5.8L20 9.7l-5 4 1.7 6.3L12 16.4 7.3 20l1.7-6.3-5-4 6.1-1.9z" />,
  pulse: <path d="M2 12h4l3-8 4 16 3-8h6" />,
  bars: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  garage: (
    <>
      <path d="M5 17h14M6 17l1.5-5h9L18 17M7.5 12l1-3h7l1 3" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  chat: <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />,
};

export function FeatureIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[icon]}
    </svg>
  );
}

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.79-.16 1.55-.83 3-.72 2.2.18 3.35 1.25 3.55 3.03-3.2 1.92-2.44 5.99.37 7.36-.55 1.27-1.24 2.53-2 2.5zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 2.5v19l11-9.5L3 2.5zM14.5 12l3-2.6 3.2 1.8c.9.5.9 1.1 0 1.6l-3.2 1.8-3-2.6zM4.7 1.6l10.5 6-2.6 2.3L4.7 1.6zM4.7 22.4l7.9-8.3 2.6 2.3-10.5 6z" />
    </svg>
  );
}
