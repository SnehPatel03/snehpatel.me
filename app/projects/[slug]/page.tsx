import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { site } from "@/lib/site";
import { ProjectMockup } from "@/components/mockups";
import { ProjectLinks } from "@/components/project";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} — ${p.tagline}`, description: p.summary, url: `${site.url}/projects/${p.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.summary,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    ...(project.live ? { url: project.live } : {}),
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="label mb-10">
        <Link href="/projects" className="hover:text-accent">← All projects</Link>
      </nav>

      <p className="label mb-4">{project.category} · {project.period}</p>
      <h1 className="display-type text-[clamp(3rem,10vw,8rem)] font-bold uppercase leading-[.86] tracking-[-0.075em]">{project.name}</h1>
      <p className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-accent sm:text-4xl">{project.tagline}</p>
      <div className="mt-8"><ProjectLinks project={project} /></div>

      <div className="mt-14"><ProjectMockup project={project} priority /></div>

      <div className="mt-20 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="label mb-4">Overview</h2>
          <p className="text-xl text-mute">{project.summary}</p>
          <h2 className="label mb-4 mt-12">What I built</h2>
          <ul className="space-y-4 text-lg text-mute">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3"><span className="text-accent" aria-hidden="true">–</span>{h}</li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-5">
          {!project.todo && <><h2 className="label mb-4">Role</h2><p className="text-mute">{project.role}</p></>}
          <h2 className="label mb-4 mt-10">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.filter((s) => !s.startsWith("TODO:")).map((s) => (<li key={s} className="chip">{s}</li>))}
          </ul>
        </aside>
      </div>

      <div className="mt-24 border-t border-line pt-10">
        <p className="label mb-3">Next project</p>
        <Link href={`/projects/${next.slug}`} className="text-4xl font-semibold tracking-tight hover:text-accent sm:text-6xl">
          {next.name} →
        </Link>
      </div>
    </article>
  );
}
