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
  const activeIndex = projects.findIndex((project) => project.slug === active.slug);
  const nextIndex = (activeIndex + 1) % projects.length;
  const nextProject = projects[nextIndex];

  return (
    <div className="project-showcase">
      <div className="project-showcase-intro mb-7 flex items-end justify-between gap-5 border-y border-line py-5 sm:mb-8 sm:py-6">
        <div>
          <p className="label text-accent">A closer look / selected systems</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
            A short list of products, with the interfaces and engineering behind them.
          </p>
        </div>
        <p className="label shrink-0">{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
      </div>

      <div className="project-showcase-picker" role="group" aria-label="Choose a featured project">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className="project-picker-item"
            aria-pressed={active.slug === project.slug}
            onFocus={() => setActiveSlug(project.slug)}
            onClick={() => setActiveSlug(project.slug)}
          >
            <span className="project-picker-index label">{String(index + 1).padStart(2, "0")}</span>
            <span className="project-picker-name">{project.name}</span>
            <span className="project-picker-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={active.slug}
          className="project-showcase-detail"
          data-project={active.slug}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-showcase-grid">
            <div className="project-showcase-visual">
              <ProjectMockup project={active} presentation="showcase" />
            </div>

            <div className="project-showcase-copy">
              <p className="label">{active.category}<span className="mx-2 text-accent">/</span>{active.period}</p>
              <h3 className="display-type project-showcase-title font-semibold uppercase">{active.name}</h3>
              <p className="display-type mt-3 text-xl leading-snug text-fg/90 sm:text-2xl">{active.tagline}</p>
              <p className="project-showcase-summary mt-5 text-base leading-relaxed text-mute">{active.summary}</p>

              <div className="project-showcase-highlight mt-7">
                <p className="label mb-2">In focus <span className="text-accent">/ 01</span></p>
                <p className="text-sm leading-relaxed text-fg/85">{active.highlights[0]}</p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
                {active.stack.slice(0, 4).map((item) => <li key={item} className="chip">{item}</li>)}
              </ul>

              <div className="project-showcase-actions mt-7 flex flex-col items-start gap-4">
                <Link href={`/projects/${active.slug}`} data-analytics-event="project_link_click" data-project-name={active.name} data-project-link="case-study" className="project-case-link label inline-flex min-h-11 items-center gap-2 border-b border-accent text-fg transition hover:text-accent">
                  Explore case study <span aria-hidden="true">↗</span>
                </Link>
                <ProjectLinks project={active} />
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="project-next-nav">
        <div className="project-next-progress" aria-hidden="true">
          <span style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} />
        </div>
        <div className="flex items-center justify-between gap-4 pt-4">
          <p className="label">Selected <span className="text-accent">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}</p>
          <button
            type="button"
            className="project-next-button group"
            onClick={() => setActiveSlug(nextProject.slug)}
            aria-label={`Next project: ${nextProject.name}`}
            data-cursor="link"
          >
            <span className="project-next-copy"><span className="label">Next project</span><span className="project-next-name">{nextProject.name}</span></span>
            <span className="project-next-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
