"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let hovering = false;
    let clicking = false;
    let curScale = 1;
    let glowOpacity = 1;
    let isIdle = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const resetIdle = () => {
      isIdle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { isIdle = true; }, 1000);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement;
      hovering = !!target.closest("a, button, [role='button'], input, textarea, select");
      resetIdle();
    };

    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };
    const onEnter = () => { el.style.opacity = "1"; };
    const onLeave = () => { el.style.opacity = "0"; };

    const tick = () => {
      curX = lerp(curX, mouseX, 0.2);
      curY = lerp(curY, mouseY, 0.2);

      const targetScale = clicking ? 0.9 : hovering ? 1.4 : 1;
      curScale = lerp(curScale, targetScale, 0.15);
      glowOpacity = lerp(glowOpacity, isIdle ? 0.4 : 1, 0.04);

      el.style.transform = `translate(${curX - 4}px, ${curY - 4}px) scale(${curScale})`;
      el.style.opacity = `${glowOpacity}`;

      const glowIntensity = hovering ? 1.6 : 1;
      el.style.boxShadow = `0 0 ${12 * glowIntensity}px rgba(100,150,255,${0.25 * glowIntensity}), 0 0 ${24 * glowIntensity}px rgba(100,150,255,${0.15 * glowIntensity})`;

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    resetIdle();
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hero-cursor fixed top-0 left-0 z-[9998] pointer-events-none"
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "rgba(140,170,255,0.85)",
        boxShadow:
          "0 0 12px rgba(100,150,255,0.25), 0 0 24px rgba(100,150,255,0.15)",
        opacity: 0,
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
