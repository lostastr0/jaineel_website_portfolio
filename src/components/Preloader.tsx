"use client";

import { useEffect, useState } from "react";

type Phase = "running" | "releasing" | "done";

/* ── Timing ──
 * 0 → COUNT_MS:               counter animates 0 → 100
 * COUNT_MS → COUNT_MS + HOLD: brief hold at 100%
 * + FADE_MS:                  overlay fades, hero takes over
 */
const COUNT_MS = 1250;
const HOLD_MS = 150;
const FADE_MS = 400;
const RELEASE_AT = COUNT_MS + HOLD_MS;
const DONE_AT = RELEASE_AT + FADE_MS;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("running");

  useEffect(() => {
    document.documentElement.classList.add("preloader-active");

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase("releasing"), RELEASE_AT);
    const t2 = setTimeout(() => setPhase("done"), DONE_AT);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  const pct = Math.min(100, Math.round(progress * 100));
  const padded = String(pct).padStart(3, "0");

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-bg"
      style={{
        opacity: phase === "releasing" ? 0 : 1,
        transition:
          phase === "releasing"
            ? "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        pointerEvents: "none",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "32vw",
          height: "32vh",
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        {/* System label */}
        <div
          className="flex items-center gap-2.5 opacity-0 preloader-line"
          style={{ animationDelay: "80ms", fontFamily: "var(--font-mono)" }}
        >
          <span
            className="inline-block w-1 h-1 rounded-full bg-emerald-400/70"
            style={{
              boxShadow: "0 0 6px rgba(52,211,153,0.4)",
              animation: "preloader-dot-pulse 1.8s ease-in-out infinite",
            }}
          />
          <span className="text-[9px] tracking-[0.32em] uppercase text-fg/25 select-none">
            jk.system &middot; calibrating
          </span>
        </div>

        {/* Counter */}
        <div
          className="flex items-baseline gap-1 tabular-nums select-none opacity-0 preloader-line"
          style={{ animationDelay: "180ms", fontFamily: "var(--font-mono)" }}
        >
          <span
            className="text-[clamp(4rem,9vw,7rem)] font-medium leading-none tracking-[-0.04em]"
            style={{
              color: "rgba(var(--fg-rgb),0.92)",
              textShadow: "0 0 40px rgba(37,99,235,0.12)",
            }}
          >
            {padded}
          </span>
          <span className="text-[clamp(1rem,1.8vw,1.4rem)] text-fg/30 leading-none font-medium">
            %
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="relative overflow-hidden opacity-0 preloader-line"
          style={{
            width: "min(320px, 64vw)",
            height: 1,
            animationDelay: "260ms",
          }}
        >
          <div className="absolute inset-0 bg-fg/8" />
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: `${progress * 100}%`,
              background:
                "linear-gradient(90deg, rgba(var(--fg-rgb),0.2) 0%, rgba(37,99,235,0.7) 50%, rgba(var(--fg-rgb),0.4) 100%)",
              boxShadow: "0 0 6px rgba(37,99,235,0.35)",
              transition: "width 70ms linear",
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `calc(${progress * 100}% - 2px)`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(37,99,235,0.9)",
              boxShadow:
                "0 0 10px rgba(37,99,235,0.8), 0 0 20px rgba(37,99,235,0.3)",
              opacity: progress < 1 ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          />
        </div>

        {/* Status — swaps at completion */}
        <div
          className="h-3 flex items-center opacity-0 preloader-line"
          style={{ animationDelay: "340ms", fontFamily: "var(--font-mono)" }}
        >
          <span
            className="text-[9px] tracking-[0.32em] uppercase select-none transition-colors duration-500"
            style={{
              color:
                progress < 1
                  ? "rgba(var(--fg-rgb),0.20)"
                  : "rgba(52,211,153,0.75)",
            }}
          >
            {progress < 1 ? "loading assets" : "ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
