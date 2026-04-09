"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-2 max-w-7xl mx-auto px-6 md:px-10">
      <motion.div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.3) 20%, rgba(37,99,235,0.5) 50%, rgba(37,99,235,0.3) 80%, transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Center glow dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{ boxShadow: "0 0 12px rgba(37,99,235,0.6)" }}
      />
    </div>
  );
}
