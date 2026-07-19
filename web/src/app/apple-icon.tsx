import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon: gold "W." monogram on the dark brand background.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 118,
            fontWeight: 900,
            letterSpacing: -4,
            color: "#e9cd8d",
          }}
        >
          W<span style={{ color: "#d4b36a" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
