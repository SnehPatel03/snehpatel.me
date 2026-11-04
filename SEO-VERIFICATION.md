# SEO verification report

## Test context

- Built with `npm run build` on 2026-11-04, then served using `npm run start -- --hostname 127.0.0.1`.
- Raw HTML checks used `http://127.0.0.1:3000`; the updated code was not deployed to the public hostname during verification.
- Quality checks: `npm run lint`, `npm run typecheck`, `git diff --check`, and `npm run build` all passed.
- Next.js emitted a non-fatal workspace warning: it ignored `/Users/snehpatel/package-lock.json` because it is outside the Git repository.

## Crawlability and raw HTML

All indexable pages returned HTTP 200; `/unknown-seo-test` returned HTTP 404. Page HTML contained the title, description, canonical, H1, Open Graph/Twitter metadata, and JSON-LD before any browser JavaScript ran.

Compact raw-source command used (avoids printing Next.js’s minified one-line HTML):

```sh
curl -sS "$BASE$route" | grep -oiE '<title>[^<]*</title>|<meta name="description" content="[^"]*"|<link rel="canonical" href="[^"]*"|<h1[^>]*>'
```

| Route | HTTP | Title | Description chars | Canonical | Server-rendered H1 |
|---|---:|---|---:|---|---|
| `/` | 200 | Sneh Patel \| Full Stack Developer in Surat, Gujarat | 158 | `https://snehpatel.dev` | Sneh Patel |
| `/about` | 200 | About Sneh Patel: Full Stack Developer \| Sneh Patel | 149 | `https://snehpatel.dev/about` | About Sneh Patel. |
| `/projects` | 200 | AI & Full Stack Projects by Sneh Patel \| Sneh Patel | 157 | `https://snehpatel.dev/projects` | Projects by Sneh Patel. |
| `/projects/gurukul` | 200 | Gurukul: Web & Mobile School Platform \| Sneh Patel | 154 | `https://snehpatel.dev/projects/gurukul` | Gurukul |
| `/projects/opal` | 200 | OPAL: AI Screen Recording Workspace Project \| Sneh Patel | 155 | `https://snehpatel.dev/projects/opal` | OPAL |
| `/projects/whisperpdf` | 200 | WhisperPDF: LangChain PDF Chatbot Project \| Sneh Patel | 153 | `https://snehpatel.dev/projects/whisperpdf` | WhisperPDF |
| `/projects/quizsprint` | 200 | QuizSprint: Real-Time Quiz App Project \| Sneh Patel | 159 | `https://snehpatel.dev/projects/quizsprint` | QuizSprint |
| `/projects/dropee` | 200 | Dropee: Full-Stack Cloud Storage Project \| Sneh Patel | 160 | `https://snehpatel.dev/projects/dropee` | Dropee |
| `/projects/watchwise` | 200 | WatchWise: AI Movie Recommendation App \| Sneh Patel | 154 | `https://snehpatel.dev/projects/watchwise` | WatchWise |
| `/projects/bytebudget` | 200 | ByteBudget: Expense Tracker App Project \| Sneh Patel | 160 | `https://snehpatel.dev/projects/bytebudget` | ByteBudget |
| `/contact` | 200 | Contact Sneh Patel, Full Stack Developer \| Sneh Patel | 159 | `https://snehpatel.dev/contact` | Contact Sneh Patel. |
| `/resume` | 200 | Sneh Patel Resume: Full Stack Developer \| Sneh Patel | 159 | `https://snehpatel.dev/resume` | Sneh Patel |

Every listed route has exactly one H1. The raw HTML parser confirmed 140–160-character descriptions, `summary_large_image` Twitter cards, a unique route-specific `og:image`, and valid JSON in every JSON-LD block.

## Structured data

| Route group | JSON-LD types found in raw HTML |
|---|---|
| `/` | `Person`, `WebSite` |
| `/about` | `Person`, `WebSite`, `BreadcrumbList`, `ProfilePage` |
| `/projects` | `Person`, `WebSite`, `BreadcrumbList`, `ItemList` |
| `/projects/[slug]` | `Person`, `WebSite`, `SoftwareSourceCode`, `BreadcrumbList` |
| `/contact` | `Person`, `WebSite`, `BreadcrumbList` |
| `/resume` | `Person`, `WebSite`, `BreadcrumbList` |

The JSON-LD blocks parsed as valid JSON locally. Google’s Rich Results Test and Schema Markup Validator were not run because they cannot fetch this local build. Submit the deployed public URLs to those validators after deployment; the Person and SoftwareSourceCode types are structured data, not a promise of a Google rich-result display.

## Robots, sitemap, icons, and social images

- `robots.txt` returned 200 with `Allow: /`, `Disallow: /api/`, and `Sitemap: https://snehpatel.dev/sitemap.xml`.
- `sitemap.xml` returned 200 and listed all 12 canonical URLs, each with `<lastmod>2026-11-04T00:00:00.000Z</lastmod>`.
- `/favicon.ico`, `/apple-icon.png` (180×180), `/icon.svg`, and `/site.webmanifest` returned 200 with expected image/manifest content types. The HTML head linked all four.
- The Home, About, Projects, Contact, Resume, and all seven project Open Graph image endpoints returned 200 `image/png`.
- The resume PDF exists at `/resume.pdf` and is linked from the About and Resume pages.

## Redirects and response headers

Local production-server checks returned:

```text
www host:      308 https://snehpatel.dev/about
forwarded http: 308 https://snehpatel.dev/about
trailing slash: 308 http://127.0.0.1:3000/about
```

The production response included CSP, HSTS (`max-age=31536000`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and the configured Permissions-Policy. The CSP permits the GA4 endpoints only for the selected analytics integration and currently allows inline scripts/styles for Next.js hydration and existing inline styles.

## Lighthouse and Core Web Vitals

Mobile and desktop Lighthouse scores were **not run**: no Lighthouse runner or browser executable is installed in this workspace. No score is claimed. Field Core Web Vitals at the 75th percentile also cannot be established from a local build; measure them after deployment using PageSpeed Insights/Search Console or a privacy-reviewed field-data setup.

## Remaining deployment and content items

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the real GA4 `G-...` ID. The integration and event hooks are present, but the tag is correctly not loaded while that variable is unset.
2. Set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` after verifying domain ownership, then submit `https://snehpatel.dev/sitemap.xml` in both webmaster tools.
3. Configure and verify the apex/`www` aliases, HTTPS termination, and CDN in the hosting provider. App-level redirects were tested with local host and forwarded-protocol headers; external DNS/TLS configuration was not available.
4. Run Lighthouse on mobile and desktop against the deployed URL, and run Google Rich Results Test plus Schema Markup Validator against deployed pages.
5. Add first-hand problem statements and verified measurable outcomes for project case studies when Sneh provides them. The existing project data does not contain reliable result metrics, so none were invented.
6. A personal portrait was not present. The Person schema intentionally omits `image` rather than labeling the brand mark as a photograph.
7. Review GA4 consent and privacy-notice requirements for the site’s audience and jurisdictions before enabling the measurement ID.
8. IndexNow was not configured; no key or deploy workflow was supplied.
