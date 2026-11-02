import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { ProjectShowcase } from "@/components/project-showcase";
import { IntroEntrance } from "@/components/intro-entrance";
import { TextReveal } from "@/components/text-reveal";
import { site } from "@/lib/site";
import {
  services,
  experience,
  education,
  stackGroups,
  marquee,
  engineeringNotes,
} from "@/lib/data";

const wrap = "mx-auto w-full max-w-7xl px-5 sm:px-10";

export function SectionHead({ index, label, title }: { index: string; label: string; title: React.ReactNode }) {
  return (
    <Reveal className="mb-14">
      <p className="label mb-5 flex items-center gap-3"><span className="text-accent">{index.padStart(2, "0")}</span><span className="h-px w-8 bg-line" />{label}</p>
      <h2 className="display-type max-w-5xl text-4xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-7xl"><TextReveal>{title}</TextReveal></h2>
    </Reveal>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden px-5 pb-5 pt-28 sm:px-10 sm:pb-7 sm:pt-32">
      <IntroEntrance className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 border-b border-line/80 pb-4">
        <p className="label flex items-center gap-3"><span className="size-2 rounded-full bg-accent shadow-[0_0_16px_rgba(208,195,174,.6)]" aria-hidden="true" />Available for internships &amp; full-time roles</p>
        <p className="label hidden text-right sm:block">{site.location}</p>
      </IntroEntrance>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-14 sm:py-20">
        <IntroEntrance delay={0.08}>
          <p className="label mb-6 flex items-center gap-3"><span className="text-accent">01</span><span className="h-px w-10 bg-line" />Full stack developer <span className="text-accent">/</span> Surat, India</p>
          <h1 className="display-type max-w-full text-[clamp(4.5rem,15vw,13rem)] font-bold uppercase leading-[.82] tracking-[-0.09em] lg:whitespace-nowrap">
            <TextReveal>Sneh <span className="text-fg">Patel</span></TextReveal>
          </h1>
        </IntroEntrance>
        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-line pt-6 sm:mt-14 sm:flex-row sm:items-end sm:pt-8">
          <IntroEntrance delay={0.18} className="max-w-2xl">
            <p className="text-lg leading-relaxed text-mute sm:text-2xl">Full stack developer building useful AI products, real-time systems and thoughtful digital experiences.</p>
          </IntroEntrance>
          <IntroEntrance delay={0.24} className="flex shrink-0 flex-wrap gap-3">
            <Link href="/#work" className="group inline-flex min-h-12 items-center gap-5 rounded-full bg-fg px-6 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-offset-4">
              View selected work <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
            <Link href="/#contact" className="inline-flex min-h-12 items-center rounded-full border border-line px-6 text-sm text-fg transition hover:border-fg">Get in touch</Link>
          </IntroEntrance>
        </div>
      </div>
      <IntroEntrance delay={0.3} className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-line/80 pt-4">
        <p className="label">Portfolio <span className="px-1 text-accent">/</span> 2026</p>
        <a href="#about" className="label group inline-flex min-h-11 items-center gap-3 hover:text-fg"><span>Scroll to explore</span><span aria-hidden="true" className="text-accent transition-transform group-hover:translate-y-1">↓</span></a>
        <p className="label hidden sm:block">01 — 07</p>
      </IntroEntrance>
    </section>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee mt-16 overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i} className="display-type mx-6 whitespace-nowrap text-3xl font-semibold uppercase tracking-tight text-mute sm:text-4xl">
            {m} <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const buildSteps = ["Understand", "Model", "Build", "Refine"];
  const focusAreas = ["AI & retrieval", "Real-time products", "Web + mobile", "Product craft"];
  return (
    <section id="about" className={`${wrap} py-28`}>
      <SectionHead
        index="01"
        label="About"
        title={<>A little about <em className="font-serif font-normal italic text-accent">how I work.</em></>}
      />
      <div className="about-bento grid auto-rows-[minmax(10rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-12">
        <Reveal className="bento-tile about-card about-card-intro flex flex-col justify-between p-6 sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="label">01 / How I think</p>
            <span className="about-coordinate label hidden sm:block">BUILD WITH INTENT ↘</span>
          </div>
          <div className="relative z-10 mt-12 max-w-2xl">
            <h3 className="display-type max-w-[14ch] text-4xl font-bold leading-[.92] tracking-[-.075em] sm:text-5xl lg:text-6xl">
              Make the complex feel <em className="font-serif font-normal italic text-accent">clear.</em>
            </h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              I&apos;m a full-stack developer and Computer Engineering student at GTU. I enjoy the whole product loop: understanding a problem, shaping its data, building the interface, and refining the details people use every day.
            </p>
          </div>
          <div className="relative z-10 mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-line/80 pt-5">
            <p className="label max-w-xs leading-relaxed">Engineering first<br />Product always</p>
            <Link href="/#work" className="about-card-link label inline-flex min-h-10 items-center gap-3 text-fg">Explore selected work <span className="text-accent">↗</span></Link>
          </div>
          <span className="about-intro-mark" aria-hidden="true">01</span>
        </Reveal>

        <Reveal delay={0.05} className="bento-tile about-card about-card-signature relative flex min-h-52 flex-col justify-between overflow-hidden p-6 sm:col-span-2 lg:col-span-5 lg:min-h-56">
          <div className="relative z-10 flex items-start justify-between">
            <p className="label">02 / The person</p>
            <span className="about-status"><span />OPEN TO OPPORTUNITIES</span>
          </div>
          <span className="about-monogram" aria-hidden="true">SP</span>
          <div className="relative z-10 flex items-end justify-between gap-3">
            <div><p className="display-type text-2xl font-semibold tracking-[-.04em]">Sneh Patel</p><p className="label mt-1">Developer <span className="text-accent">·</span> Student</p></div>
            <p className="label text-right">Surat<br />India</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bento-tile about-card about-card-experience flex min-h-48 flex-col justify-between p-6 lg:col-span-3">
          <div className="flex items-start justify-between gap-2"><p className="label">03 / Experience</p><span className="label text-accent">2026</span></div>
          <div><p className="display-type text-3xl font-semibold leading-none tracking-[-.06em]">L&amp;T</p><p className="mt-2 text-sm font-medium">Full Stack Developer Intern</p><p className="mt-1 text-xs text-mute">React · TypeScript · .NET REST APIs</p></div>
          <p className="label">Remote <span className="text-accent">/</span> July</p>
        </Reveal>

        <Reveal delay={0.14} className="bento-tile about-card about-card-education flex min-h-48 flex-col justify-between p-6 lg:col-span-2">
          <p className="label">04 / Study</p>
          <div><p className="display-type text-5xl font-semibold leading-none tracking-[-.075em]">8.89</p><p className="label mt-2">CGPA / 10</p></div>
          <p className="text-xs leading-relaxed text-mute">Computer Engineering<br />GTU · Graduating 2027</p>
        </Reveal>

        <Reveal delay={0.18} className="bento-tile about-card about-card-process flex flex-col justify-between p-6 sm:col-span-2 lg:col-span-7 lg:p-7">
          <div className="flex items-center justify-between gap-4"><p className="label">05 / From idea to interface</p><span className="label hidden text-accent sm:block">MY WORKING LOOP</span></div>
          <div className="about-process mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {buildSteps.map((step, index) => <div key={step} className="about-process-step">
              <span className="label text-accent">0{index + 1}</span><p className="mt-2 text-lg font-medium tracking-tight">{step}</p>
            </div>)}
          </div>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-mute">I like moving between architecture and the small interaction details, keeping the product coherent from first sketch to shipped feature.</p>
        </Reveal>

        <Reveal delay={0.22} className="bento-tile about-card about-card-focus flex flex-col justify-between p-6 sm:col-span-2 lg:col-span-5">
          <div className="flex items-center justify-between gap-3"><p className="label">06 / Areas I explore</p><span className="about-spark" aria-hidden="true">✳</span></div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {focusAreas.map((area, index) => <div key={area} className="about-focus-item"><span className="label">0{index + 1}</span><span>{area}</span></div>)}
          </div>
          <p className="label mt-6">AI <span className="text-accent">/</span> Systems <span className="text-accent">/</span> Product</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className={`${wrap} py-28`}>
      <SectionHead index="02" label="Services" title={<>What I <em className="font-serif font-normal italic text-accent">do.</em></>} />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className="bg-bg">
            <div className="h-full p-8">
              <p className="label">{s.n}</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-mute">{s.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className={`${wrap} py-28`}>
      <SectionHead index="03" label="Selected work" title={<>Built for the <em className="font-serif font-normal italic text-accent">real world.</em></>} />
      <ProjectShowcase />
      <div className="mt-12">
        <Link href="/projects" className="label inline-block border-b border-accent pb-1 text-fg hover:text-accent">
          Open the project gallery →
        </Link>
      </div>
    </section>
  );
}

