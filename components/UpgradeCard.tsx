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
        type="button"
        className={`w-full py-2 rounded-lg font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm relative z-10 ${
          color === 'text-purple-400' ? 'bg-purple-500/50 hover:bg-purple-500' :
          color === 'text-indigo-400' ? 'bg-indigo-500/50 hover:bg-indigo-500' :
          'bg-pink-500/50 hover:bg-pink-500'
        }`}
      >
        {isLoading ? 'PROCESSING...' : 'UPGRADE'}
      </button>
    </div>
  )
}

