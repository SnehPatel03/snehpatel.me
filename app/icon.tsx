import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#101011",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 512 512" fill="none">
          <path
            d="M444 78H302c-24 0-47 7-68 20L137 159c-46 28-46 85 0 113 22 14 50 14 73 0l100-59c44-26 99-13 124 29 24 41 11 94-30 119l-98 59c-21 13-45 19-69 19H68"
            stroke="#F2F2EF"
            strokeWidth="88"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
