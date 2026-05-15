import type { AnchorHTMLAttributes, ReactNode } from "react";
import { CTAButton } from "./CTAButton";

interface ResumeDownloadProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

const RESUME_ENDPOINT = "/resume.html";

export function ResumeDownload({ children, variant = "primary", className = "", ...props }: ResumeDownloadProps) {
  return (
    <CTAButton
      href={RESUME_ENDPOINT}
      variant={variant}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} plausible-event-name=Resume+Download`.trim()}
      {...props}
    >
      {children}
    </CTAButton>
  );
}
