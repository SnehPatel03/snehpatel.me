import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.contentUpdatedAt}T00:00:00.000Z`);
  return [
    { url: site.url, lastModified },
    { url: `${site.url}/about`, lastModified },
    { url: `${site.url}/projects`, lastModified },
    { url: `${site.url}/contact`, lastModified },
    { url: `${site.url}/resume`, lastModified },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified,
    })),
  ];
}
