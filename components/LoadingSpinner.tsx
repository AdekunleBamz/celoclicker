import { memo } from 'react'

/**
 * Reusable animated loading spinner component.
 * 
 * @param size - Visual size of the spinner (sm, md, lg).
 * @param label - Accessibility label for screen readers.
 */
export const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'md',
  label = 'Loading'
}: { 
  size?: 'sm' | 'md' | 'lg',
  label?: string
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div 
      className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}
      role="status"
      aria-label={label}
    />
  )
})

