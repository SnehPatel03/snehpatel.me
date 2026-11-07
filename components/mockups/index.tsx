import Image from "next/image";
import type { Project } from "@/lib/data";

/** Optional browser chrome wrapper for standalone project previews. */
export function BrowserFrame({ url, children, label = "Live project" }: { url: string; children: React.ReactNode; label?: string }) {
  return (
    <div className="project-frame overflow-hidden rounded-[1.15rem] border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line/80 bg-[#191816] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block size-2 rounded-full bg-fg/35" />
          <i className="block size-2 rounded-full bg-fg/50" />
          <i className="block size-2 rounded-full bg-fg/70" />
        </span>
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md border border-line/70 bg-bg/70 px-3 py-1.5 font-mono text-[10px] text-mute">{url}</span>
        <span className="label ml-2 hidden text-[9px] text-fg/70 sm:block">{label}</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden bg-bg">{children}</div>
    </div>
  );
}

const bar = "rounded bg-line";

function OpalMock() {
  return (
    <div className="flex h-full" aria-hidden="true">
      <div className="hidden w-[17%] shrink-0 flex-col gap-2 border-r border-line p-3 sm:flex">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-accent" />
          <span className="font-mono text-[9px] text-fg">opal</span>
        </div>
        {["Home", "Library", "Workspaces", "Billing"].map((t, i) => (
          <div key={t} className={`rounded px-2 py-1 text-[9px] ${i === 1 ? "bg-line text-fg" : "text-mute"}`}>{t}</div>
        ))}
      </div>
      <div className="flex-1 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-medium text-fg sm:text-xs">All recordings</span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[8px] font-medium text-black sm:text-[9px]">● Record</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="overflow-hidden rounded-md border border-line">
              <div className="relative aspect-video bg-gradient-to-br from-[#1b1b1f] to-[#101012]">
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 font-mono text-[7px] text-fg">0{i + 1}:2{i}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line"><span className="block h-full bg-accent" style={{ width: `${30 + i * 10}%` }} /></span>
              </div>
              <div className="space-y-1 p-1.5">
                <div className={`${bar} h-1.5 w-4/5`} />
                <div className={`${bar} h-1 w-2/5 opacity-60`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden w-[26%] shrink-0 border-l border-line p-3 md:block">
        <p className="mb-2 font-mono text-[8px] uppercase tracking-widest text-accent">AI summary</p>
        {[90, 100, 75, 95, 60].map((w, i) => (
          <div key={i} className={`${bar} mb-1.5 h-1.5`} style={{ width: `${w}%` }} />
        ))}
        <p className="mb-2 mt-4 font-mono text-[8px] uppercase tracking-widest text-mute">Transcript</p>
        {[80, 95, 70].map((w, i) => (
          <div key={i} className="mb-1.5 flex gap-1.5">
            <span className="font-mono text-[7px] text-mute">0:{i}4</span>
            <div className={`${bar} h-1.5 opacity-70`} style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WhisperMock() {
  return (
    <div className="grid h-full grid-cols-2" aria-hidden="true">
      <div className="border-r border-line p-3 sm:p-4">
        <div className="mx-auto h-full max-w-[85%] rounded-sm bg-[#16161a] p-3">
          <div className={`${bar} mb-3 h-2 w-2/3 bg-[#2a2a2f]`} />
          {[100, 95, 100, 80, 100, 90, 100, 60].map((w, i) => (
            <div key={i} className={`mb-1.5 h-1 rounded bg-[#26262b] ${i === 3 || i === 4 ? "bg-accent/40" : ""}`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end gap-2 p-3 sm:p-4">
        <div className="ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-line px-2.5 py-1.5 text-[8px] text-fg sm:text-[10px]">What does the paper conclude?</div>
        <div className="max-w-[90%] space-y-1.5 rounded-lg rounded-bl-sm border border-line px-2.5 py-2">
          {[100, 92, 70].map((w, i) => (
            <div key={i} className={`${bar} h-1.5`} style={{ width: `${w}%` }} />
          ))}
          <div className="flex gap-1 pt-1">
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[7px] text-accent">p. 12</span>
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[7px] text-accent">p. 14</span>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between rounded-full border border-line px-3 py-1.5 text-[8px] text-mute sm:text-[10px]">
          Ask anything about your PDF… <span className="text-accent">↑</span>
        </div>
      </div>
    </div>
  );
}

function QuizMock() {
  return (
    <div className="flex h-full flex-col p-3 sm:p-5" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {["Round 1", "Round 2", "Final"].map((r, i) => (
            <span key={r} className={`rounded-full px-2 py-0.5 text-[8px] sm:text-[9px] ${i === 1 ? "bg-accent font-medium text-black" : "border border-line text-mute"}`}>{r}</span>
          ))}
        </div>
        <span className="font-mono text-[10px] text-accent sm:text-xs">00:14</span>
      </div>
      <div className="mb-3 h-1 overflow-hidden rounded bg-line"><div className="h-full w-[55%] bg-accent" /></div>
      <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-3">
        <div className="flex flex-col gap-2">
          <div className="rounded-lg border border-line p-3">
            <div className={`${bar} mb-1.5 h-2 w-11/12`} />
            <div className={`${bar} h-2 w-2/3`} />
          </div>
          {["A", "B", "C", "D"].map((o, i) => (
            <div key={o} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${i === 2 ? "border-accent bg-accent/10" : "border-line"}`}>
              <span className="font-mono text-[9px] text-mute">{o}</span>
              <div className={`${bar} h-1.5 flex-1 opacity-70`} style={{ maxWidth: `${60 + i * 8}%` }} />
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-line p-3">
          <p className="mb-2 font-mono text-[8px] uppercase tracking-widest text-mute">Qualified</p>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-1.5 flex items-center gap-1.5">
              <span className="font-mono text-[8px] text-mute">{i + 1}</span>
              <div className={`${bar} h-1.5`} style={{ width: `${90 - i * 14}%`, background: i === 0 ? "var(--color-accent)" : undefined }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DropeeMock() {
  return (
    <div className="flex h-full" aria-hidden="true">
      <div className="hidden w-[20%] shrink-0 flex-col gap-1.5 border-r border-line p-3 sm:flex">
        <span className="mb-2 font-mono text-[10px] text-fg">dropee</span>
        {["My files", "Starred", "Trash"].map((t, i) => (
          <div key={t} className={`rounded px-2 py-1 text-[9px] ${i === 0 ? "bg-line text-fg" : "text-mute"}`}>{t}</div>
        ))}
        <div className="mt-auto">
          <div className="h-1 overflow-hidden rounded bg-line"><div className="h-full w-2/5 bg-accent" /></div>
          <p className="mt-1 font-mono text-[7px] text-mute">Storage</p>
        </div>
      </div>
      <div className="flex-1 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] text-fg sm:text-xs">My files / Projects</span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[8px] font-medium text-black sm:text-[9px]">+ Upload</span>
        </div>
        <div className="mb-3 grid grid-cols-4 gap-2">
          {["Docs", "Images", "Work", "Misc"].map((f) => (
            <div key={f} className="flex items-center gap-1.5 rounded-md border border-line px-2 py-1.5">
              <span className="size-3 rounded-sm bg-accent/70" />
              <span className="text-[8px] text-fg sm:text-[9px]">{f}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="overflow-hidden rounded-md border border-line">
              <div className={`aspect-[4/3] ${i % 3 === 0 ? "bg-gradient-to-br from-[#222a14] to-[#101012]" : "bg-gradient-to-br from-[#1b1b1f] to-[#101012]"}`} />
              <div className="p-1.5">
                <div className={`${bar} h-1 w-4/5`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WatchMock() {
  return (
    <div className="flex h-full flex-col bg-[#10100e] px-4 py-3 sm:px-7 sm:py-5" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-[9px] font-semibold text-fg sm:text-xs">
          Watch<span className="text-accent">Wise</span>
        </span>
        <span className="rounded-md border border-accent/50 px-2 py-1 text-[7px] text-accent sm:text-[9px]">Find a movie</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="mb-2 font-mono text-[7px] font-semibold tracking-[.2em] text-accent sm:text-[9px]">MOVIE NIGHT, SORTED</p>
        <h2 className="max-w-[12em] text-center text-lg font-bold leading-tight tracking-[-.05em] text-fg sm:text-4xl">
          Find a film <span className="text-accent">worth watching.</span>
        </h2>
        <p className="mt-2 max-w-md text-center text-[8px] leading-relaxed text-fg/60 sm:mt-3 sm:text-sm">
          Tell us what you&apos;re in the mood for. We&apos;ll find a few good matches.
        </p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-[8px] font-semibold text-black sm:mt-5 sm:px-4 sm:py-2 sm:text-[10px]">
          Find my movie <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  );
}

const mocks: Record<string, () => React.JSX.Element> = {
  opal: OpalMock,
  whisperpdf: WhisperMock,
  quizsprint: QuizMock,
  dropee: DropeeMock,
  watchwise: WatchMock,
};

/** Project preview: a real screenshot if `project.screenshot` is set, otherwise the built-in UI mockup. */
export function ProjectMockup({ project, presentation = "browser" }: { project: Project; presentation?: "browser" | "showcase" }) {
  const Mock = mocks[project.slug];
  const host = project.live?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? `${project.name} · Web + Mobile`;
  const hasMobilePreview = Boolean(project.screenshotMobile);
  const preview = project.screenshot ? (
    <Image src={project.screenshot} alt={`${project.name} desktop interface preview`} width={1600} height={1000} className="h-full w-full object-cover object-top" />
  ) : Mock ? <Mock /> : null;
  return (
    <div role="img" aria-label={`${project.name} app preview`}>
      <div className={`relative ${presentation === "showcase" ? "project-showcase-canvas" : ""}`}>
        {presentation === "browser" ? (
          <BrowserFrame url={host} label={project.screenshot ? "Live project" : "Interface preview"}>{preview}</BrowserFrame>
        ) : (
          <>
            <div className={hasMobilePreview ? "project-showcase-desktop" : ""}>
              <div className="project-showcase-screen aspect-[16/10] overflow-hidden rounded-md bg-bg">{preview}</div>
              <span className="project-view-label">DESKTOP VIEW</span>
            </div>
            {project.screenshotMobile && <div className="project-showcase-mobile">
              <div className="project-device-frame relative aspect-[9/19] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#11110f] p-1.5 shadow-2xl">
                <Image src={project.screenshotMobile} alt={`${project.name} mobile interface preview`} width={390} height={844} className="h-full w-full rounded-[.9rem] object-cover object-top" />
                <span className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-black/65" aria-hidden="true" />
              </div>
              <span className="project-view-label">MOBILE VIEW</span>
            </div>}
            {project.screenshotMobile && <div className="project-showcase-mobile-small mx-auto w-[min(68%,16rem)]">
              <div className="project-device-frame relative aspect-[9/19] overflow-hidden rounded-[1.55rem] border border-white/15 bg-[#11110f] p-1.5 shadow-2xl">
                <Image src={project.screenshotMobile} alt={`${project.name} mobile interface preview`} width={390} height={844} className="h-full w-full rounded-[1.2rem] object-cover object-top" />
                <span className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-black/65" aria-hidden="true" />
              </div>
              <span className="project-view-label">MOBILE EXPERIENCE</span>
            </div>}
          </>
        )}
      </div>
    </div>
  );
}
