"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/lib/site";

const links = [
  { href: "top", label: "Home" },
  { href: "about", label: "About" },
  { href: "work", label: "Work" },
  { href: "stack", label: "Stack" },
  { href: "archive", label: "Archive" },
  { href: "contact", label: "Contact" },
];

const subscribeToPlatform = () => () => {};
const getPlatformShortcutModifier = () =>
  /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘" : "Ctrl";
const getServerShortcutModifier = () => "Ctrl";

export function Nav() {
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const shortcutModifier = useSyncExternalStore(
    subscribeToPlatform,
    getPlatformShortcutModifier,
    getServerShortcutModifier,
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const delta = current - lastScrollY.current;
    if (current > 120 && delta > 4) setHidden(true);
    else if (delta < -3 || current < 80) setHidden(false);
    lastScrollY.current = current;
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav fixed z-50 flex items-center justify-between px-5 py-2 sm:px-7"
    >
      <Link href="/" className="nav-brand" aria-label="Sneh Patel — home">
        <span className="nav-brand-mark">SP</span>
      </Link>
      <nav aria-label="Primary" className="site-nav-links">
        {links.map((link) => (
          <a
            key={link.href}
            href={pathname === "/" ? `#${link.href}` : `/#${link.href}`}
            className="nav-link label"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("portfolio:open-palette"))}
          className="nav-command label inline-flex min-h-11 items-center rounded-full border border-line px-3 text-fg/70 transition sm:px-4"
          aria-label={`Open command palette (${shortcutModifier} + K)`}
        >
          <span className="nav-command-short">{shortcutModifier} K</span>
          <span className="nav-command-full">{shortcutModifier} + K</span>
        </button>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-github label inline-flex min-h-11 items-center justify-center rounded-full border border-line px-3 text-fg transition sm:px-4"
        >
          GitHub <span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </div>
    </motion.header>
  );
}
