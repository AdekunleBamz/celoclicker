import { useReadContract } from 'wagmi'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import { Address } from 'viem'
import { celoClickerABI } from '@/lib/abis'

export function usePlayerStats(address: Address | undefined) {
  const { address: contractAddress, abi, isValid } = useContractConfig()

  const { data: playerData, refetch, error, isLoading } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPlayer',
    args: [address!],
    query: {
      enabled: !!address && isValid,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PLAYER_STATS,
    },
  })

  const [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed] = 
    (playerData as [bigint, bigint, bigint, bigint, bigint, bigint]) || [0n, 0n, 0n, 0n, 0n, 0n]

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

