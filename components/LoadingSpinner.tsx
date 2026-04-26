import { memo } from 'react'

/**
 * Reusable animated loading spinner component.
 */

/** Props for the LoadingSpinner component. */
export interface LoadingSpinnerProps {
  /** Visual size of the spinner (sm, md, lg, xl). */
  size?: 'sm' | 'md' | 'lg' | 'xl'
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
    xl: 'w-16 h-16',
  }

  return (
    <div
      aria-live="polite"
      role="status"
      className="inline-flex items-center justify-center"
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}
      />
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'
