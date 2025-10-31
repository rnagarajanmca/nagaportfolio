import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { AnalyticsHints } from "@/components/AnalyticsHints";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Taylor · Portfolio",
  description:
    "Design-minded frontend engineer crafting resilient, accessible web experiences with Next.js and TypeScript.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Alex Taylor · Portfolio",
    description:
      "Design-minded frontend engineer crafting resilient, accessible web experiences with Next.js and TypeScript.",
    url: "https://example.com",
    siteName: "Alex Taylor Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alex Taylor Portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Taylor · Portfolio",
    description:
      "Design-minded frontend engineer crafting resilient, accessible web experiences with Next.js and TypeScript.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const themeInitScript = `(() => {
  try {
    const storageKey = "portfolio-theme";
    const stored = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    console.warn("Theme initialization failed", error);
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <AnalyticsHints />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}
