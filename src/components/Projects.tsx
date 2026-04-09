"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

/* ── Project data ── */
const PROJECTS = [
  {
    title: "Portfolio v2",
    description:
      "This site \u2014 a premium personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Designed for speed, clarity, and strong visual identity.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    accentColor: "37,99,235",
  },
  {
    title: "Network Scanner",
    description:
      "A Python-based network reconnaissance tool with port scanning, service detection, and exportable reports. Built for learning offensive security fundamentals.",
    stack: ["Python", "Nmap", "Networking", "CLI"],
    liveUrl: null,
    githubUrl: "#",
    accentColor: "99,102,241",
  },
  {
    title: "Secure Auth API",
    description:
      "RESTful authentication service with JWT tokens, rate limiting, and input validation. Focused on secure-by-default patterns and clean architecture.",
    stack: ["Node.js", "Express", "SQL", "REST APIs"],
    liveUrl: null,
    githubUrl: "#",
    accentColor: "59,130,246",
  },
];

/* ── Shared easing ── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Tech pill ── */
function TechPill({ name }: { name: string }) {
  return (
    <span
      className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-medium tracking-wide text-white/55"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      {name}
    </span>
  );
}

/* ── Single project block with mouse tracking ── */
function ProjectBlock({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0.5, y: 0.5, inside: false });
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
      mouse.current.inside = true;
    };

    const onLeave = () => {
      mouse.current.inside = false;
    };

    const tick = () => {
      const c = current.current;
      const m = mouse.current;

      const targetRx = m.inside ? (m.y - 0.5) * -4 : 0;
      const targetRy = m.inside ? (m.x - 0.5) * 4 : 0;
      const targetGx = m.inside ? m.x * 100 : 50;
      const targetGy = m.inside ? m.y * 100 : 50;

      c.rx = lerp(c.rx, targetRx, 0.08);
      c.ry = lerp(c.ry, targetRy, 0.08);
      c.gx = lerp(c.gx, targetGx, 0.1);
      c.gy = lerp(c.gy, targetGy, 0.1);

      if (card) {
        card.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      }

      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(600px circle at ${c.gx}% ${c.gy}%, rgba(${project.accentColor},${m.inside ? 0.07 : 0}) 0%, transparent 60%)`;
      }

      if (imageRef.current) {
        imageRef.current.style.transform = `translateZ(${m.inside ? -8 : 0}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateZ(${m.inside ? 12 : 0}px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [lerp, project.accentColor]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={cardRef}
        className="group relative rounded-2xl border overflow-hidden"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
          boxShadow:
            "0 4px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "box-shadow 0.5s ease, border-color 0.5s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            `0 16px 70px rgba(0,0,0,0.4), 0 0 50px rgba(${project.accentColor},0.06), inset 0 1px 0 rgba(255,255,255,0.06)`;
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.13)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.07)";
        }}
      >
        {/* Mouse-tracking glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ transition: "opacity 0.4s ease" }}
        />

        {/* Static accent glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at ${
              isEven ? "20% 50%" : "80% 50%"
            }, rgba(${project.accentColor},0.10) 0%, transparent 60%)`,
          }}
        />

        {/* Inner layout -- alternating direction */}
        <div
          className={`relative flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Visual preview area — sits slightly behind */}
          <div
            ref={imageRef}
            className="relative md:w-[45%] aspect-[16/10] md:aspect-auto min-h-[260px] overflow-hidden"
            style={{
              transition: "transform 0.4s ease",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div
                className="w-full max-w-[300px] rounded-lg border border-white/[0.07] group-hover:border-white/[0.12] transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                  boxShadow:
                    "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                  <span className="w-2 h-2 rounded-full bg-white/12" />
                  <span className="w-2 h-2 rounded-full bg-white/8" />
                  <span className="w-2 h-2 rounded-full bg-white/8" />
                </div>
                {/* Placeholder lines */}
                <div className="px-4 py-5 space-y-3">
                  <div className="h-1.5 w-[45%] rounded-full bg-white/7" />
                  <div className="h-1.5 w-[70%] rounded-full bg-white/5" />
                  <div className="h-1.5 w-[55%] rounded-full bg-white/4" />
                  <div className="h-1.5 w-[35%] rounded-full bg-white/3" />
                </div>
              </div>
            </div>
          </div>

          {/* Text content — sits slightly forward */}
          <div
            ref={textRef}
            className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 md:py-14"
            style={{
              transition: "transform 0.4s ease",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Project number */}
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20 mb-4">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <h3
              className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-[14px] text-white/40 leading-relaxed mb-7 max-w-md">
              {project.description}
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/12 hover:border-white/25 bg-white/4 hover:bg-white/8 transition-all duration-300"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 24px 3px rgba(37,99,235,0.15), 0 0 48px 6px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "inset 0 1px 0 rgba(255,255,255,0.04)";
                  }}
                >
                  <span className="text-[13px] font-medium tracking-wide text-white/65 group-hover/btn:text-white/95 transition-colors duration-300">
                    View project
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-white/30 group-hover/btn:text-white/70 transition-colors duration-300"
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
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/8 hover:border-white/18 bg-white/2 hover:bg-white/5 transition-all duration-300"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                    transition: "box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 16px 2px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "inset 0 1px 0 rgba(255,255,255,0.02)";
                  }}
                >
                  <span className="text-[12px] tracking-wide text-white/45 group-hover/btn:text-white/80 transition-colors duration-300">
                    GitHub
                  </span>
                  <svg
                    className="w-3 h-3 text-white/20 group-hover/btn:text-white/55 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Projects section ── */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven entrance transition */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.5], [6, 0]);

  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const scrollY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });
  const blur = useSpring(rawBlur, { stiffness: 60, damping: 20 });
  const filterBlur = useMotionTemplate`blur(${blur}px)`;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-bg py-32"
    >
      {/* Ambient environment */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "60vmax",
            height: "60vmax",
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(5,5,8,0.5) 100%)",
          }}
        />
      </div>

      {/* Scroll-transitioned content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6"
        style={{
          opacity,
          y: scrollY,
          scale,
          filter: filterBlur,
        }}
      >
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.p
            className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/30 mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
          >
            Selected
          </motion.p>
          <motion.h2
            className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-0.04em] text-white/90"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
          >
            Work
          </motion.h2>
          <motion.p
            className="mt-4 text-[14px] text-white/35 max-w-sm mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            Projects I've built and things I'm working on.
          </motion.p>
        </div>

        {/* Project blocks */}
        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((project, i) => (
            <ProjectBlock key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Coming soon footer */}
        <motion.p
          className="text-center mt-20 text-[12px] font-mono tracking-[0.2em] text-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          More projects coming soon.
        </motion.p>
      </motion.div>

      {/* Grain */}
    </section>
  );
}
