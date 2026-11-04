import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { site } from "@/lib/site";
import { ProjectLinks } from "@/components/project";
import { Reveal } from "@/components/reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      url: `${site.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.summary,
    applicationCategory: "WebApplication",
    operatingSystem:
      project.slug === "opal"
        ? "Web, Windows, macOS, Linux"
        : project.slug === "gurukul"
          ? "Web, Android, iOS"
          : "Web",
    ...(project.live ? { url: project.live } : {}),
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="case-study w-full pb-28 pt-32 sm:pb-32 sm:pt-40" data-project={project.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="case-study-content mx-auto w-full max-w-[96rem] px-5 sm:px-10 lg:px-12">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb label mb-12 flex items-center justify-between gap-4">
        <Link href="/#work" className="transition hover:text-fg">← Selected work</Link>
        <span>{String(index + 1).padStart(2, "0")} <span className="text-accent">/</span> {String(projects.length).padStart(2, "0")}</span>
      </nav>

      <Reveal className="case-study-hero">
        <p className="label mb-5">{project.category}<span className="mx-2 text-accent">/</span>{project.period}</p>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div>
            <h1 className="display-type case-study-title font-bold uppercase">{project.name}</h1>
            <p className="mt-5 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-fg/90 sm:text-4xl">{project.tagline}</p>
          </div>
          <div className="case-study-hero-links flex flex-col items-start">
            <ProjectLinks project={project} />
          </div>
        </div>
      </Reveal>

      <Reveal className="case-study-overview mt-20 grid gap-10 border-y border-line py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:py-14">
        <div>
          <p className="label mb-4">01 <span className="mx-2 text-accent">/</span> The product</p>
          <p className="display-type max-w-4xl text-2xl leading-relaxed tracking-tight text-fg/90 sm:text-3xl">{project.summary}</p>
        </div>
        <aside className="case-study-facts grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-1">
          <div>
            <p className="label mb-2">My role</p>
            <p className="text-sm leading-relaxed text-fg/85">{project.role}</p>
          </div>
          <div>
            <p className="label mb-2">Platform</p>
            <p className="text-sm leading-relaxed text-fg/85">{project.category.split(" · ").slice(1).join(" · ") || project.category}</p>
          </div>
        </aside>
      </Reveal>

      <section className="case-study-build mt-20" aria-labelledby="case-study-build-title">
        <Reveal className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label mb-4">02 <span className="mx-2 text-accent">/</span> Build notes</p>
            <h2 id="case-study-build-title" className="display-type text-4xl font-semibold tracking-[-.06em] sm:text-6xl">How it comes together.</h2>
          </div>
          <p className="label">Product decisions <span className="text-accent">×</span> engineering</p>
        </Reveal>

        <div className="case-study-feature-grid">
          {project.highlights.map((highlight, featureIndex) => (
            <Reveal key={highlight} delay={featureIndex * 0.045}>
              <article className="case-study-feature h-full">
                <p className="label text-accent">{String(featureIndex + 1).padStart(2, "0")}</p>
                <p className="mt-7 text-base leading-relaxed text-fg/85 sm:text-lg">{highlight}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="case-study-stack mt-20 grid gap-8 rounded-2xl border border-line p-6 sm:p-9 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="label mb-3">03 <span className="mx-2 text-accent">/</span> Toolkit</p>
          <h2 className="display-type text-3xl font-semibold tracking-tight">Made with intent.</h2>
        </div>
        <ul className="flex content-start flex-wrap gap-2">
          {project.stack.filter((technology) => !technology.startsWith("TODO:")).map((technology) => (
            <li key={technology} className="chip">{technology}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="case-study-next mt-24">
        <p className="label mb-4">Up next <span className="text-accent">/ {String((index + 1) % projects.length + 1).padStart(2, "0")}</span></p>
        <Link href={`/projects/${next.slug}`} className="case-study-next-link group flex flex-col justify-between gap-6 border-y border-line py-8 sm:flex-row sm:items-end sm:py-10">
          <span>
            <span className="label block mb-3">{next.category}</span>
            <span className="display-type block text-5xl font-semibold uppercase leading-none tracking-[-.06em] transition-colors group-hover:text-accent sm:text-7xl">{next.name}</span>
            <span className="mt-3 block text-base text-mute">{next.tagline}</span>
          </span>
          <span className="case-study-next-arrow self-end text-4xl text-accent transition-transform group-hover:translate-x-2 sm:text-5xl" aria-hidden="true">↗</span>
        </Link>
      </Reveal>
      </div>
    </article>
  );
}
