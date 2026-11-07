export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  category: string;
  summary: string;
  role: string;
  highlights: string[];
  stack: string[];
  live?: string;
  repos: { label: string; href: string }[];
  featured: boolean;
  /** Optional real screenshot in /public (e.g. "/projects/opal.png"). Replaces the built-in mockup. */
  screenshot?: string;
  screenshotMobile?: string;
};

const gh = "https://github.com/SnehPatel03";
const projectOrder = ["opal", "whisperpdf", "quizsprint", "gurukul", "dropee", "watchwise", "bytebudget"];

export const projects: Project[] = ([
  {
    slug: "gurukul",
    name: "Gurukul",
    tagline: "One school platform across web and mobile.",
    period: "Aug 2026",
    category: "Education · Web + Mobile",
    summary:
      "A full-stack school operations project with a Next.js, Prisma and PostgreSQL backend, plus an Expo mobile companion for teacher and student workflows.",
    role: "Full-stack web and mobile product",
    highlights: [
      "Web application and API built with Next.js, Prisma and PostgreSQL.",
      "Expo Router mobile app aligned to Expo SDK 54.",
      "Teacher attendance and timetable workflows use the same backend API as the web app.",
      "Student, timetable, notification, document and staff screens consume backend endpoints.",
      "JWT sign-in with secure token storage using Expo Secure Store.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Expo", "React Native", "Expo Router", "JWT", "Expo Secure Store"],
    live: "https://gurukul-edu.vercel.app/",
    repos: [{ label: "Source", href: `${gh}/Gurukul-Application` }],
    screenshot: "/projects/gurukul.webp",
    screenshotMobile: "/projects/gurukul-mobile.webp",
    featured: true,
  },
  {
    slug: "opal",
    name: "OPAL",
    tagline: "Screen recording meets an AI video workspace.",
    period: "Aug – Oct 2026",
    category: "AI product · Desktop + Web",
    summary:
      "OPAL is an end-to-end screen-recording platform with two instances: an Electron desktop recorder and a Next.js web app where recordings become searchable, shareable workspace content.",
    role: "Solo — design, frontend, backend, desktop app, billing",
    highlights: [
      "Electron recorder with a three-panel UI and media configuration for screen selection and audio device selection.",
      "Web dashboard for every recording, with AI-generated titles, transcripts, RAG, workspaces, comments, trimming and sharing.",
      "Express.js REST APIs plus Socket.IO for real-time sync and notifications.",
      "Stripe Free/Pro billing backed by PostgreSQL on Neon.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "TanStack Query",
      "Electron",
      "Express.js",
      "Prisma ORM",
      "Neon",
      "Socket.IO",
      "Groq",
      "Stripe",
      "ImageKit",
      "Clerk",
    ],
    live: "https://opal-beige.vercel.app",
    screenshot: "/projects/opal.webp",
    screenshotMobile: "/projects/opal-mobile.webp",
    repos: [
      { label: "Web app", href: `${gh}/Opal` },
      { label: "Desktop recorder", href: `${gh}/Opal-Desktop` },
    ],
    featured: true,
  },
  {
    slug: "whisperpdf",
    name: "WhisperPDF",
    tagline: "Chat with your documents, with citations you can trust.",
    period: "Aug 2025",
    category: "AI product · RAG",
    summary:
      "WhisperPDF is a conversational PDF chatbot that answers questions from your own documents using retrieval-augmented generation, with page-level citations on every answer.",
    role: "Solo — RAG pipeline, queues, frontend, deployment",
    highlights: [
      "Designed and deployed a conversational PDF chatbot that answers from uploaded documents using RAG.",
      "Page-level citations make answers explainable and verifiable.",
      "Background task queues (BullMQ on Redis) keep ingestion off the request path.",
      "Efficient vector retrieval with Qdrant for fast, reliable answers.",
    ],
    stack: [
      "React.js",
      "TypeScript",
      "LangChain",
      "Gemini",
      "Qdrant",
      "Redis Stack",
      "BullMQ",
      "Clerk",
    ],
    live: "https://whisperpdf.onrender.com",
    screenshot: "/projects/whisperpdf.webp",
    repos: [{ label: "Source", href: `${gh}/WhisperPDF` }],
    featured: true,
  },
  {
    slug: "quizsprint",
    name: "QuizSprint",
    tagline: "Real-time, multi-round quizzes with elimination.",
    period: "Jan 2026",
    category: "Real-time app",
    summary:
      "QuizSprint is a multi-round, real-time quiz platform with automated qualification and elimination logic, instant results and an admin console for running events.",
    role: "Solo — full stack",
    highlights: [
      "Multi-round, real-time quiz flow with automated qualification and elimination.",
      "Round progression across three rounds with instant result evaluation and final winner determination.",
      "Admin-driven quiz management: question creation, difficulty configuration and quiz flow control.",
      "Secure authentication with email verification, protected routes and forgot-password recovery.",
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
    ],
    live: "https://quiz-sprint-client.vercel.app",
    screenshot: "/projects/quizsprint.webp",
    screenshotMobile: "/projects/quizsprint-mobile.webp",
    repos: [{ label: "Source", href: `${gh}/QuizSprint` }],
    featured: true,
  },
  {
    slug: "dropee",
    name: "Dropee",
    tagline: "A secure, Dropbox-style cloud storage app.",
    period: "Mar 2026",
    category: "Cloud storage",
    summary:
      "Dropee is a secure cloud storage platform with folder-based organisation, file previews and download management, built on Next.js and PostgreSQL.",
    role: "Solo — full stack",
    highlights: [
      "Folder-based file organisation with preview and download management.",
      "Customised authentication flow with protected routes and user-specific access control.",
      "Starred files, trash recovery and permanent deletion workflows.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Clerk",
      "ImageKit",
      "Tailwind CSS",
    ],
    live: "https://dropee-s3.vercel.app",
    screenshot: "/projects/dropee.webp",
    screenshotMobile: "/projects/dropee-mobile.webp",
    repos: [{ label: "Source", href: `${gh}/dropee` }],
    featured: true,
  },
  {
    slug: "watchwise",
    name: "WatchWise",
    tagline: "Find a film worth watching.",
    period: "Personal project",
    category: "AI · Movie discovery",
    summary:
      "WatchWise turns a viewer’s mood, up to three genres, preferred language, release era and optional note into a configurable set of movie recommendations.",
    role: "Full stack — React single-page app, Express API and AI recommendation flow",
    highlights: [
      "Collects a mood, one to three genres, a language and an era to shape each search.",
      "Lets viewers add an optional note with details such as tone or setting.",
      "Offers a choice of 5, 10, 15 or 20 recommendations at a time.",
      "Uses Google Gemini for movie picks and OMDb for posters, ratings, release dates and plot details.",
    ],
    stack: ["React", "Vite", "React Router", "Node.js", "Express.js", "Google Gemini", "OMDb", "Axios", "Tailwind CSS"],
    live: "https://watchwise-hq.onrender.com/",
    screenshotMobile: "/projects/watchwise-mobile.png",
    repos: [{ label: "Source", href: `${gh}/WatchWise` }],
    featured: false,
  },
  {
    slug: "bytebudget",
    name: "ByteBudget",
    tagline: "A clearer view of where your money goes.",
    period: "Personal project",
    category: "Finance · Full stack",
    summary:
      "A full-stack expense tracker for managing income and spending, setting income goals, and getting alerts when expenses reach configured limits.",
    role: "Personal full-stack project",
    highlights: [
      "Income and expense tracking in one dashboard.",
      "Income goals and expense-limit alerts.",
      "Charts for reviewing personal finance activity.",
      "Responsive interface backed by a MERN application stack.",
    ],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "Recharts", "React Router", "Tailwind CSS"],
    live: "https://expense-tracker-frontend-bmpg.onrender.com",
    screenshot: "/projects/bytebudget.webp",
    screenshotMobile: "/projects/bytebudget-mobile.webp",
    repos: [{ label: "Source", href: `${gh}/ByteBudget` }],
    featured: false,
  },
]).sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug));

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const services = [
  {
    n: "01",
    title: "Full-stack web apps",
    body: "Responsive, accessible interfaces and typed APIs, from schema design to deployment.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    n: "02",
    title: "AI & RAG products",
    body: "Retrieval pipelines, vector search and LLM features with citations users can verify.",
    tags: ["LangChain", "LangGraph", "Qdrant", "Gemini", "Groq"],
  },
  {
    n: "03",
    title: "Real-time systems",
    body: "Live sync, notifications and multi-user flows over WebSockets and background queues.",
    tags: ["Socket.IO", "Redis", "BullMQ", "Express.js"],
  },
  {
    n: "04",
    title: "Desktop & cloud apps",
    body: "Electron recorders, file storage and billing: the full product loop, not just a UI.",
    tags: ["Electron", "Stripe", "ImageKit", "Prisma", "Drizzle"],
  },
];

