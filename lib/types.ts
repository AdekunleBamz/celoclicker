/**
 * Type definitions for contract return tuples
 * @module types
 */

/**
 * Tuple representing player statistics from the contract
 * @remarks Order: [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed]
 */
export type PlayerStatsTuple = readonly [bigint, bigint, bigint, bigint, bigint, bigint]

/**
 * Tuple representing upgrade costs from the contract
 * @remarks Order: [clickPowerCost, autoClickerCost, multiplierCost]
 */
export type UpgradeCostsTuple = readonly [bigint, bigint, bigint]

/**
 * Tuple representing leaderboard data from the contract
 * @remarks Order: [addresses[], points[]]
 */
export type LeaderboardTuple = readonly [readonly `0x${string}`[], readonly bigint[]]

/**
 * A single entry in the leaderboard with player address and point total.
 */
export interface LeaderboardEntry {
  address: `0x${string}`
  points: bigint
  rank: number
}

/**
 * Result returned by upgrade cost hooks.
 */
export interface UpgradeCosts {
  clickPowerCost: bigint
  autoClickerCost: bigint
  multiplierCost: bigint
}

/**
 * Generic async operation state for UI loading indicators.
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * A range of bigint values with an inclusive min and max.
 */
export interface BigIntRange {
  min: bigint
  max: bigint
}

/**
 * Represents an upgrade available for purchase by the player.
 */
export interface UpgradeOption {
  /** Unique key identifying the upgrade type. */
  key: 'clickPower' | 'autoClicker' | 'multiplier'
  /** Human-readable display name for the upgrade. */
  name: string
  /** Current level of the upgrade owned by the player. */
  currentLevel: bigint
  /** Cost in points to purchase the next level. */
  cost: bigint
  /** Tailwind text color class used for this upgrade's accent color. */
  color: string
}
