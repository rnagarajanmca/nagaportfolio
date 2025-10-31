import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SectionWrapper({ id, title, subtitle, children }: SectionWrapperProps) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-base text-muted">{subtitle}</p>
        ) : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
