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
 * Possible states for asynchronous operations within the UI.
 */
export type AsyncStatus = 
  | 'idle'    /** Operation has not started. */
  | 'loading' /** Operation is currently in progress. */
  | 'success' /** Operation completed successfully. */
  | 'error'   /** Operation failed with an error. */

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

/**
 * Represents the result of a blockchain write transaction.
 */
export interface TransactionResult {
  hash: `0x${string}`
  status: 'pending' | 'confirmed' | 'failed'
  blockNumber?: bigint
}

/**
 * Props shared by all game action buttons (click, upgrade, collect).
 */
export interface GameActionButtonProps {
  /** Whether the action is currently executing on-chain. */
  isLoading: boolean
  /** Whether the action button should be disabled. */
  disabled?: boolean
  /** Click handler for the action. */
  onClick: () => void
}

/**
 * A player's position in the leaderboard alongside their score.
 */
export interface PlayerRank {
  address: `0x${string}`
  rank: number
  points: bigint
}

/**
 * Describes the connectivity state of the user's wallet.
 */
export type NetworkStatus = 'connected' | 'disconnected' | 'connecting' | 'wrong-chain'

/**
 * Tracks statistics for a single play session.
 */
export interface GameSessionStats {
  /** Total manual clicks made in this session. */
  manualClicks: number
  /** Total auto-clicker income earned in this session. */
  autoIncome: number
  /** Duration of the session in milliseconds. */
  durationMs: number
  /** Timestamp when the session started. */
  startedAt: number
}

/**
 * Tracks the current state of the player's click combo chain.
 */
export interface ComboState {
  /** Current combo depth (number of consecutive clicks). */
  count: number
  /** Timestamp of the most recent click in the chain. */
  lastClickAt: number
  /** Whether the combo is currently active. */
  isActive: boolean
}

/** Union type for the four achievement tier labels. */
export type AchievementTier = 'Bronze' | 'Silver' | 'Gold' | 'Legend'

/** Discriminated string union for upgrade type keys used across the game. */
export type UpgradeKey = 'CLICK_POWER' | 'AUTO_CLICKER' | 'MULTIPLIER'

/**
 * Describes a single click event recorded by the game.
 */
export interface ClickEvent {
  /** Timestamp of the click in milliseconds. */
  timestamp: number
  /** Point value earned from this click including multipliers. */
  value: number
  /** Whether this click triggered a bonus reward. */
  isBonus: boolean
}
