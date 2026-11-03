import type { Project } from "@/lib/data";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className={`project-links relative z-10 flex flex-wrap gap-3 text-sm${project.repos.length > 1 ? " project-links--multiple-repos" : ""}`}>
      {project.live && <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="project-open-link inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fg px-5 py-2.5 font-medium text-bg transition hover:-translate-y-0.5 hover:bg-fg/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
      >
        <span>Open live project</span><span aria-hidden="true">↗</span>
      </a>}
      {project.repos.map((r) => (
        <a
          key={r.href}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 transition hover:-translate-y-0.5 hover:border-fg hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
        >
          {r.label} ↗
        </a>
      ))}
    </div>
  );
}

