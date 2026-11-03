"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function Loader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1320;
    let frame = 0;
    let hideTimer = 0;
    const update = (now: number) => {
      const ratio = Math.min((now - start) / duration, 1);
      const accelerated = (Math.exp(3 * ratio) - 1) / (Math.exp(3) - 1);
      setProgress(Math.round(accelerated * 100));
      if (ratio < 1) {
        frame = requestAnimationFrame(update);
      } else {
        hideTimer = window.setTimeout(() => setVisible(false), 220);
      }
    };
    let start = 0;
    frame = requestAnimationFrame(() => {
      setProgress(0);
      setVisible(true);
      start = performance.now();
      frame = requestAnimationFrame(update);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-label="Portfolio loading"
          className="portfolio-loader fixed inset-0 z-[100] flex items-center justify-center"
          key={pathname}
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0 round 0px)", opacity: 0.98 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-core">
            <motion.span
              className="loader-index label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >PORTFOLIO · 2026</motion.span>
            <motion.span
              className="loader-initials display-type"
              initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >S<span className="loader-letter-gap">P</span><span className="text-accent">.</span></motion.span>
            <motion.span
              className="loader-owner label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >Sneh Patel · Full stack developer</motion.span>
          </div>
          <div
            className="loader-progress"
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span className="loader-progress-caption label">Preparing the experience</span>
            <span className="loader-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
            <span className="loader-counter tabular-nums">{String(progress).padStart(2, "0")}<span className="loader-percent">%</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
