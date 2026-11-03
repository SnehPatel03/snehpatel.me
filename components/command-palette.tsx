"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

const base = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Work", href: "/#work" }, { label: "Contact", href: "/#contact" }, { label: "Resume", href: "/resume" }];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const openPalette = () => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  };
  const closePalette = () => {
    setOpen(false);
    previousFocus.current?.focus();
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
  const options = [...base, ...projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}` }))].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return <>
    {open && <div className="fixed inset-0 z-[100] grid place-items-start bg-black/70 p-4 pt-[15vh]" onMouseDown={(e) => { if (e.target === e.currentTarget) closePalette(); }}>
      <section role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled)');
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }} className="mx-auto w-full max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-2xl">
        <input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages and projects…" className="w-full border-b border-line bg-transparent px-3 py-4 outline-none focus:border-accent" aria-label="Search pages and projects" />
        <ul className="max-h-[50vh] overflow-auto py-2">{options.map((item) => <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-bg hover:text-accent focus-visible:bg-bg">{item.label} <span aria-hidden="true">↗</span></Link></li>)}
          <li><button type="button" className="w-full rounded-lg px-3 py-3 text-left hover:bg-bg hover:text-accent" onClick={() => { void navigator.clipboard?.writeText(site.email); setOpen(false); }}>Copy email</button></li>
          <li><a className="block rounded-lg px-3 py-3 hover:bg-bg hover:text-accent" href={site.github} target="_blank" rel="noopener noreferrer">Open GitHub ↗</a></li>
          <li><a className="block rounded-lg px-3 py-3 hover:bg-bg hover:text-accent" href={site.linkedin} target="_blank" rel="noopener noreferrer">Open LinkedIn ↗</a></li>
        </ul>
        <p className="label px-3 pt-2">Esc to close</p>
      </section>
    </div>}
  </>;
}
