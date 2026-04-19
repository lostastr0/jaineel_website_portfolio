import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60vmax",
          height: "60vmax",
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <div className="text-fg/60 mb-10">
          <Logo size={24} />
        </div>

        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg/30 mb-4">
          Error · 404
        </p>

        <h1
          className="text-[clamp(3rem,12vw,6rem)] font-bold tracking-[-0.05em] text-fg/95 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lost signal.
        </h1>

        <p className="mt-6 text-[14px] text-fg/40 leading-relaxed max-w-sm">
          This page doesn&apos;t exist, or it moved. Let&apos;s get you back to
          somewhere real.
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-fg/10 hover:border-fg/25 bg-fg/3 hover:bg-fg/6 transition-all duration-300"
        >
          <span className="text-[12px] tracking-[0.14em] uppercase text-fg/70 group-hover:text-fg/95 transition-colors">
            Return home
          </span>
          <span className="text-fg/40 group-hover:text-fg/80 transition-all duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
