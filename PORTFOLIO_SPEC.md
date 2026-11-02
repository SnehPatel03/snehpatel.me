# Sneh Patel — Portfolio Specification

Complete build spec. Anyone (or any tool) can rebuild the site from this document.

## 1. Goals

- Present Sneh Patel as a **full stack developer** with strong AI/RAG work, for internship and full-time hiring.
- Show 4 resume projects plus 1 role-relevant extra, each with a **mockup, live URL and GitHub link**.
- Production quality: fast, accessible, SEO-complete, deployable on Vercel.

## 2. Reference analysis (design inspiration, nothing copied)

| Source | What is taken |
| --- | --- |
| arsalankaleem portfolio | Dark premium look, hero with tech marquee, About with stats strip, Services grid, "Selected work" with featured rows + "More projects", italic accent word in headings, contact section with form |
| giats.me (favorite) | Editorial oversized typography, page-load percentage counter, full-screen menu overlay, scroll reveals, dedicated `/projects/<slug>` case-study pages, "next project" navigation |
| krishmaurya.dev (friend, **structure only**) | Section order and numbering: Hero → About → Work → Projects gallery → Archive (experience & study) → Stack → Contact; routes `/`, `/projects`, project detail pages. Visuals, copy and code are not reused. |

## 3. Information architecture

```
/                    Home: Hero, About, Services, Work, Archive, Stack, Contact
/about               Extended About + Archive + Stack + Contact
/projects            Gallery of all projects
/projects/[slug]     Case study (gurukul, opal, whisperpdf, quizsprint, dropee, watchwise)
/api/contact         POST: contact form handler
/sitemap.xml /robots.txt /manifest.webmanifest /opengraph-image /icon
```

Navigation: fixed header (logo, desktop links, Menu button) → full-screen overlay menu with numbered links, email and socials.

## 4. Content

### Identity
- Name: Sneh Patel · Role: Full Stack Developer · Location: Surat, Gujarat, India
- Email: snehpatel1233@gmail.com · GitHub: github.com/SnehPatel03 · LinkedIn: linkedin.com/in/sneh-patel-ab6302213
- Phone is intentionally **not** published on the site.
- Hero: oversized name-led introduction with a short full-stack / AI descriptor.
- Availability pill: "Open to internships & full-time roles".

### Projects (selected portfolio projects)
| Project | Period | Live | Repos | Stack |
| --- | --- | --- | --- | --- |
| Gurukul | Aug 2026 | Deployment unavailable | Gurukul-Application | Next.js, TypeScript, Prisma, PostgreSQL, Expo, React Native |
| ByteBudget | Personal | expense-tracker-frontend-bmpg.onrender.com | ByteBudget | MongoDB, Express.js, React, Node.js |
| OPAL | Aug–Oct 2026 | opal-beige.vercel.app | Opal, Opal-Desktop | Next.js, TypeScript, shadcn/ui, TanStack Query, Electron, Express.js, Prisma, Neon, Socket.IO, Groq, Stripe, ImageKit, Clerk |
| WhisperPDF | Aug 2025 | whisperpdf.onrender.com | WhisperPDF | React, TypeScript, LangChain, Gemini, Qdrant, Redis Stack, BullMQ, Clerk |
| QuizSprint | Jan 2026 | quiz-sprint-client.vercel.app | QuizSprint | React, TypeScript, Node/Express, PostgreSQL, Prisma |
| Dropee | Mar 2026 | dropee-s3.vercel.app | dropee | Next.js, TypeScript, PostgreSQL, Drizzle, Clerk, ImageKit, Tailwind |
| WatchWise (extra) | Personal | watchwise-hq.onrender.com | WatchWise | React, Node.js, AI recommendations |

Selection rule: present the strongest product work, including the web and mobile Gurukul school operations app; avoid padding the portfolio with small tutorial repositories.

### Experience & education
- Full Stack Developer Intern, Larsen & Toubro, July 2026 (remote): React, TypeScript, ASP.NET/.NET REST APIs, Git.
- B.E. Computer Engineering, GTU Surat, graduating 2027, CGPA 8.89/10.

## 5. Design system

