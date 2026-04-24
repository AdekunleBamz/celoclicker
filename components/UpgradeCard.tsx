import { memo } from 'react'
import { Card } from './UI'

/** Props for the UpgradeCard component. */
export interface UpgradeCardProps {
  /** Title of the upgrade. */
  title: string
  /** Current level of the upgrade. */
  currentLevel: string | number
  /** Cost of the next upgrade level. */
  cost: bigint
  /** Current player points. */
  points: bigint
  /** Tailwind color class for the title text. */
  color: string
  /** Callback function for the upgrade action. */
  onUpgrade: () => void
  /** Whether the upgrade button is disabled. */
  disabled?: boolean
  /** Whether the upgrade is currently being processed. */
  isLoading?: boolean
  /** Optional label shown on the upgrade button. */
  upgradeLabel?: string
  /** Optional callback for insufficient funds. */
  onInsufficientFunds?: () => void
}

/**
 * Card component for displaying and purchasing game upgrades.
 */
export const UpgradeCard = memo(function UpgradeCard({
  title,
  currentLevel,
  cost,
  points,
  color,
  onUpgrade,
  disabled = false,
  isLoading = false,
  upgradeLabel = 'UPGRADE',
  onInsufficientFunds,
}: UpgradeCardProps) {
  const canAfford = points >= cost && !disabled && !isLoading

  const handleClick = () => {
    if (canAfford) {
      onUpgrade()
    } else if (onInsufficientFunds && !disabled && !isLoading) {
      onInsufficientFunds()
    }
  }

  return (
    <Card className="flex flex-col gap-3" glass>
      <div className="flex justify-between items-start">
        <div>
          <div className={`font-bold ${color} pixel-font-small`}>{title}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">
            Level {currentLevel}
          </div>
        </div>
        <div className="text-right">
          <div className="text-celo-gold font-bold flex items-center justify-end gap-1">
            <span aria-hidden="true">⭐</span>
            {cost.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            points
          </div>
        </div>
      </div>
      
      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        type="button"
        aria-label={`Upgrade ${title} for ${cost.toLocaleString()} points`}
        className={`w-full py-2.5 rounded-lg font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-xs relative z-10 ${
          color === 'text-purple-400' ? 'bg-purple-500/50 hover:bg-purple-500 hover:glow-purple' :
          color === 'text-indigo-400' ? 'bg-indigo-500/50 hover:bg-indigo-500 hover:glow-purple' :
          'bg-pink-500/50 hover:bg-pink-500 hover:glow-purple'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            PROCESSING
          </span>
        ) : (
          upgradeLabel
        )}
      </button>
    </Card>
  )
})

UpgradeCard.displayName = 'UpgradeCard'
