import { ImageResponse } from "next/og";

export const openGraphSize = { width: 1200, height: 630 };

export function createOpenGraphImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f2f2ef",
          background:
            "radial-gradient(ellipse at 85% 15%, rgba(208,195,174,.18), transparent 42%), #080809",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#d0c3ae",
            }}
          />
          <div style={{ color: "#aaa69f", fontSize: 24, letterSpacing: 4 }}>
            {eyebrow.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            {title}
          </div>
          <div style={{ maxWidth: 980, color: "#d0c3ae", fontSize: 34, lineHeight: 1.25 }}>
            {description}
          </div>
        </div>
        <div style={{ color: "#aaa69f", fontSize: 24 }}>Sneh Patel · Surat, India</div>
      </div>
    ),
    openGraphSize,
  );
}
