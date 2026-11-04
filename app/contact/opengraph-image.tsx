import { createOpenGraphImage, openGraphSize } from "@/lib/open-graph";

export const alt = "Contact Sneh Patel about AI engineering and full stack roles";
export const size = openGraphSize;
export const contentType = "image/png";

export default function ContactOpenGraphImage() {
  return createOpenGraphImage({
    eyebrow: "Get in touch",
    title: "Contact Sneh Patel",
    description: "Open to AI Engineer and full-stack roles · Surat, India",
  });
}
