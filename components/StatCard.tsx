interface StatCardProps {
  label: string
  value: string | number
  valueColor?: string
  icon?: string
  /** Optional secondary description shown below the main value. */
  description?: string
}

export const StatCard = ({ label, value, valueColor = 'text-purple-400', icon, description }: StatCardProps) => {
  return (
    <div className="bg-black/30 rounded-lg p-3">
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {icon && <span aria-hidden="true" className="text-lg">{icon}</span>}
        <div className={`text-xl font-bold ${valueColor}`}>{value}</div>
      </div>
      {description && <div className="text-gray-500 text-xs mt-1">{description}</div>}
    </div>
  )
}

StatCard.displayName = 'StatCard'
