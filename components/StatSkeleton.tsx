import { memo } from 'react'

export const StatSkeleton = memo(function StatSkeleton() {
  return (
    <div className="bg-black/30 rounded-lg p-3 w-full">
      <div className="w-16 h-3 bg-gray-700/50 rounded mb-2 animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-700/50 rounded-full animate-pulse" />
        <div className="w-24 h-6 bg-gray-700/50 rounded animate-pulse" />
      </div>
    </div>
  )
})
