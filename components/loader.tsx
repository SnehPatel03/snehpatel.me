"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const KEY = "sp-loaded";
const enterIntro = () => window.dispatchEvent(new Event("portfolio:intro-enter"));

export function Loader() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch { seen = true; }
    if (seen || reduceMotion) {
      requestAnimationFrame(enterIntro);
      return;
    }

    const start = performance.now();
    const duration = 1450;
    let raf = 0;
    let exitTimer = 0;
    const show = requestAnimationFrame(() => setVisible(true));
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - (1 - t) ** 3) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem(KEY, "1"); } catch {}
        exitTimer = window.setTimeout(() => setVisible(false), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(show); cancelAnimationFrame(raf); window.clearTimeout(exitTimer); };
  }, [reduceMotion]);

  return (
    <AnimatePresence onExitComplete={enterIntro}>
      {visible && (
        <motion.div
          aria-hidden="true"
          onClick={() => { try { sessionStorage.setItem(KEY, "1"); } catch {} setVisible(false); }}
          className="portfolio-loader fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between overflow-hidden bg-bg px-6 py-6 sm:px-10 sm:py-9"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="label text-fg">Sneh Patel <span className="px-2 text-accent">/</span> Portfolio</span>
            <span className="label">Surat, India</span>
          </div>

          <div className="loader-mark-wrap relative flex flex-1 items-center justify-center">
            <motion.div
              className="loader-mark display-type select-none font-black leading-[.76] tracking-[-.12em] text-fg"
              initial={{ opacity: 0, scale: .84, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: .85, delay: .08, ease: [0.22, 1, 0.36, 1] }}
            >
              SP<span className="text-accent">.</span>
            </motion.div>
            <span className="loader-orbit loader-orbit-one" aria-hidden="true" />
            <span className="loader-orbit loader-orbit-two" aria-hidden="true" />
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="label mb-2 text-accent">Full stack <span className="px-1 text-mute">/</span> AI</p>
                <p className="label text-mute">Loading work &amp; details</p>
              </div>
              <p className="loader-counter display-type text-4xl font-semibold tabular-nums tracking-[-.08em] sm:text-6xl">
                {count.toString().padStart(3, "0")}<span className="text-accent">%</span>
              </p>
            </div>
            <div className="h-px w-full bg-line"><span className="block h-full bg-accent shadow-[0_0_14px_rgba(208,195,174,.55)]" style={{ width: `${count}%` }} /></div>
            <p className="label mt-3 text-right">Click anywhere to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
