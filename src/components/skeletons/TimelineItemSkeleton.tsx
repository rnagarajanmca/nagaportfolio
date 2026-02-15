'use client';

import { SkeletonLoader } from '../SkeletonLoader';

/**
 * TimelineItemSkeleton
 * Loading state for TimelineItem component
 */
export function TimelineItemSkeleton() {
  return (
    <article className="grid gap-6 border-l-2 border-border pl-8 pb-12">
      {/* Timeline dot */}
      <div className="absolute -left-3.5 top-0 h-5 w-5 rounded-full border-2 border-border bg-surface" />

      {/* Title and company */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" className="h-6 w-64" />
        <SkeletonLoader variant="text" className="h-4 w-48" />
      </div>

      {/* Date and location */}
      <div className="flex gap-4 text-sm">
        <SkeletonLoader variant="text" className="h-4 w-32" />
        <SkeletonLoader variant="text" className="h-4 w-32" />
      </div>

      {/* Bullet points */}
      <ul className="space-y-2">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex gap-3">
            <SkeletonLoader variant="circular" width="0.375rem" height="0.375rem" className="mt-1.5 flex-shrink-0" />
            <SkeletonLoader variant="text" className="h-4 w-full" />
          </li>
        ))}
      </ul>

      {/* Badges placeholder */}
      <div className="flex gap-2 flex-wrap">
        {[0, 1].map((i) => (
          <SkeletonLoader
            key={i}
            variant="rectangular"
            className="h-6 w-24 rounded-full"
          />
        ))}
      </div>
    </article>
  );
}
