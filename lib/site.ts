export const site = {
  name: "Sneh Patel",
  title: "Sneh Patel — Full Stack Developer",
  tagline: "Full stack developer, shipping AI-powered products.",
  heroIntro: "I build conversational AI tools, real-time applications and secure full-stack platforms.",
  description:
    "Full stack developer skilled in React.js, Next.js, TypeScript, Express.js, PostgreSQL and LangChain-based AI applications. Builds conversational AI tools, real-time applications and secure full-stack platforms with authentication, database optimisation and modern UI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://snehpatel.dev").replace(
    /\/$/,
    "",
  ),
  email: "snehpatel1233@gmail.com",
  github: "https://github.com/SnehPatel03",
  linkedin: "https://www.linkedin.com/in/sneh-patel-ab6302213",
  location: "Surat, Gujarat, India",
  keywords: [
    "Sneh Patel",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "LangChain",
    "RAG",
    "Portfolio",
    "Surat",
  ],
} as const;
