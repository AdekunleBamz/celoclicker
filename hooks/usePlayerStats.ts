import { useReadContract } from 'wagmi'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import type { Address } from 'viem'
import type { PlayerStatsTuple } from '@/lib/types'
import { ZERO_ADDRESS } from '@/lib/utils'

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
    refetch,
    error,
    isLoading,
  }
}
