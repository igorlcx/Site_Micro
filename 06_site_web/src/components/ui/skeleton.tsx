/**
 * @file skeleton.tsx
 * @description Animated skeleton loading placeholder
 */
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md', className)}
      style={{ background: 'var(--bg-card)' }}
    />
  );
}
