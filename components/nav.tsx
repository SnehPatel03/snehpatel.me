"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const delta = current - lastScrollY.current;
    if (current > 120 && delta > 4 && !open) setHidden(true);
    else if (delta < -3 || current < 80) setHidden(false);
    lastScrollY.current = current;
  });

  useEffect(() => {
    if (open) {
      menu.current?.querySelector<HTMLElement>("a[href]")?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      trigger.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header animate={{ y: hidden && !open ? "-110%" : "0%" }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line/60 bg-bg/75 px-5 py-4 backdrop-blur-xl sm:px-10">
        <Link href="/" className="display-type text-sm font-bold uppercase tracking-[0.08em] text-fg" aria-label="Sneh Patel — home">
          Sneh Patel<span className="ml-1 text-accent">.</span>
        </Link>
        <nav aria-label="Primary" className="ml-auto mr-6 hidden items-center gap-8 md:flex">
          {links.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="label transition hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => window.dispatchEvent(new Event("portfolio:open-palette"))} className="label mr-2 inline-flex min-h-11 items-center rounded-full border border-line px-3 text-fg/70 transition hover:border-fg hover:text-fg sm:mr-3 sm:px-4" aria-label="Open command palette"><span className="sm:hidden">⌘</span><span className="hidden sm:inline">⌘K</span></button>
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-overlay"
          className="label min-h-11 rounded-full border border-line px-4 text-fg transition hover:border-fg"
        >
          {open ? "Close ✕" : "Menu ≡"}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const items = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)');
              const first = items[0];
              const last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
              else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-5 pb-8 pt-28 sm:px-10"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display-type group flex items-baseline gap-4 font-semibold tracking-[-0.06em] text-[clamp(2.5rem,9vw,6.5rem)] leading-[1.05] transition-colors hover:text-accent"
                  >
                    <span className="label w-8 group-hover:text-fg">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap items-end justify-between gap-6 text-sm text-mute">
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
              <div className="flex gap-6">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  GitHub ↗
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