- **Theme**: dark only. `bg #121210`, `surface #1a1917`, `line #34322e`, `fg #ebe8e1`, `mute #a19c93`, warm accent `#d0c3ae`.
- **Type**: Bricolage Grotesque for display, Inter for body text, JetBrains Mono for uppercase metadata.
- **Scale**: name-led hero with a restrained introduction; section titles 4xl→7xl; body 16–20px.
- **Layout**: max width 80rem, gutters 20px mobile / 40px ≥640px, generous section spacing, 1px hairline borders, lightly rounded project frames.
- **Components**: chip, label, browser-frame archive mockups, interactive project showcase, About bento grid, stack matrix, section header `[01] Label` + title.

## 6. Interaction & motion

- Loader: centered SP mark and 0→100% counter over ~1.45s, curtain slides up; once per session; skipped for reduced-motion.
- Word-scale text reveals and section fade + rise on scroll, once.
- Marquee of tech names, pauses on hover.
- Menu overlay slides from top with staggered links; Esc closes; body scroll locked.
- Scroll progress is spring-smoothed; the header hides while scrolling down and returns while scrolling up.
- Project showcase switches between real desktop/mobile captures and includes the project role, a key feature, stack, live link and case study.

## 7. Mockups

`public/projects/*.webp` contains desktop captures from public live pages and mobile captures where available. The homepage presents desktop and mobile views side by side; the project archive uses browser chrome. Gurukul uses captures from its live deployment.

## 8. SEO

- `metadataBase`, title template `%s — Sneh Patel`, descriptions, keywords, canonical per route.
- Open Graph + Twitter large card; generated 1200×630 OG image; favicon.
- JSON-LD: Person + WebSite (layout), SoftwareApplication (each project).
- `sitemap.xml` (home, about, projects, each case study), `robots.txt` (blocks `/api/`), manifest.
- Static generation for all pages (`generateStaticParams`); semantic landmarks; one `h1` per page.
- Targets: Lighthouse ≥ 95 performance/accessibility/SEO/best practices; LCP < 2.5s, CLS < 0.1.

## 9. Accessibility

Skip link, visible focus ring, `aria-expanded` on menu button, dialog semantics on menu, labelled form fields, `role="status"/"alert"` for form feedback, decorative mockup internals `aria-hidden`, mockup wrapper `role="img"` with label, reduced-motion respected, contrast ≥ 4.5:1.

## 10. Contact flow & security

- Client form → `POST /api/contact` (JSON). Server validates lengths and email, honeypot field `company`, in-memory rate limit (5 per 10 min per IP; upgrade to Upstash for strict serverless limits).
- Delivery through Resend (`RESEND_API_KEY`). Without a key the API returns 503 and the UI shows a mailto fallback.
- Headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; `poweredByHeader` off.

## 11. Tech stack

Next.js (App Router) + React + TypeScript (strict), Tailwind CSS v4 (`@theme` tokens), `motion` for animation, `next/font` for self-hosted fonts, `next/og` for images. No database, no CMS: content lives in `lib/data.ts`.

## 12. Deployment checklist

1. `npm install && npm run typecheck && npm run build`
2. Set `NEXT_PUBLIC_SITE_URL`, Resend vars on Vercel; attach domain.
3. Add real screenshots (optional) and re-deploy.
4. Submit sitemap to Google Search Console; test OG with a social debugger.
5. Verify every live URL still opens (Render-hosted apps may cold-start slowly).

## 13. Open items for the owner

- Confirm WatchWise stack details and add a date; its repo README is minimal.
- Add LangGraph to WhisperPDF's stack in `lib/data.ts` only if the project really uses it (the resume lists LangChain for it; LangGraph appears in your skills).
- Decide on a custom domain and a resume PDF download link.

## 14. v2 implementation status

Implemented in this workspace: the `/resume` route with print styling, URL-synced project category filters, a keyboard command palette, engineering notes based on supplied facts, a complete skills matrix, and data-file TODOs for owner-supplied details. Dynamic per-project OG images, theme switching, architecture diagrams, screenshot carousel, unit/E2E suites, Lighthouse CI, and measured Lighthouse/axe results remain unimplemented or unverified; do not present them as complete.
