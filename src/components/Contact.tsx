"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/jaineel" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jaineel" },
];

/* ── CTA container with cursor-reactive glow + ambient float ── */
function CTAContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 50, y: 50, inside: false });
  const current = useRef({ x: 50, y: 50 });

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 100;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 100;
      mouse.current.inside = true;
    };

    const onLeave = () => {
      mouse.current.inside = false;
    };

    const tick = () => {
      const c = current.current;
      const m = mouse.current;

      c.x = lerp(c.x, m.inside ? m.x : 50, 0.08);
      c.y = lerp(c.y, m.inside ? m.y : 50, 0.08);

      if (glowRef.current) {
        const op = m.inside ? 0.10 : 0;
        glowRef.current.style.background =
          `radial-gradient(500px circle at ${c.x}% ${c.y}%, rgba(37,99,235,${op}) 0%, transparent 60%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [lerp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.25, ease }}
      className="w-full max-w-md mx-auto"
    >
      <motion.div
        ref={containerRef}
        className="relative rounded-2xl border border-white/5 backdrop-blur-sm px-10 py-12 text-center overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.018)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025)",
        }}
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 7,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Cursor-reactive glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.4"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const scrollY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });
  const blur = useSpring(rawBlur, { stiffness: 60, damping: 20 });
  const filterBlur = useMotionTemplate`blur(${blur}px)`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-bg flex items-center justify-center"
    >
      {/* Ambient environment */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Wide ambient orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "50vmax",
            height: "50vmax",
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
        />
        {/* Primary focal glow behind CTA */}
        <div
          className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, transparent 70%)",
            filter: "blur(160px)",
          }}
        />
        {/* Vignette — darker edges, lighter center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 55%, transparent 10%, rgba(5,5,8,0.6) 100%)",
          }}
        />
      </div>

      {/* Content — single centered column */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center"
        style={{
          opacity,
          y: scrollY,
          scale,
          filter: filterBlur,
        }}
      >
        {/* Label */}
        <motion.p
          className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/30 mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
        >
          Contact
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-0.04em] text-white/90"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Let&apos;s build something.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-[14px] text-white/35 leading-relaxed max-w-sm mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          Open to opportunities, collaborations, or just a conversation.
        </motion.p>

        {/* Availability indicator */}
        <motion.div
          className="mt-3 flex items-center gap-2.5 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/80"
              style={{
                boxShadow: "0 0 8px rgba(52,211,153,0.4), 0 0 16px rgba(52,211,153,0.15)",
              }}
            />
          </span>
          <span className="text-[12px] tracking-[0.12em] text-white/55">
            Available for work
          </span>
        </motion.div>

        {/* CTA container — visual anchor */}
        <div className="mt-14">
          <CTAContainer>
            {/* Primary CTA */}
            <a
              href="mailto:your@email.com"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/15 hover:border-white/28 bg-white/6 hover:bg-white/10 transition-all duration-300"
              style={{
                boxShadow:
                  "0 0 20px 2px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                transform: "scale(1.02)",
                transition:
                  "box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px 5px rgba(37,99,235,0.18), 0 0 64px 10px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02) translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px 2px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
            >
              <span className="text-[14px] font-medium tracking-wide text-white/85 group-hover:text-white transition-colors duration-300">
                Email me
              </span>
              <svg
                className="w-4 h-4 text-white/35 group-hover:text-white/75 group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            {/* Animated accent line */}
            <motion.div
              className="mt-7 mx-auto h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              }}
              initial={{ width: "0%" }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Secondary links */}
            <div className="mt-7 flex items-center justify-center gap-8">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-[13px] tracking-wide text-white/50 hover:text-white/85 transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-white/25 transition-all duration-300" />
                </a>
              ))}
            </div>
          </CTAContainer>
        </div>

      </motion.div>
    </section>
  );
}
