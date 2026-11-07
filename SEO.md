# SEO implementation

Canonical origin: `https://snehpatel.me` (HTTPS, no `www`, no trailing slash).

## Page-to-keyword map and metadata

The root title is the exact home title. Other titles are rendered with the layout template `| Sneh Patel`.

| Page | Primary intent | Rendered title | Meta description |
|---|---|---|---|
| `/` | Sneh Patel, full stack developer in Surat | Sneh Patel \| Full Stack Developer in Surat, Gujarat | Sneh Patel is a full stack developer in Surat, India, building AI products and web platforms with React, Next.js, TypeScript and PostgreSQL. Explore his work. |
| `/about` | Sneh Patel biography | About Sneh Patel: Full Stack Developer \| Sneh Patel | Meet Sneh Patel, a full stack developer in Surat and GTU Computer Engineering student. Explore his L&T experience and AI, web and real-time products. |
| `/projects` | AI and full stack project portfolio | AI & Full Stack Projects by Sneh Patel \| Sneh Patel | Explore full-stack and AI projects by Sneh Patel, from document chat and quizzes to an AI video workspace. Review technologies, case studies and source code. |
| `/projects/gurukul` | Gurukul school platform case study | Gurukul: Web & Mobile School Platform \| Sneh Patel | Explore Gurukul, Sneh Patel’s web and mobile school platform built with Next.js, PostgreSQL and Expo. See teacher and student workflows, stack and source. |
| `/projects/opal` | OPAL screen-recording and AI workspace case study | OPAL: AI Screen Recording Workspace Project \| Sneh Patel | Explore OPAL, a screen-recording and AI video workspace by Sneh Patel. See how the Electron recorder, Next.js app, real-time sync and billing fit together. |
| `/projects/whisperpdf` | WhisperPDF PDF chatbot case study | WhisperPDF: LangChain PDF Chatbot Project \| Sneh Patel | Explore WhisperPDF, Sneh Patel’s LangChain PDF chatbot with RAG, page-level citations and queued ingestion. Review its Qdrant stack, live app and source. |
| `/projects/quizsprint` | QuizSprint real-time quiz case study | QuizSprint: Real-Time Quiz App Project \| Sneh Patel | Explore QuizSprint, Sneh Patel’s quiz app with real-time play, three-round qualification, instant results and admin controls. See technologies and source code. |
| `/projects/dropee` | Dropee cloud-storage case study | Dropee: Full-Stack Cloud Storage Project \| Sneh Patel | Explore Dropee, Sneh Patel’s Dropbox-style cloud storage app with folders, previews and recovery workflows. Review its Next.js stack, live site and source code. |
| `/projects/watchwise` | WatchWise AI recommendation case study | WatchWise: AI Movie Recommendation App \| Sneh Patel | Explore WatchWise, Sneh Patel’s AI movie recommender built with React, Express, Gemini and OMDb. See the recommendation flow, stack, live demo and source. |
| `/projects/bytebudget` | ByteBudget expense-tracker case study | ByteBudget: Expense Tracker App Project \| Sneh Patel | Explore ByteBudget, Sneh Patel’s expense tracker for income, spending, goals and limit alerts. Review its MERN stack, project details, live app and source code. |
| `/contact` | Contact Sneh Patel about roles and collaboration | Contact Sneh Patel, Full Stack Developer \| Sneh Patel | Contact Sneh Patel, a full stack developer in Surat, India, about AI Engineer or full-stack roles and product collaborations. Send a message or email directly. |
| `/resume` | Sneh Patel downloadable developer resume | Sneh Patel Resume: Full Stack Developer \| Sneh Patel | View and download Sneh Patel’s resume, with full stack developer experience, Computer Engineering education at GTU, technical skills and selected project work. |

The custom 404 page is `noindex,follow`; it is not an indexable landing page. Blog/notes remains omitted because there are no authored posts to publish.

## Structured data inventory

- Every page receives the visible site-wide `Person` and `WebSite` entities.
- `/about` adds `ProfilePage` with its `mainEntity` referencing the site-wide Person.
- `/projects` adds an `ItemList` containing the visible project links.
- Each `/projects/[slug]` page adds `SoftwareSourceCode` using its visible project details, repository URLs, known programming languages, author, screenshot and case-study update date.
- `/about`, `/projects`, `/contact`, `/resume`, and every project case study render visible breadcrumbs and `BreadcrumbList` JSON-LD.
- No review, rating, FAQ, or blog schema is generated. A personal portrait is not present, so the Person entity does not claim an image.

## Technical and webmaster setup

- `app/robots.ts` allows public crawling and disallows `/api/`; `app/sitemap.ts` lists all canonical indexable pages.
- Every indexable route has a canonical, unique title/description, Open Graph and large-image Twitter metadata.
- Route-specific Open Graph images are generated for About, Projects, Contact, Resume, and each project; the Home route has its own image.
- Google/Bing verification metadata is emitted only when deployment variables are configured:
  - `GOOGLE_SITE_VERIFICATION`
  - `BING_SITE_VERIFICATION`
- GA4 is selected and its code is deferred until `lazyOnload`. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the real `G-...` measurement ID to enable it. Tracked events: page views, contact links/form success, resume clicks/downloads, and project/case-study links. Google Signals and ad personalization are disabled.
- Submit `https://snehpatel.me/sitemap.xml` in Google Search Console and Bing Webmaster Tools after domain ownership is verified.
- The site does not include an IndexNow key or deployment hook; add those only after choosing and storing a real key.
- Static assets use Next.js production asset handling. CDN selection, DNS aliases, TLS termination and canonical-domain settings must also be confirmed in the hosting provider.
- Review consent and privacy-notice requirements for GA4 based on the site’s audience and applicable jurisdictions before deployment.

## Off-page checklist (manual)

- [ ] Complete the GitHub profile README and link it to `https://snehpatel.me`.
- [ ] Update LinkedIn with the same name, bio, role focus and portfolio URL.
- [ ] Create or update Dev.to or Hashnode, Medium, Product Hunt and Peerlist profiles with consistent name, bio and site URL.
- [ ] Publish 2–4 original technical write-ups based on completed work (for example, the WhisperPDF RAG pipeline or OPAL desktop/web synchronization) and link each to its case study.
- [ ] Add `https://snehpatel.me` to the About field and README of each relevant GitHub repository.
- [ ] Do not buy links or use link farms or private blog networks.
