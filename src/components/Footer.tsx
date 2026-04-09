"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "GitHub", href: "https://github.com/jaineel" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jaineel" },
  { label: "Email", href: "mailto:your@email.com" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 50, y: 50, inside: false });
  const current = useRef({ x: 50, y: 50 });

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  /* Cursor-reactive glow */
  useEffect(() => {
    const el = footerRef.current;
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
      c.x = lerp(c.x, m.inside ? m.x : 50, 0.06);
      c.y = lerp(c.y, m.inside ? m.y : 50, 0.06);

      if (glowRef.current) {
        const op = m.inside ? 0.08 : 0;
        glowRef.current.style.background =
          `radial-gradient(600px circle at ${c.x}% ${c.y}%, rgba(37,99,235,${op}) 0%, transparent 60%)`;
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

  /* Scroll-driven entrance */
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start 0.7"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.6], [4, 0]);

  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const blur = useSpring(rawBlur, { stiffness: 60, damping: 20 });
  const filterBlur = useMotionTemplate`blur(${blur}px)`;

  return (
    <footer ref={footerRef} className="relative mt-28 bg-bg overflow-hidden">
      {/* Cursor-reactive glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Static ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "50vw",
            height: "50vh",
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.035) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Background signature watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          fontSize: "clamp(8rem, 18vw, 16rem)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.018)",
          filter: "blur(1px)",
          whiteSpace: "nowrap",
        }}
      >
        JK
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center"
        style={{ opacity, y, filter: filterBlur }}
      >
        {/* Top divider */}
        <motion.div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Main closing line */}
        <motion.p
          className="text-[13px] font-mono tracking-[0.22em] uppercase text-white/40"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Built with intention.
        </motion.p>

        {/* Name + year */}
        <motion.p
          className="mt-2.5 text-[12px] tracking-[0.14em] text-white/28"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
        >
          Jaineel Khatri &mdash; 2026
        </motion.p>

        {/* Links */}
        <motion.div
          className="mt-7 flex items-center gap-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.26, ease }}
        >
          {LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-8">
              {i > 0 && (
                <span className="text-white/12 text-[10px]">&middot;</span>
              )}
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group relative text-[12px] tracking-[0.08em] text-white/35 hover:text-white/75 transition-all duration-300 hover:-translate-y-0.5"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-white/25 transition-all duration-300 ease-out" />
              </a>
            </span>
          ))}
        </motion.div>

        {/* Final closing whisper */}
        <motion.p
          className="mt-14 text-[11px] font-mono tracking-[0.2em] text-white/18"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Still learning. Always building.
        </motion.p>
      </motion.div>
    </footer>
  );
}
