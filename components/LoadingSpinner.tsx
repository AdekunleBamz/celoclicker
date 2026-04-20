export const LoadingSpinner = ({ size = 'md', label = 'Loading' }: { size?: 'sm' | 'md' | 'lg'; label?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  } as const

  return (
    <div
      aria-label={label}
      role="status"
      className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}
    />
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'
