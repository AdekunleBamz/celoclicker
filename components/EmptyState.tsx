import { memo } from 'react'

/** Props for the EmptyState component. */
interface EmptyStateProps {
  /** Title for the empty state. */
  title: string
  /** Description text explaining why it is empty. */
  description: string
  /** Optional icon to display. */
  icon?: string
  /** Optional action to perform. */
  onAction?: () => void
  /** Optional label for the action button. */
  actionLabel?: string
}

/**
 * Component for displaying an empty state with an optional call to action.
 */
export const EmptyState = memo(function EmptyState({ 
  title, 
  description, 
  icon = '📭',
  onAction,
  actionLabel = 'Try Again'
}: EmptyStateProps) {
  return (
    <section 
      className="text-center py-12 px-6 border-2 border-dashed border-white/5 rounded-2xl" 
      aria-live="polite"
    >
      <div className="text-6xl mb-4 grayscale opacity-50" role="img" aria-hidden="true">{icon}</div>
      <h3 className="text-xl font-bold text-gray-300 mb-2 pixel-font">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all"
        >
          {actionLabel}
        </button>
      )}
    </section>
  )
})
