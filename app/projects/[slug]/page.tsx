import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { site } from "@/lib/site";
import { ProjectLinks } from "@/components/project";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs } from "@/components/breadcrumbs";

type Params = { slug: string };

const projectSeo: Record<string, { title: string; description: string }> = {
  gurukul: {
    title: "Gurukul: Web & Mobile School Platform",
    description: "Explore Gurukul, Sneh Patel’s web and mobile school platform built with Next.js, PostgreSQL and Expo. See teacher and student workflows, stack and source.",
  },
  opal: {
    title: "OPAL: AI Screen Recording Workspace Project",
    description: "Explore OPAL, a screen-recording and AI video workspace by Sneh Patel. See how the Electron recorder, Next.js app, real-time sync and billing fit together.",
  },
  whisperpdf: {
    title: "WhisperPDF: LangChain PDF Chatbot Project",
    description: "Explore WhisperPDF, Sneh Patel’s LangChain PDF chatbot with RAG, page-level citations and queued ingestion. Review its Qdrant stack, live app and source.",
  },
  quizsprint: {
    title: "QuizSprint: Real-Time Quiz App Project",
    description: "Explore QuizSprint, Sneh Patel’s quiz app with real-time play, three-round qualification, instant results and admin controls. See technologies and source code.",
  },
  dropee: {
    title: "Dropee: Full-Stack Cloud Storage Project",
    description: "Explore Dropee, Sneh Patel’s Dropbox-style cloud storage app with folders, previews and recovery workflows. Review its Next.js stack, live site and source code.",
  },
  watchwise: {
    title: "WatchWise: AI Movie Recommendation App",
    description: "Explore WatchWise, Sneh Patel’s AI movie recommender built with React, Express, Gemini and OMDb. See the recommendation flow, stack, live demo and source.",
  },
  bytebudget: {
    title: "ByteBudget: Expense Tracker App Project",
    description: "Explore ByteBudget, Sneh Patel’s expense tracker for income, spending, goals and limit alerts. Review its MERN stack, project details, live app and source code.",
  },
};

const caseStudyUpdatedAt = site.contentUpdatedAt;
const programmingLanguages = new Set(["C", "C++", "JavaScript", "TypeScript", "Python", "SQL"]);

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const seo = projectSeo[project.slug];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${site.url}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
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
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    codeRepository: project.repos.map((repository) => repository.href),
    programmingLanguage: project.stack.filter((technology) => programmingLanguages.has(technology)),
    ...(project.screenshot ? { image: `${site.url}${project.screenshot}` } : {}),
    dateModified: caseStudyUpdatedAt,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="case-study w-full pb-28 pt-32 sm:pb-32 sm:pt-40" data-project={project.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="case-study-content mx-auto w-full max-w-[96rem] px-5 sm:px-10 lg:px-12">
      <div className="mb-12 flex items-center justify-between gap-4">
        <Breadcrumbs items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]} />
        <span className="label">{String(index + 1).padStart(2, "0")} <span className="text-accent">/</span> {String(projects.length).padStart(2, "0")}</span>
      </div>

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
        <p className="label mt-6">Case study updated <time dateTime={caseStudyUpdatedAt}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${caseStudyUpdatedAt}T00:00:00Z`))}</time></p>
      </Reveal>

      {project.screenshot && (
        <Reveal className="case-study-media mt-12">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
              <Image
                src={project.screenshot}
                alt={`${project.name} interface for ${project.tagline.toLowerCase()}`}
                fill
                sizes="(max-width: 1024px) 100vw, 88vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="label mt-3">{project.name} application screenshot</figcaption>
          </figure>
        </Reveal>
      )}

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
