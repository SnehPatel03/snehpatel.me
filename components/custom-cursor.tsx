"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!finePointer.matches) return;

    const cursor = document.querySelector<HTMLElement>("[data-custom-cursor]");
    if (!cursor) return;

    let frame = 0;
    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const follow = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2) frame = requestAnimationFrame(follow);
      else frame = 0;
    };
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest<HTMLElement>("[data-cursor], a, button");
      const href = interactive?.getAttribute("href") ?? "";
      const fallback = interactive?.tagName === "BUTTON" ? "SELECT" : href.startsWith("mailto:") ? "SEND" : href.startsWith("http") ? "VISIT" : "OPEN";
      cursor.dataset.label = interactive?.dataset.cursor ?? fallback;
      cursor.classList.toggle("is-active", Boolean(interactive));
    };
    const leave = () => cursor.classList.remove("is-active", "is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div data-custom-cursor="" aria-hidden="true"><span /></div>;
}
