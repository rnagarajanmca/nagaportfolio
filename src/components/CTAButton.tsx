import type { AnchorHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function CTAButton({ children, className = "", variant = "primary", ...props }: CTAButtonProps) {
  const variantClassName =
    variant === "secondary"
      ? "border border-border bg-transparent text-foreground hover:bg-surface-strong"
      : "border border-border bg-accent text-accent-foreground hover:bg-accent/90";

  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${variantClassName} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
