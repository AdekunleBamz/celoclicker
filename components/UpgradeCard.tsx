import { Card, Button } from './UI'

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
  const variant = color === 'text-purple-400' ? 'primary' : 
                  color === 'text-indigo-400' ? 'secondary' : 
                  'accent'

  return (
    <Card className="p-4">
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
      <Button
        onClick={onUpgrade}
        disabled={!canAfford}
        variant={variant}
        fullWidth
        className="py-2 text-sm"
        aria-label={`Upgrade ${title} for ${Number(cost).toLocaleString()} points`}
      >
        {isLoading ? 'PROCESSING...' : 'UPGRADE'}
      </Button>
    </Card>
  )
}

