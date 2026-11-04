"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { usePathname } from "next/navigation";

type Phase = "loading" | "revealing" | "done";

const COUNT_DELAY = 0.35;
const COUNT_DURATION = 1.35;
const SHRINK_X = 0.9;
const SHRINK_Y = 0.72;
const REVEAL_OFFSET = 0.25;
const REVEAL_SETTLE = 1.9;

const EASE_OUT_QUAD = [0.5, 1, 0.89, 1] as const;
const EASE_X = [0.5, 0, 0.2, 1] as const;
const EASE_Y = [0.65, 0, 0.35, 1] as const;

function setPhase(phase: Phase) {
  document.documentElement.dataset.loader = phase;
}

export function Loader({ playOnNavigation = false }: { playOnNavigation?: boolean }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const runKey = playOnNavigation ? pathname : "initial";
  const [visible, setVisible] = useState(true);
  const [interactive, setInteractive] = useState(true);

  const count = useMotionValue(0);
  const label = useTransform(count, (value) => `${Math.round(value)}%`);
  const progress = useTransform(count, (value) => value / 100);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const opacity = useMotionValue(1);

  useEffect(() => {
    const root = document.documentElement;

    if (reducedMotion) {
      setPhase("done");
      return;
    }

    let cancelled = false;
    let showFrame = 0;
    const timers: number[] = [];
    const running: { stop: () => void }[] = [];
    const later = (callback: () => void, seconds: number) => {
      timers.push(window.setTimeout(callback, seconds * 1000));
    };

    count.set(0);
    scaleX.set(1);
    scaleY.set(1);
    opacity.set(1);
    showFrame = window.requestAnimationFrame(() => {
      setVisible(true);
      setInteractive(true);
    });
    setPhase("loading");

    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const run = async () => {
      const counter = animate(count, 100, {
        delay: COUNT_DELAY,
        duration: COUNT_DURATION,
        ease: [...EASE_OUT_QUAD],
      });
      running.push(counter);
      await counter;
      if (cancelled) return;

      setInteractive(false);
      const x = animate(scaleX, 0, { duration: SHRINK_X, ease: [...EASE_X] });
      const y = animate(scaleY, 0.004, { duration: SHRINK_Y, ease: [...EASE_Y] });
      running.push(x, y);

      later(() => setPhase("revealing"), REVEAL_OFFSET);
      later(() => {
        root.style.overflow = previousOverflow;
        setPhase("done");
      }, REVEAL_OFFSET + REVEAL_SETTLE);

      await Promise.all([x, y]);
      if (!cancelled) setVisible(false);
    };

    void run();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(showFrame);
      timers.forEach(window.clearTimeout);
      running.forEach((animation) => animation.stop());
      root.style.overflow = previousOverflow;
    };
  }, [runKey, reducedMotion, count, scaleX, scaleY, opacity]);

  if (reducedMotion || !visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="site-loader"
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <motion.div className="site-loader__panel" style={{ scaleX, scaleY, opacity }}>
        <div className="site-loader__content">
          <div className="site-loader__identity">
            <svg className="site-loader__mark" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M64 308c0-112 91-203 203-203h181v92h-89c-57 0-103 46-103 103H64Z" />
              <path d="M64 407h89c57 0 103-46 103-103h192c0 112-91 203-203 203H64v-100Z" />
            </svg>
          </div>
          <motion.span className="site-loader__count" aria-hidden="true">{label}</motion.span>
          <div className="site-loader__progress" aria-hidden="true">
            <motion.span className="site-loader__progress-fill" style={{ scaleX: progress }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
