"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  LIVE:      { bg: "var(--status-live-bg)",     text: "var(--status-live-text)",     border: "var(--status-live-border)" },
  WIP:       { bg: "var(--status-wip-bg)",      text: "var(--status-wip-text)",      border: "var(--status-wip-border)" },
  COMPLETE:  { bg: "var(--status-complete-bg)", text: "var(--status-complete-text)", border: "var(--status-complete-border)" },
  ACTIVE:    { bg: "var(--status-active-bg)",   text: "var(--status-active-text)",   border: "var(--status-active-border)" },
  COLLAB:    { bg: "var(--status-collab-bg)",   text: "var(--status-collab-text)",   border: "var(--status-collab-border)" },
  PAUSED:    { bg: "var(--status-paused-bg)",   text: "var(--status-paused-text)",   border: "var(--status-paused-border)" },
  "ON HOLD": { bg: "var(--status-paused-bg)",   text: "var(--status-paused-text)",   border: "var(--status-paused-border)" },
};

type Project = {
  index: string;
  name: string;
  description: string;
  status: "Live" | "WIP" | "Complete" | "Active";
  year: string;
  href: string;
  tech: string[];
  external?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Hawthorne Corner Store",
    description: "Local convenience store site — menu, hours, and ordering for a real small business with real customers.",
    status: "Live",
    year: "2024",
    href: "https://hawthornecornerstore.com.au",
    tech: ["Next.js", "Tailwind", "Vercel"],
    external: true,
  },
  {
    index: "02",
    name: "Portfolio v2",
    description: "This site. Next.js, Framer Motion, and a deliberate restraint problem.",
    status: "Live",
    year: "2026",
    href: "https://jaineel.dev",
    tech: ["Next.js", "Framer Motion", "TypeScript"],
    external: true,
  },
  {
    index: "03",
    name: "NIDS-ML",
    description: "Network intrusion detection system, ML-augmented. Built with Nicholas Ng.",
    status: "WIP",
    year: "2026",
    href: "https://github.com/jaineeldev/nids-ml",
    tech: ["Python", "Scikit-learn", "NumPy"],
    external: true,
  },
  {
    index: "04",
    name: "System Fingerprint Tool",
    description: "Python GUI for security recon — host info plus multi-threaded port scanning, exports CSV.",
    status: "Complete",
    year: "2025",
    href: "https://github.com/jaineeldev/system-fingerprint-tool",
    tech: ["Python", "Tkinter", "CSV"],
    external: true,
  },
  {
    index: "05",
    name: "DesktopBuddy",
    description: "Electron desktop mascot with a live system-stat HUD. Personality bundled in.",
    status: "WIP",
    year: "2026",
    href: "https://github.com/jaineeldev/desktop_buddy",
    tech: ["Electron", "TypeScript", "React"],
    external: true,
  },
  {
    index: "06",
    name: "Cybersecurity Assessments",
    description: "TAFE coursework — vulnerability reports, threat modelling, control evaluations.",
    status: "Active",
    year: "2026",
    href: "https://github.com/jaineeldev/cybersecurity-assessments",
    tech: ["Threat modelling", "Reporting"],
    external: true,
  },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M3.5 10.5L10.5 3.5" />
      <path d="M5 3.5h5.5V9" />
    </svg>
  );
}

function ProjectRow({ project, i }: { project: Project; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
      className="border-b border-[var(--work-divider)]"
    >
      <a
        href={project.href}
        target={project.external ? "_blank" : undefined}
        rel={project.external ? "noopener noreferrer" : undefined}
        className="group relative grid grid-cols-[2.25rem_4.25rem_1fr_auto] items-start gap-x-5 px-1 py-5 transition-colors duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-accent before:opacity-0 before:transition-opacity before:duration-[250ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] before:content-[''] hover:before:opacity-100 sm:grid-cols-[2.75rem_5rem_1fr_auto] sm:gap-x-8 sm:py-6 md:grid-cols-[3rem_5.5rem_1fr_auto] md:py-7"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim sm:pt-[0.4rem]">
          {project.index}
        </span>

        {(() => {
          const key = project.status.toUpperCase();
          const s = STATUS_STYLES[key] ?? { bg: "transparent", text: "var(--color-fg-muted)", border: "var(--color-border)" };
          return (
            <span
              className="inline-flex w-fit items-center self-start border px-1.5 py-[2px] font-mono text-[10px] font-medium uppercase tracking-[0.14em] sm:mt-[0.35rem]"
              style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
            >
              {key}
            </span>
          );
        })()}

        <div className="flex min-w-0 flex-col gap-2">
          <h3
            className="font-display font-semibold leading-[1.15] tracking-[-0.018em] text-fg transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]"
            style={{ fontSize: "clamp(1.125rem, 1.7vw, 1.4rem)" }}
          >
            {project.name}
          </h3>

          <p className="max-w-[62ch] text-[14px] leading-[1.55] text-fg-muted sm:text-[15px]">
            {project.description}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
            {project.tech.map((t, idx) => (
              <span key={t} className="flex items-center gap-2.5">
                <span>{t}</span>
                {idx < project.tech.length - 1 && (
                  <span aria-hidden className="text-fg-faint">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <ArrowUpRight className="text-fg-dim transition-colors duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent sm:mt-[0.45rem]" />
      </a>
    </motion.li>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative bg-bg px-6 pt-10 pb-16 sm:px-10 sm:pt-12 sm:pb-20 md:px-14 md:pt-14 md:pb-28"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <motion.header
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 sm:mb-16"
        >
          <h2
            className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-fg"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.75rem)" }}
          >
            Work
          </h2>
          <p className="mt-5 max-w-[44ch] text-[14.5px] leading-[1.55] text-fg-muted sm:mt-6 sm:text-[15px]">
            Six projects. Some live, some still in progress — across web, security, and systems.
          </p>
        </motion.header>

        <ul className="border-t border-[var(--work-divider)]">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.index} project={p} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
