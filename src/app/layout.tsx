import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { AnalyticsHints } from "@/components/AnalyticsHints";
import { ThemeProvider } from "../components/ThemeProvider";
// Validate content on build/startup
import "@/content/validate";

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
  title: "Nagarajan Ravikumar · Portfolio",
  description:
    "Senior Android engineer modernizing supply chains, retail checkout, and asset tracking platforms.",
  metadataBase: new URL("https://nagarajanr.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nagarajan Ravikumar · Portfolio",
    description:
      "Senior Android engineer modernizing supply chains, retail checkout, and asset tracking platforms.",
    url: "https://nagarajanr.com",
    siteName: "Nagarajan Ravikumar · Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nagarajan Ravikumar Portfolio preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagarajan Ravikumar · Portfolio",
    description:
      "Senior Android engineer modernizing supply chains, retail checkout, and asset tracking platforms.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AnalyticsHints />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <PlausibleAnalytics />
        <Analytics />
        <SpeedInsights />
        <ErrorBoundary>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
