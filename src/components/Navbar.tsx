"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
          transition: "backdrop-filter 0.4s ease",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        {/* Left — logo, positioned outside container */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-white/80 hover:text-white tracking-tight transition-colors duration-200"
          style={{ fontFamily: "var(--font-display)" }}
        >
          JK<span className="text-accent">.</span>
        </a>

        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Center — nav pill */}
          <nav
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-0.5 px-1.5 py-1 rounded-full backdrop-blur-2xl"
            style={{
              background: scrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: scrolled
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow: scrolled
                ? "0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.12)"
                : "0 0 0 0.5px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 0.5px 0 rgba(255,255,255,0.10)",
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
                    color: isActive ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.40)",
                    background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                    boxShadow: isActive ? "inset 0 0.5px 0 rgba(255,255,255,0.08)" : "none",
                    transition: "color 0.3s, background 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    }
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right — mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[11px] tracking-widest text-white/35 hover:text-white/70 uppercase transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>

        </div>

        {/* Info rail — sits directly under nav bar */}
        <div className="hidden md:flex items-center justify-center mt-1.5 hero-fade-in" style={{ animationDelay: "calc(0.7s + var(--preloader-offset))" }}>
          <div className="flex items-center gap-2">
            {/* Available — primary chip */}
            <div
              className="inline-flex items-center gap-2 h-7 px-3.5 rounded-full"
              style={{
                background: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                border: scrolled ? "1px solid rgba(255,255,255,0.11)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: scrolled
                  ? "inset 0 0.5px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.15)"
                  : "inset 0 0.5px 0 rgba(255,255,255,0.06)",
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
                  paddingTop: 2,
                  color: scrolled ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.50)",
                  transition: "color 0.4s ease",
                }}
              >
                {statusText}
              </span>
            </div>

            {/* Year — secondary chip */}
            <div
              className="inline-flex items-center justify-center h-7 px-3 rounded-full"
              style={{
                background: scrolled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.05)",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  lineHeight: 1,
                  paddingTop: 2,
                  color: scrolled ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.32)",
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
                background: scrolled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.05)",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  lineHeight: 1,
                  paddingTop: 2,
                  color: scrolled ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.32)",
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
        <div className="md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-y-auto hero-fade-in">
          <nav className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="text-2xl font-semibold tracking-tight text-white/40 hover:text-white transition-colors py-3 px-8"
                style={{ fontFamily: "var(--font-display)" }}
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
