"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import { site } from "@/lib/site";

const links = [
  { href: "top", label: "Home" },
  { href: "about", label: "About" },
  { href: "work", label: "Work" },
  { href: "stack", label: "Stack" },
  { href: "archive", label: "Archive" },
  { href: "resume", label: "Resume", page: true },
  { href: "contact", label: "Contact" },
];

const subscribeToPlatform = () => () => {};
const getPlatformShortcutModifier = () =>
  /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘" : "Ctrl";
const getServerShortcutModifier = () => "Ctrl";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [menuOpenForPath, setMenuOpenForPath] = useState<string | null>(null);
  const menuOpen = menuOpenForPath === pathname;
  const reduceMotion = useReducedMotion();
  const shortcutModifier = useSyncExternalStore(
    subscribeToPlatform,
    getPlatformShortcutModifier,
    getServerShortcutModifier,
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 24);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const syncLoaderState = () => {
      if (root.dataset.loader === "done") setLoaderComplete(true);
    };
    const frame = requestAnimationFrame(syncLoaderState);
    const observer = new MutationObserver(syncLoaderState);
    observer.observe(root, { attributes: true, attributeFilter: ["data-loader"] });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenForPath(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: "-130%", opacity: 0 }}
      animate={{
        y: reduceMotion || loaderComplete ? 0 : "-130%",
        opacity: reduceMotion || loaderComplete ? 1 : 0,
        scale: scrolled ? 0.985 : 1,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.5, 0, 0.2, 1] }}
      className={`site-nav fixed z-50 flex items-center justify-between px-5 py-2 sm:px-7${scrolled ? " site-nav--scrolled" : ""}`}
    >
      <Link href="/" className="nav-brand" aria-label="Sneh Patel — home">
        <Image src="/brand-mark.svg" alt="" width={34} height={34} className="nav-brand-mark" />
      </Link>
      <nav aria-label="Primary" className="site-nav-links">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.page ? "/resume" : pathname === "/" ? `#${link.href}` : `/#${link.href}`}
            className="nav-link label"
            aria-current={link.page && pathname === "/resume" ? "page" : undefined}
            data-analytics-event={
              link.href === "resume" ? "resume_click" : link.href === "contact" ? "contact_click" : undefined
            }
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
        <button
          type="button"
          className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-primary-navigation"
          onClick={() => setMenuOpenForPath(menuOpen ? null : pathname)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-primary-navigation"
            aria-label="Mobile primary"
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-nav-links">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.page ? "/resume" : pathname === "/" ? `#${link.href}` : `/#${link.href}`}
                  className="mobile-nav-link"
                  aria-current={link.page && pathname === "/resume" ? "page" : undefined}
                  data-analytics-event={
                    link.href === "resume" ? "resume_click" : link.href === "contact" ? "contact_click" : undefined
                  }
                  onClick={() => setMenuOpenForPath(null)}
                >
                  <span className="mobile-nav-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{link.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <div className="mobile-nav-utilities">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="mobile-nav-utility">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
