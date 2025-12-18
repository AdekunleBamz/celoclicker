interface EmptyStateProps {
  title: string
  description: string
  icon?: string
}

export function EmptyState({ title, description, icon = '📭' }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-300 mb-2 pixel-font">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}

