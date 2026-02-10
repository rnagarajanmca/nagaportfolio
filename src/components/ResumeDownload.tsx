"use client";

import { useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { CTAButton } from "./CTAButton";

interface ResumeDownloadProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

const RESUME_ENDPOINT = "/api/resume";
const RESUME_FILENAME = "Nagarajan Ravikumar.pdf";

export function ResumeDownload({ children, variant = "primary", className = "", ...props }: ResumeDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);

    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("Resume Download", {
        props: {
          source: window.location.pathname,
          referrer: document.referrer || "direct",
        },
      });
    }

    try {
      await triggerResumeDownload();
    } catch (error) {
      console.error("Resume download failed", error);
      window.alert?.("Unable to download resume right now. Please try again in a moment.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <CTAButton
      href={RESUME_ENDPOINT}
      variant={variant}
      download
      onClick={handleClick}
      aria-busy={isDownloading}
      aria-disabled={isDownloading}
      className={`${className} ${isDownloading ? "cursor-wait opacity-80" : ""}`.trim()}
      {...props}
    >
      <span aria-live="polite" aria-atomic="true">
        {isDownloading ? "Preparing download…" : children}
      </span>
    </CTAButton>
  );
}

async function triggerResumeDownload() {
  const response = await fetch(RESUME_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Resume download failed: ${response.status}`);
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(blobUrl);
}