export const stats = [
  { value: "7", label: "Projects" },
  { value: "L&T", label: "Internship, 2026" },
  { value: "8.89", label: "CGPA / 10" },
  { value: "2027", label: "Graduating" },
];

export const experience = {
  role: "Full Stack Developer Intern",
  company: "Larsen & Toubro (L&T)",
  period: "July 2026",
  mode: "Remote",
  stack: ["React.js", "TypeScript", "ASP.NET / .NET", "REST APIs", "Git", "GitHub"],
  points: [
    "Developed responsive web applications with React.js, building reusable components and modern UI designs.",
    "Built and integrated secure REST APIs using ASP.NET / .NET for reliable client-server communication.",
    "Delivered full-stack features, aligning frontend and backend integration for consistent functionality.",
    "Collaborated through Git and GitHub for version control and coordinated development workflows.",
    "Took part in debugging, testing and fixing application issues to maintain code quality.",
  ],
};

export const education = {
  degree: "B.E. in Computer Engineering",
  school: "Gujarat Technological University — Surat, Gujarat",
  period: "Graduating 2027",
  cgpa: "8.89 / 10",
  coursework: [
    "Algorithm Analysis",
    "Data Science with Python",
    "Agentic AI",
    "Generative AI",
    "Web Development",
  ],
};

