"use client";

export function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="fill-hover chip min-h-11">Print this page</button>;
}
