import { notFound } from "next/navigation";
import { createOpenGraphImage, openGraphSize } from "@/lib/open-graph";
import { getProject, projects } from "@/lib/data";

export const alt = "Project case study by Sneh Patel";
export const size = openGraphSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return createOpenGraphImage({
    eyebrow: project.category,
    title: project.name,
    description: project.tagline,
  });
}
