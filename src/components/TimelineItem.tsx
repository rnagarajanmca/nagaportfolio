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
    <article className="relative pl-7 sm:pl-8">
      <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:h-3 sm:w-3" aria-hidden />
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h3>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted sm:text-sm sm:normal-case sm:tracking-normal">
            {subtitle}
          </p>
          <p className="text-xs text-muted sm:text-sm">{meta}</p>
        </div>
        <div className="space-y-2 text-sm text-muted sm:text-base">{children}</div>
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
