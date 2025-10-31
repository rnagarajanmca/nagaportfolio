import type { ReactNode } from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  meta: string;
  badges?: string[];
  children: ReactNode;
}

export function TimelineItem({ title, subtitle, meta, badges = [], children }: TimelineItemProps) {
  return (
    <article className="relative pl-8">
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-accent bg-background" aria-hidden />
      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm font-medium text-muted">{subtitle}</p>
          <p className="text-sm text-muted">{meta}</p>
        </div>
        <div className="space-y-2 text-base text-muted">{children}</div>
        {badges.length ? (
          <ul className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {badge}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
