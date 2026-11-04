import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { education, experience, stackGroups } from "@/lib/data";
import { PrintButton } from "@/components/print-button";
import { Breadcrumbs } from "@/components/breadcrumbs";

const description =
  "View and download Sneh Patel’s resume, with full stack developer experience, Computer Engineering education at GTU, technical skills and selected project work.";

export const metadata: Metadata = {
  title: "Sneh Patel Resume: Full Stack Developer",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    url: `${site.url}/resume`,
    title: "Sneh Patel Resume: Full Stack Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneh Patel Resume: Full Stack Developer",
    description,
  },
};

export default function ResumePage() {
  return <article className="mx-auto max-w-4xl px-5 pb-28 pt-36 sm:px-10">
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resume", href: "/resume" }]} className="mb-8" />
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
      <p className="label">Resume</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/resume.pdf"
          download="Sneh-Patel-Resume.pdf"
          data-analytics-event="resume_download"
          className="fill-hover chip inline-flex min-h-11 items-center gap-2 bg-fg px-4 font-medium text-bg transition hover:-translate-y-0.5"
        >
          Download PDF <span aria-hidden="true">↓</span>
        </a>
        <PrintButton />
      </div>
    </div>
    <header className="border-b border-line pb-8">
      <h1 className="text-5xl font-semibold tracking-tight">{site.name}</h1><p className="mt-2 text-xl text-accent">Full Stack Developer</p>
      <p className="mt-4 text-mute">{site.location} · <a href={`mailto:${site.email}`} className="underline">{site.email}</a></p>
      <p className="mt-2 text-mute"><a href={site.github}>GitHub</a> · <a href={site.linkedin}>LinkedIn</a></p>
    </header>
    <section className="resume-section border-b border-line py-8"><h2 className="label">Summary</h2><p className="mt-3 text-mute">{site.description}</p></section>
    <section className="resume-section border-b border-line py-8"><h2 className="label">Experience</h2><h3 className="mt-4 text-xl font-semibold">{experience.role} · {experience.company}</h3><p className="text-mute">{experience.period} · {experience.mode}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-mute">{experience.points.map((point) => <li key={point}>{point}</li>)}</ul></section>
    <section className="resume-section border-b border-line py-8"><h2 className="label">Education</h2><h3 className="mt-4 text-xl font-semibold">{education.degree}</h3><p className="text-mute">{education.school} · {education.period} · CGPA {education.cgpa}</p><p className="mt-3 text-mute">Coursework: {education.coursework.join(", ")}</p></section>
    <section className="resume-section py-8"><h2 className="label">Skills</h2>{stackGroups.map((group) => <p key={group.title} className="mt-3"><strong>{group.title}: </strong><span className="text-mute">{group.items.join(", ")}</span></p>)}</section>
    <p className="mt-10 print:hidden"><Link href="/#work" className="text-accent">View selected work →</Link></p>
  </article>;
}
