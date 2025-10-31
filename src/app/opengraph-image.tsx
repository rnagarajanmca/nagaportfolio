import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const background = `linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)`;

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background,
          color: "#e2e8f0",
          fontFamily: "'Geist', 'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "800px",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              fontSize: "20px",
              color: "rgba(241, 245, 249, 0.7)",
            }}
          >
            Nagarajan Ravikumar
          </span>
          <h1
            style={{
              fontSize: "70px",
              lineHeight: 1.1,
              margin: 0,
              color: "#f8fafc",
              fontWeight: 600,
            }}
          >
            Building resilient, human-centered product experiences.
          </h1>
          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              margin: 0,
              color: "rgba(241, 245, 249, 0.75)",
            }}
          >
            Product-focused full-stack engineer crafting design systems, DX tooling, and measurable outcomes.
          </p>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "rgba(241, 245, 249, 0.75)",
          }}
        >
          <span>nagarajan.dev</span>
          <span>Portfolio · 2025</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
