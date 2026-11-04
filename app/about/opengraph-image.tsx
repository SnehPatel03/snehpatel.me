import { createOpenGraphImage, openGraphSize } from "@/lib/open-graph";

export const alt = "About Sneh Patel, a full stack developer in Surat, India";
export const size = openGraphSize;
export const contentType = "image/png";

export default function AboutOpenGraphImage() {
  return createOpenGraphImage({
    eyebrow: "About",
    title: "Sneh Patel",
    description: "Full stack developer · Computer Engineering student · Surat, India",
  });
}
