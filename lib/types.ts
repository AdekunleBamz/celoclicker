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
