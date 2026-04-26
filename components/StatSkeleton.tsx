import { memo } from 'react'

/** Props for the StatSkeleton component. */
export interface StatSkeletonProps {
  /** Number of skeleton cards to render (default: 1). */
  count?: number
  /** Optional additional CSS classes. */
  className?: string
}

export const StatSkeleton = memo(function StatSkeleton({ 
  count = 1,
  className = ''
}: StatSkeletonProps) {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0

  return (
    <div
      className={`space-y-3 w-full ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy={safeCount > 0}
      aria-label="Loading statistics"
    >
      {Array.from({ length: safeCount }).map((_, i) => (
        <div key={i} className="bg-black/30 rounded-lg p-3 w-full" aria-hidden="true">
          <div className="w-16 h-3 bg-gray-700/50 rounded mb-2 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-700/50 rounded-full animate-pulse" />
            <div className="w-24 h-6 bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
})

StatSkeleton.displayName = 'StatSkeleton'
