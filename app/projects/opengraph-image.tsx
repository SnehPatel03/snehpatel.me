import { createOpenGraphImage, openGraphSize } from "@/lib/open-graph";

export const alt = "Full stack and AI projects by Sneh Patel";
export const size = openGraphSize;
export const contentType = "image/png";

export default function ProjectsOpenGraphImage() {
  return createOpenGraphImage({
    eyebrow: "Selected work",
    title: "Projects by Sneh Patel",
    description: "AI products, full-stack platforms and real-time applications.",
  });
}
