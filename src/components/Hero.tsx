"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NowPlaying from "./NowPlaying";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [toastState, setToastState] = useState<"hidden" | "entering" | "dismissing">("hidden");
  const [buildingText, setBuildingText] = useState("Still building");
  const resumeBtnRef = useRef<HTMLButtonElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openToast = useCallback(() => setToastState("entering"), []);
  const dismissToast = useCallback(() => {
    setToastState("dismissing");
    setTimeout(() => setToastState("hidden"), 350);
  }, []);

  /* ── Resume toast: auto-dismiss + outside click + ESC ── */
  useEffect(() => {
    if (toastState !== "entering") return;

    const timer = setTimeout(dismissToast, 5000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissToast();
    };

    const onClick = (e: MouseEvent) => {
      const toast = toastRef.current;
      const btn = resumeBtnRef.current;
      if (toast && !toast.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) {
        dismissToast();
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [toastState, dismissToast]);

  /* ── Console easter egg ── */
  useEffect(() => {
    console.log(
      "%c> System initialized.\n> Build 2026.04 · stable\n> The world is quite beautiful, isn't it?",
      "color: #6b7280; font-family: monospace; font-size: 11px; line-height: 1.6;"
    );
  }, []);

  /* ── Rare text swap — client-only to avoid hydration mismatch ── */
  useEffect(() => {
    if (Math.random() < 0.08) setBuildingText("The cycle continues");
  }, []);

  /* ── Tilt + brightness crossfade + depth + magnetic block ── */
  useEffect(() => {
    const section = sectionRef.current;
    const first = firstNameRef.current;
    const last = lastNameRef.current;
    const content = contentRef.current;
    if (!section || !first || !last || !content) return;

    let targetX = 0;
    let targetY = 0;
    let firstCurX = 0, firstCurY = 0;
    let lastCurX = 0, lastCurY = 0;
    let blockCurX = 0, blockCurY = 0;
    let mouseY = 0.5;
    let curNameBlend = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      mouseY = 0.5;
    };

    const tick = () => {
      firstCurX = lerp(firstCurX, targetX, 0.06);
      firstCurY = lerp(firstCurY, targetY, 0.06);
      lastCurX = lerp(lastCurX, targetX, 0.035);
      lastCurY = lerp(lastCurY, targetY, 0.035);
      blockCurX = lerp(blockCurX, targetX, 0.05);
      blockCurY = lerp(blockCurY, targetY, 0.05);

      const tiltFirst = (cx: number, cy: number) =>
        `perspective(900px) rotateY(${cx * 3}deg) rotateX(${-cy * 2}deg) translateX(${cx * 6}px) translateZ(${(Math.abs(cx) + Math.abs(cy)) * 4}px)`;
      const tiltLast = (cx: number, cy: number) =>
        `perspective(900px) rotateY(${cx * 3}deg) rotateX(${-cy * 2}deg) translateX(${cx * 6}px) translateZ(${(Math.abs(cx) + Math.abs(cy)) * 2}px)`;

      const shadowX = -firstCurX * 8;
      const shadowY = -firstCurY * 6;
      const shadowBlur = 30 + Math.abs(firstCurX + firstCurY) * 10;

      const targetBlend = mouseY < 0.38 ? -1 : mouseY > 0.52 ? 1 : 0;
      curNameBlend = lerp(curNameBlend, targetBlend, 0.04);
      const firstBrightness = 1 + curNameBlend * -0.12;
      const lastBrightness = 1 + curNameBlend * 0.15;

      first.style.transform = tiltFirst(firstCurX, firstCurY);
      first.style.textShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(37,99,235,0.12)`;
      first.style.filter = `brightness(${firstBrightness})`;

      last.style.transform = tiltLast(lastCurX, lastCurY);
      last.style.textShadow = `${-lastCurX * 6}px ${-lastCurY * 4}px ${shadowBlur * 0.8}px rgba(37,99,235,0.08)`;
      last.style.filter = `brightness(${lastBrightness})`;

      // Magnetic block + scroll: compose both transforms
      const sp = scrollProgress.current;
      const scrollScale = 1 - sp * 0.02;
      const scrollShift = -sp * 30;
      content.style.transform = `translate(${blockCurX * 8}px, ${blockCurY * 5 + scrollShift}px) scale(${scrollScale})`;

      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Scroll: fade + parallax (content transform handled in tilt loop) ── */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      scrollProgress.current = Math.min(y / (vh * 0.5), 1);

      content.style.opacity = `${1 - scrollProgress.current * 0.8}`;
      content.style.filter = `blur(${scrollProgress.current * 4}px)`;

      const ghost = section.querySelector<HTMLElement>("[data-parallax='ghost']");
      const orbs = section.querySelector<HTMLElement>("[data-parallax='orbs']");
      if (ghost) ghost.style.transform = `translate(-50%, calc(-50% + ${y * 0.12}px))`;
      if (orbs) orbs.style.transform = `translateY(${y * 0.06}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative h-screen overflow-hidden bg-bg cursor-none touch-auto">

      {/* ═══ ENVIRONMENT ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ghost text */}
        <div
          data-parallax="ghost"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 25vw, 34rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            textTransform: "uppercase",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          JK
        </div>

        {/* Ambient orbs */}
        <div data-parallax="orbs" style={{ willChange: "transform" }}>
          <div className="env-orb env-drift-a" style={{
            width: "60vmax", height: "60vmax",
            top: "0%", left: "50%",
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0.02) 45%, transparent 70%)",
            filter: "blur(80px)",
          }} />
          <div className="env-orb env-drift-b" style={{
            width: "40vmax", height: "40vmax",
            bottom: "-5%", left: "30%",
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
          }} />
        </div>

        {/* Single horizontal structural line */}
        <div className="absolute left-0 right-0 top-[43%] hero-fade-in" style={{ animationDelay: "calc(0.8s + var(--preloader-offset))" }}>
          <div className="h-px w-full" style={{
            background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 75%, transparent 95%)",
          }} />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 20%, rgba(5,5,8,0.55) 100%)",
        }} />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 h-full grid place-items-center">


        {/* Hero block — grid-centered, then nudged up slightly */}
        <div
          ref={contentRef}
          className="text-center hero-presence"
          style={{
            marginTop: "-4vh",
            willChange: "opacity, transform",
          }}
        >

          {/* JAINEEL */}
          <div className="hero-slide-in" style={{ animationDelay: "calc(0.1s + var(--preloader-offset))" }}>
            <h1
              ref={firstNameRef}
              className="text-[clamp(2.5rem,9vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.06em] text-white uppercase"
              style={{
                fontFamily: "var(--font-display)",
                willChange: "transform, text-shadow, filter",
                transition: "filter 0.3s ease",
              }}
            >
              <span className="hero-glint-wrap">
                Jaineel
                <span className="hero-glint" aria-hidden="true" />
              </span>
            </h1>
          </div>

          {/* KHATRI */}
          <div className="hero-slide-in" style={{ animationDelay: "calc(0.22s + var(--preloader-offset))" }}>
            <h1
              ref={lastNameRef}
              className="text-[clamp(2.5rem,9vw,10rem)] font-bold leading-[0.85] tracking-[-0.06em] uppercase"
              style={{
                fontFamily: "var(--font-display)",
                willChange: "transform, text-shadow, filter",
                transition: "filter 0.3s ease",
                color: "transparent",
                background: "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.28) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Khatri
            </h1>
          </div>

          {/* Descriptor */}
          <p
            className="mt-7 text-[15px] md:text-[17px] text-white/55 leading-relaxed hero-fade-in"
            style={{ animationDelay: "calc(0.45s + var(--preloader-offset))", letterSpacing: "0.01em" }}
          >
            Cybersecurity student & builder based in Brisbane.
            <br />
            Designing secure, thoughtful software.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex items-center justify-center gap-4 hero-fade-in" style={{ animationDelay: "calc(0.6s + var(--preloader-offset))" }}>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/12 hover:border-white/25 bg-white/3 hover:bg-white/7 cursor-none"
              style={{
                transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px 3px rgba(37,99,235,0.15), 0 0 48px 6px rgba(37,99,235,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              <span className="text-[13px] font-medium tracking-wide text-white/65 group-hover:text-white/95 transition-colors duration-300">
                View work
              </span>
              <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <button
              ref={resumeBtnRef}
              onClick={openToast}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/8 hover:border-white/20 bg-white/2 hover:bg-white/5 cursor-none"
              style={{
                transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px 2px rgba(37,99,235,0.10), 0 0 40px 4px rgba(37,99,235,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              <span className="text-[13px] tracking-wide text-white/50 group-hover:text-white/85 transition-colors duration-300">
                Resume
              </span>
              <svg className="w-3 h-3 text-white/25 group-hover:text-white/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resume toast */}
        {toastState !== "hidden" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ paddingTop: "12vh" }}>
            {/* Soft focus overlay */}
            <div
              className={`absolute inset-0 ${toastState === "dismissing" ? "resume-toast-exit" : "resume-toast-enter"}`}
              style={{
                background: "radial-gradient(ellipse 40% 35% at 50% 55%, rgba(0,0,0,0.15) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              ref={toastRef}
              className={`pointer-events-auto px-6 py-4 rounded-xl border backdrop-blur-[8px] ${toastState === "dismissing" ? "resume-toast-exit" : "resume-toast-enter"}`}
              style={{
                maxWidth: 300,
                background: "rgba(255,255,255,0.065)",
                borderColor: "rgba(255,255,255,0.10)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div>
                  <p className="text-[15px] font-medium text-white/95 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Resume coming soon
                  </p>
                  <p className="text-[12px] text-white/50 leading-relaxed">
                    Still refining the details — check back shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom bar — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 md:pb-8 flex items-end justify-between hero-fade-in" style={{ animationDelay: "calc(1s + var(--preloader-offset))" }}>
          <NowPlaying />
          <p className="text-[10px] font-mono text-white/12 tracking-wider">
            {buildingText}<span className="text-white/20">.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
