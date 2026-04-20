import { useId } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: string
  /** Optional action node (e.g. a button) rendered below the description. */
  action?: React.ReactNode
}

export const EmptyState = ({ title, description, icon = '📭', action }: EmptyStateProps) => {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <div className="text-center py-12" role="status" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div aria-hidden="true" className="text-6xl mb-4">{icon}</div>
      <h3 id={titleId} className="text-xl font-bold text-gray-300 mb-2 pixel-font">{title}</h3>
      <p id={descriptionId} className="text-gray-500 text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'
