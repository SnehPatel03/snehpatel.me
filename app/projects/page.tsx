import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGallery } from "@/components/project-gallery";
import { SectionHead } from "@/components/sections";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Sneh Patel: Gurukul (school operations web and mobile app), OPAL (AI recording workspace), WhisperPDF (RAG PDF chatbot), QuizSprint (real-time quizzes), Dropee (cloud storage), ByteBudget and WatchWise.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-10">
      <SectionHead
        index="W"
        label="Project gallery"
        title={<>All <em className="font-serif font-normal italic text-accent">projects.</em></>}
      />
      <Suspense fallback={<p className="label">Loading projects…</p>}><ProjectGallery /></Suspense>
    </section>
  );
}
