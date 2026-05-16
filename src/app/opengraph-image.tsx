import { ImageResponse } from "next/og";

export const alt =
  "Jaineel Khatri — Cybersecurity student heading into computer science";
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
          background: "#161616",
          color: "#EDEAE2",
          fontFamily: "sans-serif",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* Top row — JK. + nav-style label */}
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
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#EDEAE2",
              fontFamily: "monospace",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex" }}>JK.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 16,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(237,234,226,0.58)",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#3B82F6",
              }}
            />
            <span style={{ display: "flex" }}>Available · {new Date().getFullYear()}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.96,
            color: "#EDEAE2",
          }}
        >
          <span style={{ display: "flex" }}>I build practical projects.</span>
          <span style={{ display: "flex", color: "rgba(237,234,226,0.58)" }}>
            I learn by shipping them.
          </span>
        </div>

        {/* Rule */}
        <div
          style={{
            display: "flex",
            width: 88,
            height: 1,
            background: "rgba(237,234,226,0.14)",
            marginTop: 36,
            marginBottom: 22,
          }}
        />

        {/* Descriptor */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(237,234,226,0.58)",
            lineHeight: 1.4,
            maxWidth: 820,
          }}
        >
          Jaineel Khatri — cybersecurity student heading into a CS degree at
          QUT. Security tools, web, systems.
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom row — url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            fontSize: 16,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(237,234,226,0.58)",
            fontFamily: "monospace",
          }}
        >
          <span style={{ display: "flex" }}>jaineel.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
