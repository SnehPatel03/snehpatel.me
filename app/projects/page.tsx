import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

const description =
  "Explore full-stack and AI projects by Sneh Patel, from document chat and quizzes to an AI video workspace. Review technologies, case studies and source code.";

export const metadata: Metadata = {
  title: "AI & Full Stack Projects by Sneh Patel",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${site.url}/projects`,
    title: "AI & Full Stack Projects by Sneh Patel",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Full Stack Projects by Sneh Patel",
    description,
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Full stack and AI projects by Sneh Patel",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: `${site.url}/projects/${project.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-10 sm:pt-40">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} className="mb-12" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="mb-12 max-w-4xl">
        <p className="label mb-5">Selected work / 2025–2026</p>
        <h1 className="display-type text-5xl font-bold leading-[.95] tracking-[-.07em] sm:text-7xl">
          Projects by <span className="text-accent">Sneh Patel.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mute sm:text-xl">
          Full-stack and AI products built across web, desktop and mobile—from document search and real-time systems to a screen-recording workspace.
        </p>
      </header>
      <ol className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <article className="project-index-card h-full overflow-hidden rounded-2xl border border-line bg-surface">
              {project.screenshot && (
                <Link href={`/projects/${project.slug}`} aria-label={`View ${project.name} project details`} data-analytics-event="project_link_click" data-project-name={project.name} data-project-link="case-study">
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name}: ${project.tagline}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                    />
                  </div>
                </Link>
              )}
              <div className="p-6 sm:p-8">
                <p className="label text-accent">{String(index + 1).padStart(2, "0")} / {project.category}</p>
                <h2 className="display-type mt-4 text-3xl font-semibold uppercase tracking-[-.05em] sm:text-4xl">
                  <Link href={`/projects/${project.slug}`} data-analytics-event="project_link_click" data-project-name={project.name} data-project-link="case-study" className="transition-colors hover:text-accent">
                    {project.name}
                  </Link>
                </h2>
                <p className="mt-2 text-lg text-fg/85">{project.tagline}</p>
                <p className="mt-4 leading-relaxed text-mute">{project.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                  {project.stack.slice(0, 5).map((technology) => <li className="chip" key={technology}>{technology}</li>)}
                </ul>
                <Link href={`/projects/${project.slug}`} className="label mt-6 inline-flex min-h-11 items-center gap-2 text-fg transition-colors hover:text-accent">
                  Read the {project.name} case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
