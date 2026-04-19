"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${
        compact ? "h-7 w-7" : "h-8 w-8"
      }`}
      style={{
        background: "rgba(var(--fg-rgb), 0.04)",
        border: "1px solid rgba(var(--fg-rgb), 0.10)",
        boxShadow: "inset 0 0.5px 0 rgba(var(--fg-rgb), 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(var(--fg-rgb), 0.08)";
        e.currentTarget.style.borderColor = "rgba(var(--fg-rgb), 0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(var(--fg-rgb), 0.04)";
        e.currentTarget.style.borderColor = "rgba(var(--fg-rgb), 0.10)";
      }}
    >
      <span className="relative block w-3.5 h-3.5">
        {/* Sun icon — visible in dark mode (click to go light) */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-full h-full transition-all duration-400"
          style={{
            color: "rgba(var(--fg-rgb), 0.75)",
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-60deg) scale(0.6)",
          }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </svg>

        {/* Moon icon — visible in light mode (click to go dark) */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-full h-full transition-all duration-400"
          style={{
            color: "rgba(var(--fg-rgb), 0.75)",
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(60deg) scale(0.6)" : "rotate(0deg) scale(1)",
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
