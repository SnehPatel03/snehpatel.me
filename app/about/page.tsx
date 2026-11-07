import type { Metadata } from "next";
import { About, Experience, StackSection, Contact } from "@/components/sections";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Sneh Patel: Full Stack Developer",
  description:
    "Meet Sneh Patel, a full stack developer in Surat and GTU Computer Engineering student. Explore his L&T experience and AI, web and real-time products.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${site.url}/about`,
    title: "About Sneh Patel: Full Stack Developer",
    description:
      "Meet Sneh Patel, a full stack developer in Surat and GTU Computer Engineering student. Explore his L&T experience and AI, web and real-time products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sneh Patel: Full Stack Developer",
    description:
      "Meet Sneh Patel, a full stack developer in Surat and GTU Computer Engineering student. Explore his L&T experience and AI, web and real-time products.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Sneh Patel",
    url: `${site.url}/about`,
    mainEntity: { "@id": `${site.url}/#person` },
  };

  return (
    <div className="pt-20">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} className="mx-auto max-w-7xl px-5 pt-4 sm:px-10" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <About headingLevel="h1" />
      <Experience />
      <StackSection />
      <Contact />
    </div>
  );
} 
