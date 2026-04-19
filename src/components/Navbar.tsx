"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [statusText, setStatusText] = useState("Available for work");
  const [scrolled, setScrolled] = useState(false);
  const hasScrolledPast = useRef(false);
  const restoredTriggered = useRef(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  /* Scroll-based active section detection + "Restored" easter egg */
  const handleScroll = useCallback(() => {
    const offset = window.innerHeight * 0.35;
    let current = "";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = id;
      }
    }
    setActiveSection(current);

    /* Track scroll state for header styling */
    const scrollY = window.scrollY;
    setScrolled(scrollY > window.innerHeight * 0.85);

    /* Track if user scrolled past 60vh, then returned to top */
    const threshold = window.innerHeight * 0.6;
    if (scrollY > threshold) {
      hasScrolledPast.current = true;
    }
    if (hasScrolledPast.current && !restoredTriggered.current && scrollY < 10) {
      restoredTriggered.current = true;
      setStatusText("Restored");
      setTimeout(() => setStatusText("Available for work"), 1500);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed header system */}
      <div
        className="fixed top-0 left-0 right-0 z-50 nav-enter pt-2"
        style={{
          transition: "backdrop-filter 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
          backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "blur(4px)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(150%)" : "blur(4px)",
          background: scrolled
            ? "linear-gradient(180deg, rgba(var(--bg-rgb),0.85) 0%, rgba(var(--bg-rgb),0.6) 55%, rgba(var(--bg-rgb),0) 100%)"
            : "linear-gradient(180deg, rgba(var(--bg-rgb),0.35) 0%, rgba(var(--bg-rgb),0) 100%)",
          borderBottom: "1px solid transparent",
          boxShadow: scrolled
            ? "0 16px 40px -20px rgba(var(--shadow-rgb),0.55)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        {/* Left — logo, pinned to far left of viewport, vertically aligned with nav pill */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="absolute left-12 md:left-20 -translate-y-1/2 transition-colors duration-200 flex items-center"
          style={{ top: "2.25rem", color: "rgba(var(--fg-rgb), 0.80)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 0.80)"; }}
          aria-label="JK home"
        >
          <Logo size={16} />
        </a>

        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Center — nav pill */}
          <nav
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-0.5 px-1.5 py-1 rounded-full backdrop-blur-2xl"
            style={{
              background: scrolled
                ? "linear-gradient(135deg, rgba(var(--fg-rgb),0.09) 0%, rgba(var(--fg-rgb),0.05) 100%)"
                : "linear-gradient(135deg, rgba(var(--fg-rgb),0.06) 0%, rgba(var(--fg-rgb),0.03) 100%)",
              border: scrolled
                ? "1px solid rgba(var(--fg-rgb),0.12)"
                : "1px solid rgba(var(--fg-rgb),0.08)",
              boxShadow: scrolled
                ? "0 0 0 0.5px rgba(var(--fg-rgb),0.06), 0 4px 16px rgba(var(--shadow-rgb),0.35), 0 12px 40px rgba(var(--shadow-rgb),0.2), inset 0 0.5px 0 rgba(var(--fg-rgb),0.12)"
                : "0 0 0 0.5px rgba(var(--fg-rgb),0.04), 0 2px 8px rgba(var(--shadow-rgb),0.2), 0 8px 32px rgba(var(--shadow-rgb),0.12), inset 0 0.5px 0 rgba(var(--fg-rgb),0.10)",
              transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="relative px-5 py-2 text-[11px] rounded-full transition-all duration-300 tracking-[0.06em] uppercase"
                  style={{
                    color: isActive ? "rgba(var(--fg-rgb),0.90)" : "rgba(var(--fg-rgb),0.40)",
                    background: isActive ? "rgba(var(--fg-rgb),0.07)" : "transparent",
                    boxShadow: isActive ? "inset 0 0.5px 0 rgba(var(--fg-rgb),0.08)" : "none",
                    transition: "color 0.3s, background 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(var(--fg-rgb),0.05)";
                      e.currentTarget.style.color = "rgba(var(--fg-rgb),0.85)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(var(--fg-rgb),0.40)";
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right — theme toggle (desktop) */}
          <div
            className="hidden md:flex absolute -translate-y-1/2 items-center"
            style={{ right: "5rem", top: "2.25rem" }}
          >
            <ThemeToggle />
          </div>

          {/* Right — mobile controls */}
          <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <ThemeToggle compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[11px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: "rgba(var(--fg-rgb), 0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 0.70)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 0.35)"; }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>

        </div>

        {/* Info rail — sits directly under nav bar */}
        <div
          className="hidden md:flex items-center justify-center overflow-hidden"
          style={{
            marginTop: scrolled ? 0 : "0.375rem",
            maxHeight: scrolled ? 0 : "2.5rem",
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-6px)" : "translateY(0)",
            pointerEvents: scrolled ? "none" : "auto",
            transition: "opacity 0.35s ease, transform 0.35s ease, max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), margin-top 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="flex items-center gap-2 hero-fade-in" style={{ animationDelay: "calc(0.7s + var(--preloader-offset))" }}>
            {/* Available — primary chip */}
            <div
              className="inline-flex items-center gap-2 h-7 px-3.5 rounded-full"
              style={{
                background: scrolled ? "rgba(var(--fg-rgb),0.06)" : "rgba(var(--fg-rgb),0.04)",
                border: scrolled ? "1px solid rgba(var(--fg-rgb),0.11)" : "1px solid rgba(var(--fg-rgb),0.08)",
                boxShadow: scrolled
                  ? "inset 0 0.5px 0 rgba(var(--fg-rgb),0.08), 0 2px 8px rgba(var(--shadow-rgb),0.15)"
                  : "inset 0 0.5px 0 rgba(var(--fg-rgb),0.06)",
                transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <span
                className="hero-status-dot shrink-0"
                style={{ width: 5, height: 5, marginTop: 2 }}
              />
              <span
                className="text-[9px] font-mono tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  lineHeight: 1,
                  transform: "translateY(0.5px)",
                  color: scrolled ? "rgba(var(--fg-rgb),0.62)" : "rgba(var(--fg-rgb),0.52)",
                  transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {statusText}
              </span>
            </div>

            {/* Year — secondary chip */}
            <div
              className="inline-flex items-center justify-center h-7 px-3 rounded-full"
              style={{
                background: scrolled ? "rgba(var(--fg-rgb),0.04)" : "rgba(var(--fg-rgb),0.02)",
                border: scrolled ? "1px solid rgba(var(--fg-rgb),0.08)" : "1px solid rgba(var(--fg-rgb),0.05)",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  lineHeight: 1,
                  transform: "translateY(0.5px)",
                  color: scrolled ? "rgba(var(--fg-rgb),0.40)" : "rgba(var(--fg-rgb),0.32)",
                  transition: "color 0.4s ease",
                }}
              >
                2026
              </span>
            </div>

            {/* Location — secondary chip */}
            <div
              className="inline-flex items-center justify-center h-7 px-3 rounded-full"
              style={{
                background: scrolled ? "rgba(var(--fg-rgb),0.04)" : "rgba(var(--fg-rgb),0.02)",
                border: scrolled ? "1px solid rgba(var(--fg-rgb),0.08)" : "1px solid rgba(var(--fg-rgb),0.05)",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  lineHeight: 1,
                  transform: "translateY(0.5px)",
                  color: scrolled ? "rgba(var(--fg-rgb),0.40)" : "rgba(var(--fg-rgb),0.32)",
                  transition: "color 0.4s ease",
                }}
              >
                Brisbane, AU
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 backdrop-blur-2xl flex flex-col items-center justify-center overflow-y-auto mobile-menu-drop"
          style={{ background: "rgba(var(--bg-rgb), 0.95)" }}
        >
          <nav className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="text-2xl font-semibold tracking-tight transition-colors py-3 px-8 mobile-menu-item"
                style={{
                  fontFamily: "var(--font-display)",
                  animationDelay: `${80 + i * 50}ms`,
                  color: "rgba(var(--fg-rgb), 0.40)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(var(--fg-rgb), 0.40)"; }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
