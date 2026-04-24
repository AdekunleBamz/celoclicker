import { memo } from 'react'
import { Card } from './UI'

interface StatCardProps {
  label: string
  value: string | number
  valueColor?: string
  icon?: string
}

export const StatCard = memo(function StatCard({ label, value, valueColor = 'text-purple-400', icon }: StatCardProps) {
  return (
    <Card className="p-3">
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-lg" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className={`text-xl font-bold ${valueColor}`} aria-label={`${label} is ${value}`}>{value}</div>
      </div>
    </Card>
  )
})

