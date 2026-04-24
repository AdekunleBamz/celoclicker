import { useReadContract } from 'wagmi'
import { useMemo } from 'react'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import type { Address } from 'viem'
import type { PlayerStatsTuple } from '@/lib/types'
import { ZERO_ADDRESS } from '@/lib/utils'

/**
 * Hook to fetch player stats from the contract.
 * Memoizes the derived stats for performance.
 * 
 * @param address - The player's address to fetch stats for.
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

  return useMemo(() => {
    const [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed] =
      (playerData as PlayerStatsTuple) || [0n, 0n, 0n, 0n, 0n, 0n]

    const hasAutoClicker = autoClickerLevel > 0n

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
      hasAutoClicker,
      /** Sum of autoClickerLevel and multiplierLevel. */
      totalUpgradeLevel: autoClickerLevel + multiplierLevel,
      /** True when at least one upgrade type has been purchased. */
      hasAnyUpgrade: autoClickerLevel > 0n || multiplierLevel > 0n,
      /** True if the player is eligible for a multiplier upgrade (at least level 1 click power). */
      canMultiplier: clickPower > 1n,
      refetch,
      error,
      isLoading,
    }
  }, [playerData, refetch, error, isLoading])
}
