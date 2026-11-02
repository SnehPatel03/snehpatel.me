import Link from "next/link";
import type { Project } from "@/lib/data";
import { ProjectMockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-3 text-sm">
      {project.live && <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-11 rounded-full bg-fg px-5 py-2 font-medium text-bg transition hover:bg-accent"
      >
        Live demo ↗
      </a>}
      {project.repos.map((r) => (
        <a
          key={r.href}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
        className="min-h-11 rounded-full border border-line px-5 py-2 transition hover:border-fg hover:text-fg"
        >
          {r.label} ↗
        </a>
      ))}
    </div>
  );
}

/** Large featured row: mockup + copy. Whole card is clickable via the stretched title link. */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article data-cursor="View project" className="project-card group relative grid items-center gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <div className="transition duration-700 group-hover:-translate-y-1">
            <ProjectMockup project={project} />
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <p className="label mb-5 flex flex-wrap items-center gap-2">
            <span className="text-accent">0{index + 1}</span><span>/</span>{project.category}<span>/</span>{project.period}
          </p>
          <h3 className="display-type text-5xl font-semibold uppercase leading-[.9] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm">
              {project.name}
            </Link>
          </h3>
          <p className="display-type mt-5 max-w-lg text-xl leading-snug text-fg/85 sm:text-2xl">{project.tagline}</p>
          <p className="mt-4 max-w-lg leading-relaxed text-mute">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 7).map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Compact card used on the projects gallery and for "more projects". */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-cursor="View project" className="project-card group relative flex flex-col gap-5 rounded-[1.35rem] border border-line bg-surface/30 p-4 transition-colors hover:border-fg/50 sm:p-5">
      <div className="transition duration-500 group-hover:-translate-y-1">
        <ProjectMockup project={project} />
      </div>
      <div>
        <p className="label mb-3">{project.category} / {project.period}</p>
        <h3 className="display-type text-3xl font-semibold uppercase tracking-[-0.055em] sm:text-4xl">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-mute">{project.tagline}</p>
      </div>
      <ProjectLinks project={project} />
    </article>
  );
}
