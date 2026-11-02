import { ImageResponse } from "next/og";

export const alt = "Sneh Patel — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121210",
          color: "#ebe8e1",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, color: "#a19c93", letterSpacing: 4, textTransform: "uppercase" }}>
          Portfolio · 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>Sneh Patel</div>
          <div style={{ fontSize: 52, color: "#d0c3ae", marginTop: 20 }}>
            Full stack developer, shipping AI-powered products.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#a19c93" }}>Next.js · React · TypeScript · Node.js · LangChain</div>
      </div>
    ),
    size,
  );
}
