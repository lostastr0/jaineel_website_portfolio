"use client";

import { useEffect } from "react";

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
    <main className="relative flex min-h-svh flex-col bg-bg px-6 sm:px-10 md:px-14">
      <header className="flex items-start justify-between pt-6 sm:pt-8 md:pt-10">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg">
          JK.
        </div>
        <a
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-accent"
        >
          Home
        </a>
      </header>

      <div className="flex flex-1 items-center">
        <div className="w-full max-w-[1400px]">
          <h1
            className="font-display font-bold leading-[0.95] tracking-[-0.04em] text-fg"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            Something broke.
          </h1>

          <p className="mt-8 max-w-[42ch] text-[15.5px] leading-[1.55] text-fg-muted sm:mt-10 sm:text-[17px] sm:leading-[1.5]">
            Unexpected error on this page. Try again, or head home and take a different path.
          </p>

          {error.digest && (
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim">
              ref: {error.digest}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.22em]">
            <button
              type="button"
              onClick={reset}
              className="text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              Try again
            </button>
            <a
              href="/"
              className="text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              Return home →
            </a>
          </div>
        </div>
      </div>

      <div className="pb-6 sm:pb-8 md:pb-10" />
    </main>
  );
}
