import Link from "next/link";
import { site } from "@/lib/site";
import { ISTClock } from "@/components/ist-clock";

export function Footer() {
  return (
    <footer id="footer" className="site-footer mt-20 border-t border-line">
      <div className="footer-signature mx-auto max-w-7xl px-5 py-8 sm:px-10 sm:py-12">
        <div className="footer-signature-top">
          <div className="footer-signature-intro">
            <p className="label">Full stack developer</p>
            <p className="footer-signature-detail">Building for the web &amp; beyond</p>
            <p className="footer-signature-detail">Surat, India</p>
          </div>

          <nav aria-label="Footer navigation" className="footer-signature-nav">
            <p className="label">Explore</p>
            <div className="footer-signature-links">
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/projects" className="footer-link">Projects</Link>
              <Link href="/resume" className="footer-link">Resume</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
          </nav>

          <div className="footer-signature-time">
            <p className="label">Local time · Surat</p>
            <p className="footer-signature-clock"><ISTClock /></p>
          </div>
        </div>

        <Link href="/#top" className="footer-wordmark" aria-label="Sneh Patel — back to top">
          Sneh Patel<span>.</span>
        </Link>

        <div className="footer-signature-bottom">
          <a href={`mailto:${site.email}`} data-analytics-event="contact_click" className="footer-link">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
          <p>© {new Date().getFullYear()} </p>
          <div className="footer-signature-socials">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
            <a href="#top" className="footer-link">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
