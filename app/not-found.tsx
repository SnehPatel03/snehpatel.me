import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 sm:px-10">
      <p className="label mb-4">404</p>
      <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
        Page <em className="font-serif font-normal italic text-accent">not found.</em>
      </h1>
      <Link href="/" className="mt-8 text-lg hover:text-accent">← Back home</Link>
    </section>
  );
}
