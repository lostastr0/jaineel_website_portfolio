"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Save = {
  slot: string;
  game: string;
  quote: string;
  speaker?: string;
};

const SAVES: Save[] = [
  {
    slot: "Save · 01",
    game: "Elden Ring",
    quote: "You will witness true horror.",
    speaker: "Malenia",
  },
  {
    slot: "Save · 02",
    game: "Pokémon",
    quote: "A wild side-quest appeared. It's super effective.",
  },
  {
    slot: "Save · 03",
    game: "Final Fantasy VII",
    quote: "Hey, don't go falling for me. You'll regret it.",
    speaker: "Aerith",
  },
];

export default function SecretPage() {
  return (
    <main className="relative flex min-h-svh flex-col bg-bg px-7 sm:px-10 md:px-14">
      <header className="flex items-start justify-between pt-6 sm:pt-8 md:pt-10">
        <Link
          href="/"
          className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg transition-colors duration-300 hover:text-accent"
          aria-label="Back to top"
        >
          JK.
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-accent"
        >
          Home
        </Link>
      </header>

      <div className="flex flex-1 items-center py-20 sm:py-24 md:py-28">
        <div className="w-full max-w-[1400px]">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-fg"
            style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          >
            You found this.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="mt-8 max-w-[48ch] text-[15.5px] leading-[1.55] text-fg-muted sm:mt-10 sm:text-[17px] sm:leading-[1.5]"
          >
            Three save files I keep going back to. No commentary, just the lines.
          </motion.p>

          <ul className="mt-14 flex flex-col border-t border-[var(--work-divider)] sm:mt-20">
            {SAVES.map((save, i) => (
              <motion.li
                key={save.slot}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.45 + i * 0.14 }}
                className="border-b border-[var(--work-divider)] py-7 sm:py-9"
              >
                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-[14rem_1fr] sm:gap-x-12">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim">
                      {save.slot}
                    </span>
                    <span className="font-display text-[18px] tracking-[-0.005em] text-fg sm:text-[19px]">
                      {save.game}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="max-w-[58ch] text-[16px] leading-[1.5] text-fg-muted sm:text-[18px] sm:leading-[1.45]">
                      {save.quote}
                    </p>
                    {save.speaker && (
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim">
                        — {save.speaker}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
            className="mt-14 flex items-baseline justify-between gap-6 sm:mt-20"
          >
            <Link
              href="/"
              className="group inline-flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              <span>Return to main quest</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim">
              Autosaved
            </span>
          </motion.div>
        </div>
      </div>

      <div className="pb-6 sm:pb-8 md:pb-10" />
    </main>
  );
}
