"use client";

export function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="chip min-h-11 hover:border-accent hover:text-accent">Print this page</button>;
}
