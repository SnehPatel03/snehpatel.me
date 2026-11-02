"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectMockup } from "@/components/mockups";
import { ProjectLinks } from "@/components/project";
import { projects } from "@/lib/data";

export function ProjectShowcase() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const reduceMotion = useReducedMotion();
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  return (
    <div className="project-showcase grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="order-2 lg:order-1 lg:col-span-4">
        <p className="label mb-4">Project index <span className="text-accent">/ {String(projects.length).padStart(2, "0")}</span></p>
        <div className="project-index-list">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className="project-index-row group w-full text-left"
              aria-pressed={active.slug === project.slug}
              aria-label={`Show ${project.name} project`}
              data-cursor="View"
              onPointerEnter={() => setActiveSlug(project.slug)}
              onFocus={() => setActiveSlug(project.slug)}
              onClick={() => setActiveSlug(project.slug)}
            >
              <span className="font-mono text-[10px] text-mute">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-lg font-medium tracking-tight">{project.name}</span>
                <span className="mt-1 block truncate text-xs text-mute">{project.category}</span>
              </span>
              <span className="project-index-arrow text-accent" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <p className="mt-5 max-w-xs text-xs leading-relaxed text-mute">Select a project to see the real interface, what it does, and the tools behind it.</p>
      </div>

      <div className="order-1 min-w-0 lg:order-2 lg:col-span-8 lg:sticky lg:top-24 lg:self-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.slug}
            className="project-showcase-detail"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
          >
            <ProjectMockup project={active} priority={active === projects[0]} presentation="showcase" />
            <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0 flex-1">
                <p className="label mb-3">{active.category}<span className="mx-2 text-accent">/</span>{active.period}</p>
                <h3 className="display-type text-4xl font-semibold uppercase leading-[.92] tracking-[-.06em] sm:text-6xl">{active.name}</h3>
                <p className="display-type mt-3 max-w-2xl text-xl leading-snug text-fg/85 sm:text-2xl">{active.tagline}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">{active.summary}</p>
                <div className="project-detail-note mt-5 grid gap-4 sm:grid-cols-2">
                  <div><p className="label mb-2">My role</p><p className="text-sm text-fg/85">{active.role}</p></div>
                  <div><p className="label mb-2">In focus</p><p className="text-sm text-fg/85">{active.highlights[0]}</p></div>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {active.stack.slice(0, 5).map((item) => <li key={item} className="chip">{item}</li>)}
                </ul>
              </div>
              <Link href={`/projects/${active.slug}`} className="label mt-1 inline-flex min-h-10 shrink-0 items-center border-b border-accent text-fg transition hover:text-accent">Case study ↗</Link>
            </div>
            <div className="mt-6"><ProjectLinks project={active} /></div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
