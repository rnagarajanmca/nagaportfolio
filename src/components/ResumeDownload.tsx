"use client";

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

const RESUME_ENDPOINT = "/resume.html";

export function ResumeDownload({ children, variant = "primary", className = "", ...props }: ResumeDownloadProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("Resume Download", {
        props: {
          source: window.location.pathname,
          referrer: document.referrer || "direct",
        },
      });
    }
  };

  return (
    <CTAButton
      href={RESUME_ENDPOINT}
      variant={variant}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </CTAButton>
  );
}
