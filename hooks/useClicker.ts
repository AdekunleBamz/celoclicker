import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG } from '@/lib/constants'
import type { PlayerStatsTuple, UpgradeCostsTuple, LeaderboardTuple } from '@/lib/types'

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
}
