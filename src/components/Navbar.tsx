"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Logo — fixed top-left */}
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
        className="fixed top-5 left-6 md:left-8 z-50 text-[14px] font-semibold text-white/80 hover:text-white tracking-tight transition-colors duration-200 nav-enter"
        style={{ fontFamily: "var(--font-display)" }}
      >
        JK<span className="text-accent">.</span>
      </a>

      {/* Centered nav — viewport-centered */}
      <nav
        className="fixed top-4 z-50 nav-enter hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-full border border-white/12 backdrop-blur-lg"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.05)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
            className="px-4 py-1.5 text-[12px] text-white/50 hover:text-white/90 rounded-full hover:bg-white/5 transition-all duration-200 tracking-wide"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-5 right-6 z-50 md:hidden text-[11px] tracking-widest text-white/35 hover:text-white/70 uppercase transition-colors duration-200 nav-enter"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center hero-fade-in">
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
