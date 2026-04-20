import { useReadContract } from 'wagmi'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import type { Address } from 'viem'
import type { PlayerStatsTuple } from '@/lib/types'
import { ZERO_ADDRESS } from '@/lib/utils'

/**
 * Hook to fetch player stats from the contract
 */
export function usePlayerStats(address: Address | undefined) {
  const { address: contractAddress, abi, isValid } = useContractConfig()
  const playerAddress = address ?? (ZERO_ADDRESS as Address)

  const { data: playerData, refetch, error, isLoading } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPlayer',
    args: [playerAddress],
    query: {
      enabled: !!address && isValid,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PLAYER_STATS,
    },
  })

  const [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed] =
    (playerData as PlayerStatsTuple) || [0n, 0n, 0n, 0n, 0n, 0n]

  return {
    points,
    clickPower,
    autoClickerLevel,
    multiplierLevel,
    totalClicks,
    gamesPlayed,
    /** True when the player has not played any games yet. */
    isNewPlayer: gamesPlayed === 0n,
    /** True when points data is available and the player has at least some points. */
    hasPoints: points > 0n,
    /** Shorthand for checking whether an auto-clicker upgrade has been purchased. */
    hasAutoClicker: autoClickerLevel > 0n,
    /** Sum of autoClickerLevel and multiplierLevel. */
    totalUpgradeLevel: autoClickerLevel + multiplierLevel,
    /** True when at least one upgrade type has been purchased. */
    hasAnyUpgrade: autoClickerLevel > 0n || multiplierLevel > 0n,
    refetch,
    error,
    isLoading,
  }
}
