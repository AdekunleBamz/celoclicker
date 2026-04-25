import { memo } from 'react'

/**
 * Reusable animated loading spinner component.
 */

/** Props for the LoadingSpinner component. */
export interface LoadingSpinnerProps {
  /** Visual size of the spinner (sm, md, lg). */
  size?: 'sm' | 'md' | 'lg'
  /** Accessibility label for screen readers. */
  label?: string
}

export const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'md',
  label = 'Loading'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div 
      className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
      aria-label={label}
      aria-busy="true"
    />
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'
