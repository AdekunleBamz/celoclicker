import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useMemo } from 'react'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import type { PlayerStatsTuple, UpgradeCostsTuple, LeaderboardTuple } from '@/lib/types'

/**
 * Hook to manage game state and interactions with the CeloClicker contract.
 * Provides player stats, upgrade costs, and write functions.
 */
export function useClicker() {
  const { address, isConnected } = useAccount()
  const { address: contractAddress, abi, isValid } = useContractConfig()

  // Player Stats
  const {
    data: playerData,
    refetch: refetchPlayer,
    isLoading: isLoadingPlayer
  } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPlayer',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isValid,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PLAYER_STATS,
      staleTime: GAME_CONFIG.REFETCH_INTERVALS.STALE_TIME,
    },
  })

  // Upgrade Costs
  const { data: upgradeCosts, isLoading: isLoadingCosts } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getUpgradeCosts',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isValid,
      staleTime: GAME_CONFIG.REFETCH_INTERVALS.STALE_TIME,
    },
  })

  // Pending Auto-Clicker
  const { data: pendingAuto } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPendingAutoClicker',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isValid && !!playerData && (playerData as PlayerStatsTuple)[2] > 0n,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PENDING_AUTO,
      staleTime: GAME_CONFIG.REFETCH_INTERVALS.STALE_TIME,
    },
  })

  // Leaderboard
  const { data: leaderboardData } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getLeaderboard',
    query: {
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.LEADERBOARD,
    },
  })

  // Write operations
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()

  // Transaction verification
  const { isLoading: isConfirming, isSuccess, error: txError } = useWaitForTransactionReceipt({
    hash,
  })

  return useMemo(() => {
    const [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed] =
      (playerData as PlayerStatsTuple) || [0n, 0n, 0n, 0n, 0n, 0n]

    const [clickPowerCost, autoClickerCost, multiplierCost] =
      (upgradeCosts as UpgradeCostsTuple) || [0n, 0n, 0n]

    return {
      address,
      isConnected,
      playerStats: {
        points,
        clickPower,
        autoClickerLevel,
        multiplierLevel,
        totalClicks,
        gamesPlayed,
      },
      upgradeCosts: {
        clickPowerCost,
        autoClickerCost,
        multiplierCost,
      },
      pendingAuto: Number(pendingAuto || 0n),
      leaderboardData: leaderboardData as LeaderboardTuple,
      isLoading: isLoadingPlayer || isLoadingCosts,
      isPending,
      isConfirming,
      isSuccess,
      writeError,
      txError,
      writeContract,
      refetchPlayer,
      contractAddress,
      abi,
    }
  }, [
    address,
    isConnected,
    playerData,
    upgradeCosts,
    pendingAuto,
    leaderboardData,
    isLoadingPlayer,
    isLoadingCosts,
    isPending,
    isConfirming,
    isSuccess,
    writeError,
    txError,
    writeContract,
    refetchPlayer,
    contractAddress,
    abi,
  ])
}
