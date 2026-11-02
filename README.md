# Sneh Patel — Portfolio

Next.js App Router portfolio with a dark-only warm monochrome design, name-led hero, Bricolage Grotesque display type, Inter body type and JetBrains Mono labels, an SP preloader, custom pointer cursor, scroll-triggered text reveals, an About bento grid, interactive project showcase with real desktop and mobile captures, static case studies, URL-synced gallery, keyboard command palette, print-ready resume and contact API.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Before deploying, run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Configure and edit content

- `lib/site.ts`: identity, links, SEO defaults and production URL (`NEXT_PUBLIC_SITE_URL`).
- `lib/data.ts`: projects, experience, education, skills, engineering notes and owner TODOs.
- `.env.local`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` for contact delivery. Never commit secrets.

To add a project, add one typed entry in `lib/data.ts` with a unique slug, live URL, one or more repos, summary, highlights, stack and featured flag. The sitemap, gallery and static case study pages are generated from this data.

Current portfolio previews use WebP captures from each project's public live page in `public/projects/`. Refresh them after meaningful UI changes by capturing the deployed URL at 1600×1000. Built-in UI mockups remain available as a fallback when no screenshot path is set.

## Resume

Visit `/resume` and choose **Print / Save as PDF**. Add a downloadable PDF asset when one is available.

## Deploy to Vercel

Configure `NEXT_PUBLIC_SITE_URL` and the optional Resend variables, then deploy with your preferred repository workflow. Submit `/sitemap.xml` in Google Search Console and validate `/opengraph-image` with a social-card debugger.

## Included

Per-route metadata/canonicals, Open Graph, sitemap, robots, manifest, JSON-LD, static project pages, security headers, honeypot and in-memory contact rate limit, skip link, reduced-motion support, URL-driven category filtering, and keyboard command search.

## Owner TODOs

See `ownerTodos` in `lib/data.ts`: WatchWise details, WhisperPDF LangGraph confirmation, production domain, and resume PDF. Unconfirmed WatchWise role and stack are not shown on the page.
