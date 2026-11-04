import { createOpenGraphImage, openGraphSize } from "@/lib/open-graph";

export const alt = "Sneh Patel’s full stack developer resume";
export const size = openGraphSize;
export const contentType = "image/png";

export default function ResumeOpenGraphImage() {
  return createOpenGraphImage({
    eyebrow: "Resume",
    title: "Sneh Patel",
    description: "Full stack developer · AI products · Surat, India",
  });
}
