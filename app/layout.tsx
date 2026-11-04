import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./loader.css";
import { site } from "@/lib/site";
import { Nav } from "@/components/nav";
import { Loader } from "@/components/loader";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/page-transition";
import { GoogleAnalytics } from "@/components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: false,
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
  preload: false,
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;
const verification = {
  ...(googleVerification ? { google: googleVerification } : {}),
  ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
};
const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
if (configuredMeasurementId && !/^G-[A-Z0-9]+$/.test(configuredMeasurementId)) {
  throw new Error("NEXT_PUBLIC_GA_MEASUREMENT_ID must be a valid GA4 measurement ID (G-...).");
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Sneh Patel",
    "full stack developer Surat",
    "AI engineer portfolio",
    "Next.js developer India",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sneh Patel — Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
};

export const viewport: Viewport = {
  themeColor: "#121210",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: "Full Stack Developer",
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Surat", addressRegion: "Gujarat", addressCountry: "IN" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
      sameAs: [site.github, site.linkedin],
      knowsAbout: ["Next.js", "React", "TypeScript", "Express.js", "PostgreSQL", "LangChain", "LangGraph", "Retrieval-augmented generation"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" data-loader="loading" className={`${inter.variable} ${bricolage.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {configuredMeasurementId && <GoogleAnalytics measurementId={configuredMeasurementId} />}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Loader />
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
