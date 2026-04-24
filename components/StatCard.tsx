import { memo } from 'react'
import { Card } from './UI'

/** Props for the StatCard component. */
interface StatCardProps {
  /** Label for the statistic. */
  label: string
  /** The value to display. */
  value: string | number
  /** Tailwind color class for the value text. */
  valueColor?: string
  /** Optional icon to display next to the value. */
  icon?: string
}

/**
 * Reusable card for displaying player statistics.
 */
export const StatCard = memo(function StatCard({ 
  label, 
  value, 
  valueColor = 'text-purple-400', 
  icon 
}: StatCardProps) {
  return (
    <Card className="p-3" glass>
      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-lg" aria-hidden="true">
            {icon}
          </span>
        )}
        <div 
          className={`text-xl font-bold ${valueColor} pixel-font-small`} 
          aria-label={`${label}: ${value}`}
        >
          {value}
        </div>
      </div>
    </Card>
  )
})

