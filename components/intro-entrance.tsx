"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Starts the hero motion as the first-visit loader finishes. Content stays visible before the transition. */
export function IntroEntrance({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [entered, setEntered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const enter = () => setEntered(true);
    window.addEventListener("portfolio:intro-enter", enter);
    return () => {
      window.removeEventListener("portfolio:intro-enter", enter);
    };
  }, []);

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ y: entered ? 0 : 18, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
