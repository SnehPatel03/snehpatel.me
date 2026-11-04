"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-line bg-transparent py-3 text-base text-fg placeholder:text-mute focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-line p-8">
        <p className="text-3xl font-semibold tracking-tight text-accent">Message sent <span aria-hidden="true">✦</span></p>
        <p className="mt-2 text-mute">Thanks — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="name" className="label">Name</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={4} className={field} placeholder="Tell me about the role or project" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="fill-hover rounded-full bg-accent px-7 py-3 font-medium text-black disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-mute">
          Couldn&apos;t send that. Email me directly at{" "}
          <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}
