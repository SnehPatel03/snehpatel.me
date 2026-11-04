import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Contact } from "@/components/sections";
import { site } from "@/lib/site";

const description =
  "Contact Sneh Patel, a full stack developer in Surat, India, about AI Engineer or full-stack roles and product collaborations. Send a message or email directly.";

export const metadata: Metadata = {
  title: "Contact Sneh Patel, Full Stack Developer",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    title: "Contact Sneh Patel, Full Stack Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sneh Patel, Full Stack Developer",
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} className="mx-auto max-w-7xl px-5 pt-4 sm:px-10" />
      <Contact headingLevel="h1" />
    </div>
  );
}
