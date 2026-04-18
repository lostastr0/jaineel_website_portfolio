"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60vmax",
          height: "60vmax",
          background:
            "radial-gradient(ellipse at center, rgba(239,68,68,0.05) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <div className="text-white/60 mb-10">
          <Logo size={24} />
        </div>

        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
          Runtime · Exception
        </p>

        <h1
          className="text-[clamp(3rem,12vw,6rem)] font-bold tracking-[-0.05em] text-white/95 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Something broke.
        </h1>

        <p className="mt-6 text-[14px] text-white/40 leading-relaxed max-w-sm">
          Unexpected error on this page. You can try again, or head home and
          take a different path.
        </p>

        {error.digest && (
          <p className="mt-4 text-[10px] font-mono tracking-[0.12em] text-white/25">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
          >
            <span className="text-[12px] tracking-[0.14em] uppercase text-white/70 group-hover:text-white/95 transition-colors">
              Try again
            </span>
          </button>
          <a
            href="/"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-transparent hover:border-white/10 transition-all duration-300"
          >
            <span className="text-[12px] tracking-[0.14em] uppercase text-white/45 group-hover:text-white/80 transition-colors">
              Return home
            </span>
            <span className="text-white/30 group-hover:text-white/70 transition-all duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
