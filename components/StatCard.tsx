interface StatCardProps {
  label: string
  value: string | number
  valueColor?: string
  icon?: string
}

export function StatCard({ label, value, valueColor = 'text-purple-400', icon }: StatCardProps) {
  return (
    <div className="bg-black/30 rounded-lg p-3">
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <div className={`text-xl font-bold ${valueColor}`}>{value}</div>
      </div>
    </div>
  )
}

