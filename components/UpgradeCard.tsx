interface UpgradeCardProps {
  title: string
  currentLevel: string | number
  cost: bigint
  points: bigint
  color: string
  onUpgrade: () => void
  disabled?: boolean
  isLoading?: boolean
}

export function UpgradeCard({
  title,
  currentLevel,
  cost,
  points,
  color,
  onUpgrade,
  disabled = false,
  isLoading = false,
}: UpgradeCardProps) {
  const canAfford = points >= cost && !disabled && !isLoading

  return (
    <div className="bg-black/30 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className={`font-bold ${color}`}>{title}</div>
          <div className="text-xs text-gray-400">Current: {currentLevel}</div>
        </div>
        <div className="text-right">
          <div className="text-celo-gold font-bold">{Number(cost).toLocaleString()}</div>
          <div className="text-xs text-gray-400">points</div>
        </div>
      </div>
      <button
        onClick={onUpgrade}
        disabled={!canAfford}
        className={`w-full py-2 ${color}/50 hover:${color} rounded-lg font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm`}
      >
        {isLoading ? 'PROCESSING...' : 'UPGRADE'}
      </button>
    </div>
  )
}

