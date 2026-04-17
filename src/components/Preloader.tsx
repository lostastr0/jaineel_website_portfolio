"use client";

import { useEffect, useState } from "react";

type Phase = "hold" | "appear" | "settle" | "release" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    document.documentElement.classList.add("preloader-active");

    /* hold: dark, nothing visible (0–100ms) */
    const t1 = setTimeout(() => setPhase("appear"), 100);
    /* appear: mark fades in with blur-to-sharp (100–550ms) */
    const t2 = setTimeout(() => setPhase("settle"), 550);
    /* settle: subtle scale + glow refinement (550–900ms) */
    const t3 = setTimeout(() => setPhase("release"), 900);
    /* release: fade out, hero begins underneath (900–1350ms) */
    const t4 = setTimeout(() => setPhase("done"), 1350);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (phase === "done") return null;

  const isVisible = phase === "appear" || phase === "settle";

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-bg"
      style={{
        opacity: phase === "release" ? 0 : 1,
        transition: phase === "release"
          ? "opacity 420ms cubic-bezier(0.16, 1, 0.3, 1)"
          : "none",
        pointerEvents: "none",
      }}
    >
      {/* Ambient glow — breathes in during settle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "35vw",
          height: "35vh",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.05) 0%, transparent 65%)",
          filter: "blur(50px)",
          opacity: phase === "settle" ? 1 : phase === "appear" ? 0.4 : 0,
          transform: `scale(${phase === "settle" ? 1.1 : 1})`,
          transition: phase === "appear"
            ? "opacity 350ms ease"
            : "opacity 350ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Mark + line */}
      <div className="relative flex flex-col items-center gap-3.5">
        <div
          style={{
            opacity: isVisible ? 1 : phase === "release" ? 0 : 0,
            filter: phase === "hold" ? "blur(8px)" : phase === "appear" ? "blur(0px)" : "blur(0px)",
            transform:
              phase === "hold" ? "scale(0.96) translateY(0)"
              : phase === "appear" ? "scale(1) translateY(0)"
              : phase === "settle" ? "scale(1) translateY(0)"
              : "scale(1) translateY(-8px)",
            transition:
              phase === "appear"
                ? "opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), filter 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            className="text-[20px] font-semibold tracking-tight select-none"
            style={{
              fontFamily: "var(--font-display)",
              color: phase === "settle" ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.80)",
              transition: "color 400ms ease",
            }}
          >
            JK<span className="text-accent">.</span>
          </span>
        </div>

        {/* Accent line — expands on appear, holds, collapses on release */}
        <div
          style={{
            width: isVisible ? 36 : 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            opacity: phase === "release" ? 0 : 1,
            transition:
              phase === "appear"
                ? "width 450ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 200ms ease"
                : phase === "release"
                  ? "width 250ms ease, opacity 200ms ease"
                  : "width 300ms ease",
          }}
        />
      </div>
    </div>
  );
}
