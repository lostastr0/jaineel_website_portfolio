import { ImageResponse } from "next/og";

export const alt =
  "Jaineel Khatri — Cybersecurity student heading into Computer Science and software engineering.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await (
    await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
      },
    })
  ).text();
  const match = css.match(/src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if (!match) throw new Error(`Font not found: ${family} ${weight}`);
  return await (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const [funnelMedium, funnelExtraBold, geistMono] = await Promise.all([
    loadGoogleFont("Funnel Display", 500),
    loadGoogleFont("Funnel Display", 800),
    loadGoogleFont("Geist Mono", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#161616",
          color: "#EDEAE2",
          fontFamily: "Funnel Display",
          padding: "72px 88px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* JK. top-left */}
        <div
          style={{
            display: "flex",
            fontFamily: "Funnel Display",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "#EDEAE2",
          }}
        >
          JK.
        </div>

        {/* Hero composition — fills the middle, left-aligned */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Funnel Display",
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
              color: "#EDEAE2",
            }}
          >
            Hi, I&apos;m Jaineel.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              maxWidth: 820,
              fontFamily: "Funnel Display",
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.018em",
              color: "rgba(237, 234, 226, 0.58)",
            }}
          >
            Cybersecurity student heading into Computer Science and software engineering.
          </div>
        </div>

        {/* Bottom row — jaineel.dev left, availability right */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: "Geist Mono",
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(237, 234, 226, 0.58)",
          }}
        >
          <span style={{ display: "flex" }}>jaineel.dev</span>
          <span style={{ display: "flex" }}>
            Available for work · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Funnel Display", data: funnelMedium, weight: 500, style: "normal" },
        { name: "Funnel Display", data: funnelExtraBold, weight: 800, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 500, style: "normal" },
      ],
    },
  );
}
