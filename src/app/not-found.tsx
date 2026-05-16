import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col bg-bg px-7 sm:px-10 md:px-14">
      <header className="flex items-start justify-between pt-6 sm:pt-8 md:pt-10">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg">
          JK.
        </div>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-accent"
        >
          Home
        </Link>
      </header>

      <div className="flex flex-1 items-center">
        <div className="w-full max-w-[1400px]">
          <h1
            className="font-display font-bold leading-[0.95] tracking-[-0.04em] text-fg"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            Lost signal.
          </h1>

          <p className="mt-8 max-w-[42ch] text-[15.5px] leading-[1.55] text-fg-muted sm:mt-10 sm:text-[17px] sm:leading-[1.5]">
            This page doesn&apos;t exist, or it moved. Head home and take a different path.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            <span>Return home</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="pb-6 sm:pb-8 md:pb-10" />
    </main>
  );
}
