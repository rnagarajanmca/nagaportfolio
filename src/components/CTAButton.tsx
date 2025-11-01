import type { AnchorHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function CTAButton({ children, className = "", variant = "primary", ...props }: CTAButtonProps) {
  const variantClassName =
    variant === "secondary"
      ? "border border-border bg-transparent text-foreground hover:bg-surface-strong hover:border-foreground/20"
      : "border border-border bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105";

  return (
    <a
      className={`group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium shadow-[var(--shadow-soft)] transition-all duration-300 ease-emphasized hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 ${variantClassName} ${className}`.trim()}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}
