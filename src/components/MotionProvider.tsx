"use client";

import { MotionConfig } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