export function EngineeringNotes() {
  return <section id="notes" className={`${wrap} py-28`}>
    <SectionHead index="04" label="Engineering notes" title={<>Decisions behind the <em className="font-serif font-normal italic text-accent">work.</em></>} />
    <div className="grid gap-4 md:grid-cols-3">
      {engineeringNotes.map((note) => <article key={note.project} className="rounded-2xl border border-line p-6">
        <p className="label">{note.project}</p><h3 className="mt-5 text-xl font-semibold">{note.title}</h3><p className="mt-3 text-mute">{note.body}</p>
      </article>)}
    </div>
  </section>;
}

export function Experience() {
  return (
    <section id="archive" className={`${wrap} py-28`}>
      <SectionHead index="05" label="Archive" title={<>Experience &amp; <em className="font-serif font-normal italic text-accent">study.</em></>} />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-2">
        <Reveal className="bg-bg">
          <div className="p-8">
            <p className="label">Work</p>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{experience.role}</h3>
            <p className="mt-1 text-mute">{experience.company} · {experience.period} · {experience.mode}</p>
            <ul className="mt-6 space-y-3 text-mute">
              {experience.points.map((p) => (
                <li key={p} className="flex gap-3"><span className="text-accent" aria-hidden="true">–</span>{p}</li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {experience.stack.map((s) => (<li key={s} className="chip">{s}</li>))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="bg-bg">
          <div className="p-8">
            <p className="label">Study</p>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{education.degree}</h3>
            <p className="mt-1 text-mute">{education.school}</p>
            <p className="mt-1 text-mute">{education.period} · CGPA {education.cgpa}</p>
            <p className="label mt-8">Relevant coursework</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.coursework.map((c) => (<li key={c} className="chip">{c}</li>))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StackSection() {
  return (
    <section id="stack" className={`${wrap} py-28`}>
      <SectionHead index="06" label="Stack" title={<>A toolkit for <em className="font-serif font-normal italic text-accent">shipping.</em></>} />
      <p className="mb-8 max-w-2xl text-lg text-mute">The languages, frameworks and systems I use across shipped web, AI and mobile work.</p>
      <div className="stack-matrix border-t border-line">
        {stackGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.04} className="stack-row grid gap-4 border-b border-line py-6 sm:grid-cols-[3rem_12rem_1fr] sm:items-start sm:gap-6">
            <span className="label text-accent">0{i + 1}</span>
            <h3 className="text-xl font-semibold tracking-tight">{g.title}</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {g.items.map((it) => (<li key={it} className="stack-item text-mute transition-colors hover:text-fg">{it}</li>))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className={`${wrap} py-28`}>
      <SectionHead index="07" label="Contact" title={<>Have a role or idea? <em className="font-serif font-normal italic text-accent">Let&apos;s talk.</em></>} />
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-md text-lg text-mute">
            Open to internships, full-time roles and collaborations. The quickest way to reach me is email.
          </p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block break-all text-2xl font-semibold tracking-tight hover:text-accent sm:text-3xl">
            {site.email}
          </a>
          <div className="mt-8 flex gap-6 text-sm">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub ↗</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn ↗</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
