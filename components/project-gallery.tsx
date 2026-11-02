"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/project";
import { projects } from "@/lib/data";

const filters = ["All", "AI", "Real-time", "Full-stack", "Desktop"] as const;

export function ProjectGallery() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category") ?? "All";
  const visible = projects.filter((project) => {
    if (active === "All") return true;
    if (active === "AI") return /AI|RAG/i.test(project.category);
    if (active === "Real-time") return /real-time/i.test(project.category) || project.name === "OPAL";
    if (active === "Desktop") return project.stack.includes("Electron");
    return true;
  });
  function choose(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "All") next.delete("category"); else next.set("category", value);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  }
  return <>
    <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter projects">
      {filters.map((filter) => <button key={filter} type="button" aria-pressed={active === filter} onClick={() => choose(filter)} className={`chip min-h-11 transition hover:border-accent hover:text-accent ${active === filter ? "border-accent text-accent" : ""}`}>{filter}</button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {visible.length} projects</p>
    <div className="grid gap-6 md:grid-cols-2">{visible.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
  </>;
}
