import { memo } from 'react'
import { Card } from './UI'

/** Props for the StatCard component. */
export interface StatCardProps {
  /** Label for the statistic. */
  label: string
  /** The value to display. */
  value: string | number
  /** Tailwind color class for the value text. */
  valueColor?: string
  /** Optional icon to display next to the value. */
  icon?: string
  /** Optional additional CSS classes. */
  className?: string
}

/**
 * Reusable card for displaying player statistics.
 */
export const StatCard = memo(function StatCard({ 
  label, 
  value, 
  valueColor = 'text-purple-400', 
  icon,
  className = ''
}: StatCardProps) {
  return (
    <Card className={`p-3 transition-transform duration-200 hover:scale-[1.02] ${className}`.trim()} glass>
      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {icon && <span aria-hidden="true" className="text-lg">{icon}</span>}
        <div className={`text-xl font-bold ${valueColor}`}>{value}</div>
      </div>
    </Card>
  )
}
