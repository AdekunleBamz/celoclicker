import { memo } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: string
}

export const EmptyState = memo(function EmptyState({ title, description, icon = '📭' }: EmptyStateProps) {
  return (
    <section className="text-center py-12" aria-live="polite">
      <div className="text-6xl mb-4" role="img" aria-hidden="true">{icon}</div>
      <h3 className="text-xl font-bold text-gray-300 mb-2 pixel-font">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </section>
  )
})

