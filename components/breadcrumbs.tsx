import Link from "next/link";
import { site } from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumbs({
  items,
  className = "",
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={`page-breadcrumb label ${className}`}>
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-accent">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-fg">{item.name}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-fg">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
