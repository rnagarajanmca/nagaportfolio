'use client';

import { HTMLAttributes } from 'react';

interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  className?: string;
}

/**
 * Skeleton Loader Component
 * Displays a placeholder while content is loading
 * Uses animate-pulse for smooth loading animation
 */
export function SkeletonLoader({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-surface-strong';

  const variantClasses: Record<string, string> = {
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
  };

  const defaultDimensions: Record<string, { width: string; height: string }> = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '2.5rem', height: '2.5rem' },
    rectangular: { width: '100%', height: '12rem' },
  };

  const defaultDim = defaultDimensions[variant];
  const finalStyle = {
    width: width || defaultDim.width,
    height: height || defaultDim.height,
    ...style,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={finalStyle}
      {...props}
    />
  );
}
