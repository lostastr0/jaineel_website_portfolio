"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const threshold = window.innerHeight * 0.9;
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-nav"
          initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg"
        >
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-7 py-4 sm:px-10 sm:py-5 md:px-14">
            <a
              href="#home"
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg transition-colors duration-300 hover:text-accent"
              aria-label="Back to top"
            >
              JK.
            </a>

            <div className="flex items-center gap-7 sm:gap-8">
              <nav
                aria-label="Section"
                className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] sm:flex"
              >
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-fg-muted transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#contact"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-accent sm:hidden"
              >
                Contact
              </a>

              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
