import { ImageResponse } from "next/og";

export const alt = "Jaineel Khatri — Builder · Brisbane, AU";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #050508 0%, #0C0C14 55%, #050508 100%)",
          color: "#EEEEF0",
          fontFamily: "sans-serif",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* Accent glow — bottom right */}
        <div
          style={{
            position: "absolute",
            width: 640,
            height: 640,
            right: -180,
            bottom: -240,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)",
            display: "flex",
          }}
        />
        {/* Soft top highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Top row — monogram + year */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "monospace",
            }}
          >
            <span style={{ display: "flex" }}>JK</span>
            <span
              style={{
                display: "flex",
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "#2563EB",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.32)",
              fontFamily: "monospace",
            }}
          >
            Portfolio · 2026
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Main block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
            }}
          >
            Student · Builder · Brisbane, AU
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            Jaineel Khatri
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Building toward a career in software engineering and security —
            learning by shipping.
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom row — URL / divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 18,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 32,
              height: 1,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <span style={{ display: "flex" }}>jaineel.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
