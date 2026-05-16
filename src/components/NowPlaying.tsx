"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const POLL_MS = 30_000;

type Track = { isPlaying: true; title: string; artist: string };
type Idle = { isPlaying: false };
type State = Track | Idle | null;

export default function NowPlaying() {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });
        if (!res.ok) {
          if (!cancelled) setState({ isPlaying: false });
          return;
        }
        const data = (await res.json()) as State;
        if (!cancelled) setState(data);
      } catch {
        if (!cancelled) setState({ isPlaying: false });
      }
    }

    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const playing = state && state.isPlaying ? state : null;

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key={`${playing.title}-${playing.artist}`}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex max-w-full items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]"
        >
          <span
            aria-hidden
            className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span className="text-fg-dim">Now playing</span>
          <span className="text-fg-faint" aria-hidden>·</span>
          <span className="truncate text-fg-muted normal-case tracking-normal">
            <span className="text-fg">{playing.title}</span>
            <span className="mx-2 text-fg-faint" aria-hidden>—</span>
            <span>{playing.artist}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
