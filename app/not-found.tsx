import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found. Return to Sneh Patel’s portfolio to explore projects, experience and contact details.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 sm:px-10">
      <p className="label mb-4">404</p>
      <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
        Page <span className="font-sans font-semibold text-accent">not found.</span>
      </h1>
      <Link href="/" className="mt-8 text-lg hover:text-accent">← Back home</Link>
    </section>
  );
}
