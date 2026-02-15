'use client';

import { SkeletonLoader } from '../SkeletonLoader';

/**
 * ProjectCardSkeleton
 * Loading state for ProjectCard component
 */
export function ProjectCardSkeleton() {
  return (
    <article className="space-y-4 rounded-3xl border border-border bg-surface p-6">
      {/* Image placeholder */}
      <SkeletonLoader variant="rectangular" height="12rem" className="rounded-2xl" />

      {/* Title placeholder */}
      <SkeletonLoader variant="text" className="h-6 w-3/4" />

      {/* Description placeholders */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" className="h-4 w-full" />
        <SkeletonLoader variant="text" className="h-4 w-5/6" />
      </div>

      {/* Tags placeholders */}
      <div className="flex gap-2 flex-wrap">
        {[0, 1, 2].map((i) => (
          <SkeletonLoader
            key={i}
            variant="rectangular"
            className="h-6 w-20 rounded-full"
          />
        ))}
      </div>

      {/* Links placeholders */}
      <div className="flex gap-4">
        {[0, 1].map((i) => (
          <SkeletonLoader
            key={i}
            variant="rectangular"
            className="h-8 w-24 rounded-lg"
          />
        ))}
      </div>
    </article>
  );
}
