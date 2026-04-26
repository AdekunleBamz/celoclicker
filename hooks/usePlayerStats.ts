import { useReadContract } from 'wagmi'
import { useMemo } from 'react'
import { useContractConfig } from './useContractConfig'
import { GAME_CONFIG, MAX_UPGRADE_LEVEL } from '@/lib/constants'
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
      staleTime: GAME_CONFIG.REFETCH_INTERVALS.STALE_TIME,
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
      /** True when click power has reached the contract maximum. */
      isMaxClickPower: clickPower >= MAX_UPGRADE_LEVEL,
      refetch,
      error,
      isLoading,
    }
  }, [playerData, refetch, error, isLoading])
}

/**
 * Returns the display label for the click power level.
 * E.g. 1n -> "Lv. 1".
 *
 * @param clickPower - Current click power bigint value.
 */
export function formatClickPowerLevel(clickPower: bigint): string {
  return `Lv. ${clickPower.toString()}`
}

/**
 * Computes the estimated points earned per second from an auto-clicker.
 * Returns 0 when the auto-clicker level is zero or the interval is unknown.
 *
 * @param autoClickerLevel - Current auto-clicker upgrade level.
 * @param pointsPerLevel - Points granted per auto-clicker level per tick.
 * @param intervalMs - Auto-clicker tick interval in milliseconds.
 */
export function estimateAutoClickerPps(
  autoClickerLevel: bigint,
  pointsPerLevel: bigint,
  intervalMs: number
): number {
  if (autoClickerLevel === 0n || intervalMs <= 0) return 0
  const pointsPerTick = Number(autoClickerLevel * pointsPerLevel)
  return (pointsPerTick / intervalMs) * 1000
}

/**
 * Returns a progress fraction (0–1) towards the next upgrade level.
 * Clamps the output to the [0, 1] range.
 *
 * @param currentPoints - The player's current point balance.
 * @param upgradeCost - The cost of the next upgrade level.
 */
export function upgradeProgress(currentPoints: bigint, upgradeCost: bigint): number {
  if (upgradeCost === 0n) return 1
  const ratio = Number(currentPoints) / Number(upgradeCost)
  return Math.min(Math.max(ratio, 0), 1)
}

/**
 * Returns the effective clicks per point multiplied by the multiplier level.
 * Useful for deriving total click value with upgrades applied.
 *
 * @param clickPower - Current click power level.
 * @param multiplierLevel - Current multiplier upgrade level.
 * @param baseMultiplier - Base multiplier value applied at level 1 (default 2).
 */
export function effectiveClickValue(
  clickPower: bigint,
  multiplierLevel: bigint,
  baseMultiplier = 2n
): bigint {
  if (multiplierLevel === 0n) return clickPower
  return clickPower * (baseMultiplier ** multiplierLevel)
}

/**
 * Returns a short rank label based on total games played.
 * Useful for showing player experience tier in the UI.
 *
 * @param gamesPlayed - Total number of game sessions completed.
 */
export function playerRankLabel(gamesPlayed: bigint): string {
  const n = Number(gamesPlayed)
  if (n === 0) return 'Newcomer'
  if (n < 5) return 'Rookie'
  if (n < 20) return 'Player'
  if (n < 50) return 'Veteran'
  if (n < 100) return 'Elite'
  return 'Legend'
}
