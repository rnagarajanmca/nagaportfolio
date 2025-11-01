"use client";

import type { ReactNode } from "react";
import { CTAButton } from "./CTAButton";
import type { AnchorHTMLAttributes } from "react";

interface ResumeDownloadProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function ResumeDownload({ children, variant = "primary", ...props }: ResumeDownloadProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track download event with Plausible
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("Resume Download", {
        props: {
          source: window.location.pathname,
          referrer: document.referrer || "direct",
        },
      });
    }
    // Allow default behavior to proceed
  };

  return (
    <CTAButton href="/api/resume" variant={variant} download onClick={handleClick} {...props}>
      {children}
    </CTAButton>
  );
}

