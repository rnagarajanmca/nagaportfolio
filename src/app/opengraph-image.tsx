import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const background = `radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.25), transparent 55%), radial-gradient(circle at 85% 80%, rgba(165, 180, 252, 0.2), transparent 50%), linear-gradient(140deg, #0b1323 0%, #111d33 45%, #1f2a44 100%)`;

const accentColor = "#38bdf8";
const mutedColor = "rgba(226, 232, 240, 0.7)";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          background,
          color: "#e2e8f0",
          fontFamily: "'Geist', 'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: mutedColor,
          }}
        >
          <span>Android Leadership</span>
          <span style={{ fontSize: "20px", letterSpacing: "0.25em" }}>nagarajanr.com</span>
        </header>

        <main
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            maxWidth: "820px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "8px",
                height: "72px",
                backgroundColor: accentColor,
                borderRadius: "999px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  fontSize: "18px",
                  color: mutedColor,
                }}
              >
                Nagarajan Ravikumar
              </span>
              <h1
                style={{
                  fontSize: "68px",
                  lineHeight: 1.1,
                  margin: 0,
                  color: "#f8fafc",
                  fontWeight: 600,
                }}
              >
                Engineering resilient Android experiences at scale.
              </h1>
            </div>
          </div>

          <p
            style={{
              fontSize: "30px",
              lineHeight: 1.35,
              margin: 0,
              color: mutedColor,
              maxWidth: "760px",
            }}
          >
            Senior Android engineer modernizing supply chains, retail checkout, and asset tracking platforms.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {["Wayfair Warehouse Modernization", "7-Eleven Checkout", "TrackX Asset Platform"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 20px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(15, 23, 42, 0.65)",
                    border: `1px solid rgba(56, 189, 248, 0.35)`,
                    fontSize: "22px",
                    color: "rgba(241, 245, 249, 0.85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: accentColor,
                      boxShadow: "0 0 10px rgba(56, 189, 248, 0.6)",
                    }}
                  />
                  {item}
                </div>
              ),
            )}
          </div>
        </main>

        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: mutedColor,
          }}
        >
          <span>Product Craft · Platform Reliability · Leadership</span>
          <span>Portfolio · 2025</span>
        </footer>
      </div>
    ),
    {
      ...size,
    }
  );
}
