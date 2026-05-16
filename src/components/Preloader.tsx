"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const PROGRESS_DURATION_S = 1.2;
const FADE_OUT_S = 0.45;
const SESSION_KEY = "jk_preloader_seen";

export const PRELOADER_DONE_EVENT = "preloader:done";

let preloaderDoneFlag = false;
export function isPreloaderDone(): boolean {
  return preloaderDoneFlag;
}

function notifyDone() {
  if (preloaderDoneFlag) return;
  preloaderDoneFlag = true;
  window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
}

function checkShouldSkip(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  } catch {
    /* sessionStorage unavailable */
  }
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (checkShouldSkip()) {
      setShow(false);
      notifyDone();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* sessionStorage unavailable */
      }
      setDone(true);
      notifyDone();
    }, PROGRESS_DURATION_S * 1000);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const unlock = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
    }, FADE_OUT_S * 1000);
    return () => window.clearTimeout(unlock);
  }, [done]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden
          className="jk-preloader-root fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_S, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-6 sm:gap-7">
            <span
              className="font-mono text-[64px] font-medium uppercase tracking-[-0.01em] text-fg"
              style={{ lineHeight: 1 }}
            >
              JK.
            </span>

            <div className="relative h-px w-[300px] overflow-hidden bg-fg-faint">
              <motion.div
                className="absolute inset-y-0 left-0 right-0 bg-fg"
                style={{ transformOrigin: "left center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: PROGRESS_DURATION_S, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
