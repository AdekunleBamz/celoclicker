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
  /** Additional CSS classes. */
  className?: string
}

/** Returns the button label for the upgrade action based on loading state. */
export function getUpgradeActionLabel(isLoading: boolean, label: string): string {
  return isLoading ? 'PROCESSING' : label
}

/** Normalizes the level text to avoid duplicated "Level" prefixes. */
export function formatUpgradeLevelText(level: string | number): string {
  const levelText = String(level).trim()
  return /^level\s+/i.test(levelText) ? levelText : `Level ${levelText}`
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
  className = '',
}: UpgradeCardProps) {
  const canAfford = points >= cost && !disabled && !isLoading
  const missingPoints = points >= cost ? 0n : cost - points
  const isLocked = !canAfford && !disabled && !isLoading

  const handleClick = () => {
    if (canAfford) {
      onUpgrade()
    } else if (onInsufficientFunds && !disabled && !isLoading) {
      onInsufficientFunds()
    }
  }

  return (
    <Card className={`flex flex-col gap-3 ${className}`.trim()} glass>
      <div className="flex justify-between items-start">
        <div>
          <div className={`font-bold ${color} pixel-font-small`}>{title}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">
            {formatUpgradeLevelText(currentLevel)}
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
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading ? 'true' : undefined}
        className={`focus-ring-game w-full py-2.5 rounded-lg font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-xs relative z-10 ${
          color === 'text-purple-400' ? (isLocked ? 'bg-purple-500/30 text-gray-200' : 'bg-purple-500/50 hover:bg-purple-500 hover:glow-purple') :
          color === 'text-indigo-400' ? (isLocked ? 'bg-indigo-500/30 text-gray-200' : 'bg-indigo-500/50 hover:bg-indigo-500 hover:glow-purple') :
          (isLocked ? 'bg-pink-500/30 text-gray-200' : 'bg-pink-500/50 hover:bg-pink-500 hover:glow-purple')
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {getUpgradeActionLabel(isLoading, upgradeLabel)}
          </span>
        ) : (
          getUpgradeActionLabel(isLoading, upgradeLabel)
        )}
      </button>
      {!isLoading && !disabled && !canAfford && (
        <p className="text-[10px] text-gray-500 uppercase tracking-wider text-center">
          Need {missingPoints.toLocaleString()} more points
        </p>
      )}
    </Card>
  )
})

UpgradeCard.displayName = 'UpgradeCard'
