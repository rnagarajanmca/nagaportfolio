import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  density?: "default" | "compact";
  scrollMarginClass?: string;
  className?: string;
  fillViewport?: boolean;
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  density = "default",
  scrollMarginClass = "scroll-mt-20 sm:scroll-mt-28",
  className = "",
  fillViewport = false,
}: SectionWrapperProps) {
  const paddingClass = density === "compact" ? "py-8 sm:py-12" : "py-12 sm:py-18";
  const headingSpacingClass = density === "compact" ? "mb-5" : "mb-7";
  const contentSpacingClass = density === "compact" ? "space-y-4" : "space-y-5";
  const minHeightClass = fillViewport
    ? "min-h-[calc(100vh+5rem)] sm:min-h-[calc(100vh+7rem)]"
    : "";
  const snapClass = fillViewport ? "snap-start" : "";
  const sectionClasses = `${scrollMarginClass} ${paddingClass} ${minHeightClass} ${snapClass} ${className}`
    .replace(/\s+/g, " ")
    .trim();

  return (
    <section id={id} className={sectionClasses}>
      <div className={headingSpacingClass}>
        <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-base text-muted">{subtitle}</p>
        ) : null}
      </div>
      <div className={contentSpacingClass}>{children}</div>
    </section>
  );
}
