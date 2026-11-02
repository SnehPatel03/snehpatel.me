import type { Metadata } from "next";
import { About, Experience, StackSection, Contact } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sneh Patel: full stack developer and B.E. Computer Engineering student at GTU, with experience at Larsen & Toubro and a focus on real-time and RAG-based AI products.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Experience />
      <StackSection />
      <Contact />
    </div>
  );
}