export const stackGroups = [
  { title: "Languages", items: ["C", "C++", "JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL", "PostgreSQL"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query", "GSAP", "Electron"] },
  { title: "Backend", items: ["Node.js", "Express.js", "ASP.NET / .NET", "Socket.IO", "Redis"] },
  { title: "Data", items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Drizzle ORM"] },
  { title: "AI", items: ["LangChain", "LangGraph", "Generative AI", "Agentic AI", "Gemini", "Groq", "Qdrant"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Cursor", "Jupyter", "Linux", "NumPy", "Pandas"] },
];

export const currently = {
  building: "TODO: owner to confirm current project",
  learning: "TODO: owner to confirm current learning focus",
};

export const engineeringNotes = [
  { project: "WhisperPDF", title: "Move ingestion off the request path", body: "BullMQ background queues handle PDF ingestion, while Qdrant provides vector retrieval for document questions." },
  { project: "OPAL", title: "Keep desktop and web in sync", body: "Socket.IO powers real-time synchronization and notifications across the recording workflow." },
  { project: "QuizSprint", title: "Make round progression explicit", body: "The quiz flow automates qualification and elimination across three rounds, with instant results and a final winner." },
];

export const ownerTodos = ["Confirm whether WhisperPDF uses LangGraph", "Choose the production domain", "Add resume PDF"];

export const marquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "LangChain",
  "LangGraph",
  "Electron",
  "Socket.IO",
  "Redis",
  "Prisma",
  "Tailwind",
];
