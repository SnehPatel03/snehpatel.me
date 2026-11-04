import Link from "next/link";
import { site } from "@/lib/site";
import { ISTClock } from "@/components/ist-clock";
import { Reveal } from "@/components/reveal";
import { marquee } from "@/lib/data";

export function Footer() {
  return (
    <footer id="footer" className="site-footer mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-10 sm:pt-24">
        <Reveal className="footer-invitation grid gap-8 border-b border-line pb-12 sm:gap-12 lg:grid-cols-12 lg:items-stretch lg:pb-16">
          <div className="footer-invitation-copy lg:col-span-8">
            <p className="label mb-7 flex items-center gap-3"><span className="size-2 rounded-full bg-accent" />Available for internships &amp; full-time roles</p>
            <h2 className="display-type max-w-5xl text-[clamp(3rem,6.4vw,6.5rem)] font-semibold leading-[.9] tracking-[-.075em]">
              From “what if?”<br />to “it works<span className="font-semibold text-accent">.</span>”
            </h2>
            <a data-cursor="Send" data-analytics-event="contact_click" href={`mailto:${site.email}`} className="footer-email group mt-8 inline-flex items-center gap-4 text-base text-mute transition hover:text-fg sm:mt-10 sm:text-lg">
              {site.email}<span className="footer-email-arrow grid size-10 place-items-center rounded-full border border-line text-fg transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent">↗</span>
            </a>
          </div>
          <div className="footer-contact-card lg:col-span-4">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <p className="label">###</p><span className="footer-contact-index label">A good place to start</span>
            </div>
            <div className="relative z-10 mt-10 sm:mt-14">
              <p className="max-w-sm text-base leading-relaxed text-mute sm:text-lg">Have a product to build, a role to discuss, or an idea to explore? I&apos;d love to hear about it.</p>
              <a data-cursor="Send" data-analytics-event="contact_click" href={`mailto:${site.email}`} className="fill-hover footer-contact-button group mt-7 inline-flex min-h-12 items-center gap-5 rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5">Start a conversation <span className="footer-contact-arrow">↗</span></a>
            </div>
          </div>
        </Reveal>

        <Reveal className="footer-stack-showcase border-b border-line py-8 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="label">The tools behind the work</p>
              <h3 className="display-type mt-2 text-2xl font-medium tracking-[-.045em] sm:text-3xl">A stack that ships.</h3>
            </div>

          </div>
          <div className="footer-stack-marquee" aria-label={`Technologies: ${marquee.join(", ")}`}>
            <div className="footer-stack-track" aria-hidden="true">
              {[...marquee, ...marquee].map((technology, index) => (
                <span className="footer-stack-chip" data-cursor="contrast" key={`${technology}-${index}`}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="grid gap-10 py-9 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Link href="/#top" className="display-type text-2xl font-bold uppercase tracking-[-.06em]">Sneh Patel<span className="text-accent">.</span></Link>
            <p className="mt-2 text-sm text-mute">Full stack developer · Surat, India</p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 text-sm sm:col-span-1 lg:col-span-3">
            <ul className="space-y-2.5">
              <li className="label mb-3">Explore</li>
              <li><Link href="/about" className="footer-link">About Sneh Patel</Link></li>
              <li><Link href="/projects" className="footer-link">Full stack and AI projects</Link></li>
              <li><Link href="/contact" className="footer-link">Contact Sneh Patel</Link></li>
              <li><Link href="/resume" className="footer-link">Sneh Patel resume</Link></li>
            </ul>
            <ul className="space-y-2.5">
              <li className="label mb-3">Elsewhere</li>
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a></li>
              <li><a href={`mailto:${site.email}`} data-analytics-event="contact_click" className="footer-link">Email ↗</a></li>
            </ul>
          </nav>
          <div className="lg:col-span-4 lg:justify-self-end lg:text-right">
            <p className="label">Local time · Surat</p>
            <p className="display-type mt-2 text-3xl font-medium tracking-tight"><ISTClock /></p>
            <a href="#top" className="label mt-6 inline-flex min-h-10 items-center gap-3 hover:text-fg">Back to top <span className="text-accent">↑</span></a>
          </div>
        </Reveal>

        <div className="flex flex-col justify-between gap-2 border-t border-line pt-5 text-xs text-mute sm:flex-row">
          <p>© {new Date().getFullYear()} Sneh Patel. Built with care.</p>
          <p>Designed &amp; developed in Surat, India.</p>
        </div>
      </div>
    </footer>
  );
}
