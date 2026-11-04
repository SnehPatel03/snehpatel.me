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
          <path d="M64 308c0-112 91-203 203-203h181v92h-89c-57 0-103 46-103 103H64Z" fill="#EEEAE4" />
          <path d="M64 407h89c57 0 103-46 103-103h192c0 112-91 203-203 203H64v-100Z" fill="#EEEAE4" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
