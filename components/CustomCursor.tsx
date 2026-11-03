"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

const CURSOR_CONFIG = {
  dotSize: 8,
  ringSize: 60,
  ringBorderWidth: 1.5,
  ringHoverScale: 1.8,
  contrastRingSize: 120,
  viewRingSize: 80,
  dragRingSize: 64,
  inputCursorWidth: 2,
  inputCursorHeight: 24,
  clickScale: 0.8,
  ringLerp: 0.28,
  ringSnapDistance: 140,
  dotColor: "#ffffff",
  ringColor: "#ffffff",
  viewColor: "#d0c3ae",
  dragColor: "#d0c3ae",
  labels: {
    view: "View",
    drag: "Drag",
  },
} as const;

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor="link"]';
const CONTRAST_SELECTOR = '[data-cursor="contrast"]';
const VIEW_SELECTOR = '[data-cursor="view"]';
const DRAG_SELECTOR = '[data-cursor="drag"]';
const INPUT_SELECTOR = 'input, textarea, [contenteditable="true"]';
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(onChange: () => void) {
  const media = window.matchMedia(FINE_POINTER_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    const dot = document.querySelector<HTMLElement>("[data-cursor-dot]");
    const ring = document.querySelector<HTMLElement>("[data-cursor-ring]");
    const label = ring?.querySelector<HTMLElement>(".custom-cursor__label");
    if (!dot || !ring || !label) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrame = 0;
    let hasPointer = false;

    const place = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const followRing = () => {
      const deltaX = targetX - ringX;
      const deltaY = targetY - ringY;
      const distance = Math.hypot(deltaX, deltaY);

      if (reducedMotion || distance > CURSOR_CONFIG.ringSnapDistance) {
        ringX = targetX;
        ringY = targetY;
      } else {
        ringX += deltaX * CURSOR_CONFIG.ringLerp;
        ringY += deltaY * CURSOR_CONFIG.ringLerp;
      }

      place(ring, ringX, ringY);

      if (Math.hypot(targetX - ringX, targetY - ringY) > 0.1) {
        animationFrame = requestAnimationFrame(followRing);
      } else {
        animationFrame = 0;
      }
    };

    const updateHover = (target: EventTarget | null, x = targetX, y = targetY) => {
      const element = target instanceof Element ? target : null;
      const input = element?.closest(INPUT_SELECTOR);
      const contrast = element?.closest(CONTRAST_SELECTOR);
      const view = element?.closest(VIEW_SELECTOR);
      const drag = element?.closest(DRAG_SELECTOR);
      const interactive = element?.closest(INTERACTIVE_SELECTOR);
      const isLink = Boolean(interactive);
      const snapRing = Boolean(isLink || contrast || view || drag || input);

      ring.classList.toggle("cursor-ring--link", isLink && !contrast && !view && !drag && !input);
      ring.classList.toggle("cursor-ring--contrast", Boolean(contrast));
      ring.classList.toggle("cursor-ring--view", Boolean(view));
      ring.classList.toggle("cursor-ring--drag", Boolean(drag) && !view);
      ring.classList.toggle("cursor-ring--input", Boolean(input));
      ring.dataset.label = contrast
        ? ""
        : view
        ? CURSOR_CONFIG.labels.view
        : drag
          ? CURSOR_CONFIG.labels.drag
          : "";
      label.textContent = ring.dataset.label;
      label.classList.toggle("cursor-label--visible", Boolean(ring.dataset.label));
      dot.classList.toggle("cursor-dot--link", isLink && !view && !drag && !input);
      dot.classList.toggle("cursor-dot--hidden", Boolean(contrast) || Boolean(view) || Boolean(input));
      dot.classList.toggle("cursor-dot--input", Boolean(input));

      if (snapRing) {
        ringX = x;
        ringY = y;
        place(ring, ringX, ringY);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      }

      return snapRing;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPointer) {
        ringX = targetX;
        ringY = targetY;
        place(ring, ringX, ringY);
        hasPointer = true;
      }

      place(dot, targetX, targetY);
      dot.classList.add("cursor-visible");
      ring.classList.add("cursor-visible");
      const snapRing = updateHover(event.target, targetX, targetY);
      if (!snapRing && !animationFrame) animationFrame = requestAnimationFrame(followRing);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        updateHover(event.target, event.clientX, event.clientY);
      }
    };
    const onMouseDown = () => ring.classList.add("cursor-ring--pressed");
    const onMouseUp = () => ring.classList.remove("cursor-ring--pressed");
    const onDocumentLeave = () => {
      dot.classList.remove("cursor-visible");
      ring.classList.remove("cursor-visible", "cursor-ring--pressed");
    };
    const onDocumentEnter = () => {
      if (!hasPointer) return;
      dot.classList.add("cursor-visible");
      ring.classList.add("cursor-visible");
    };

    document.documentElement.classList.add("has-custom-cursor");
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onDocumentLeave);
    document.addEventListener("mouseenter", onDocumentEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onDocumentLeave);
      document.removeEventListener("mouseenter", onDocumentEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span
        data-cursor-dot
        className="custom-cursor__dot"
        style={{ width: CURSOR_CONFIG.dotSize, height: CURSOR_CONFIG.dotSize, backgroundColor: CURSOR_CONFIG.dotColor }}
      />
      <span
        data-cursor-ring
        className="custom-cursor__ring"
        style={{
          width: CURSOR_CONFIG.ringSize,
          height: CURSOR_CONFIG.ringSize,
          borderWidth: CURSOR_CONFIG.ringBorderWidth,
          borderColor: CURSOR_CONFIG.ringColor,
          "--cursor-ring-hover-scale": CURSOR_CONFIG.ringHoverScale,
          "--cursor-contrast-size": `${CURSOR_CONFIG.contrastRingSize}px`,
          "--cursor-view-size": `${CURSOR_CONFIG.viewRingSize}px`,
          "--cursor-view-color": CURSOR_CONFIG.viewColor,
          "--cursor-drag-size": `${CURSOR_CONFIG.dragRingSize}px`,
          "--cursor-drag-color": CURSOR_CONFIG.dragColor,
          "--cursor-input-width": `${CURSOR_CONFIG.inputCursorWidth}px`,
          "--cursor-input-height": `${CURSOR_CONFIG.inputCursorHeight}px`,
          "--cursor-pressed-scale": CURSOR_CONFIG.clickScale,
        } as CSSProperties & {
          "--cursor-ring-hover-scale": number;
          "--cursor-contrast-size": string;
          "--cursor-view-size": string;
          "--cursor-view-color": string;
          "--cursor-drag-size": string;
          "--cursor-drag-color": string;
          "--cursor-input-width": string;
          "--cursor-input-height": string;
          "--cursor-pressed-scale": number;
        }}
      >
        <span className="custom-cursor__label" />
      </span>
    </div>
  );
}
