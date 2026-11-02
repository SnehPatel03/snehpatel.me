export function TextReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // Keep the heading visible in the server render; the surrounding Reveal and
  // IntroEntrance components already animate these headings without clipping.
  return <span className={className}>{children}</span>;
}
