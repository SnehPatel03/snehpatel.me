"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

const OPEN_EASE = [0.5, 1, 0.89, 1] as const;

const base = [
  { label: "Home", href: "/#top", kind: "Section" },
  { label: "About", href: "/#about", kind: "Section" },
  { label: "Work", href: "/#work", kind: "Section" },
  { label: "Stack", href: "/#stack", kind: "Section" },
  { label: "Archive", href: "/#archive", kind: "Section" },
  { label: "Contact", href: "/#contact", kind: "Section" },
  { label: "Resume", href: "/resume", kind: "Page" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const openPalette = () => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  };
  const closePalette = () => {
    setOpen(false);
  };
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openPalette(); }
      if (event.key === "Escape") closePalette();
    };
    const openFromNavigation = () => openPalette();
    window.addEventListener("keydown", key);
    window.addEventListener("portfolio:open-palette", openFromNavigation);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("portfolio:open-palette", openFromNavigation); };
  }, []);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  const options = [...base, ...projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}`, kind: "Project" }))].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <AnimatePresence onExitComplete={() => previousFocus.current?.focus()}>
      {open && (
        <motion.div
          className="command-palette-backdrop fixed inset-0 z-[100] grid place-items-start p-4 pt-[12vh] sm:pt-[15vh]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.32, ease: OPEN_EASE }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const items = event.currentTarget.querySelectorAll<HTMLElement>(
                'a[href], button:not(:disabled), input:not(:disabled)',
              );
              const first = items[0];
              const last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
            className="command-palette-panel mx-auto w-full max-w-xl rounded-2xl p-3 sm:p-4"
            initial={reducedMotion ? false : { y: -28, opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? undefined : { y: -18, opacity: 0, scale: 0.985, filter: "blur(8px)" }}
            transition={{
              duration: reducedMotion ? 0 : 0.48,
              ease: OPEN_EASE,
            }}
          >
            <div className="command-palette-heading flex items-center justify-between px-3 pb-3">
              <p className="label">Quick access</p><span className="label">{options.length} results</span>
            </div>
            <div className="command-palette-search flex items-center gap-3 rounded-xl px-4">
              <svg className="command-palette-search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4" /><path d="m15.5 15.5 4.2 4.2" /></svg>
              <input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages and projects…" className="command-palette-input min-w-0 flex-1 bg-transparent py-4 outline-none" aria-label="Search pages and projects" />
              <kbd className="command-palette-escape">ESC</kbd>
            </div>
            <ul className="command-palette-list max-h-[48vh] overflow-auto py-3">
              {options.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="command-palette-item flex items-center justify-between gap-4 rounded-lg px-3 py-3">
                    <span>{item.label}</span><span className="command-palette-kind label">{item.kind}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" className="command-palette-item w-full rounded-lg px-3 py-3 text-left" onClick={() => { void navigator.clipboard?.writeText(site.email); setOpen(false); }}>
                  <span>Copy email</span><span className="command-palette-kind label">Copy</span>
                </button>
              </li>
              <li><a className="command-palette-item flex items-center justify-between rounded-lg px-3 py-3" href={site.github} target="_blank" rel="noopener noreferrer"><span>Open GitHub</span><span className="command-palette-kind label">External ↗</span></a></li>
              <li><a className="command-palette-item flex items-center justify-between rounded-lg px-3 py-3" href={site.linkedin} target="_blank" rel="noopener noreferrer"><span>Open LinkedIn</span><span className="command-palette-kind label">External ↗</span></a></li>
            </ul>
            <div className="command-palette-footer flex items-center justify-between border-t border-line px-3 pt-3">
              <p className="label">Portfolio commands</p><p className="label">Press <kbd>ESC</kbd> to close</p>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
