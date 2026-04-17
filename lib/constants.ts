/**
 * Game constants and configuration for CeloClicker
 * @module constants
 */

/** Chain ID for Celo Mainnet */
export const CELO_MAINNET_CHAIN_ID = 42220

/** Application display name */
export const APP_NAME = 'CeloClicker'

/** Environment variable key for the contract address */
export const CONTRACT_ADDRESS_ENV_KEY = 'NEXT_PUBLIC_CELOCLICKER_CONTRACT'

/**
 * Game configuration settings including intervals and animation durations
 */
export const GAME_CONFIG = {
  /** Auto-clicker interval in seconds (5 minutes) */
  AUTOCLICKER_INTERVAL_SECONDS: 300,
  /** Refetch intervals for various data in milliseconds */
  REFETCH_INTERVALS: {
    PLAYER_STATS: 3000,
    UPGRADE_COSTS: 5000,
    PENDING_AUTO: 1000,
    LEADERBOARD: 5000,
    BALANCES: 7000,
  },
  /** Animation durations in milliseconds */
  ANIMATION_DURATION: {
    FLOATING_NUMBER: 1000,
    CLICK_EFFECT: 300,
  },
} as const satisfies Record<string, unknown>

/**
 * Display names for upgrade types
 */
export const UPGRADE_NAMES = {
  CLICK_POWER: 'Click Power',
  AUTO_CLICKER: 'Auto-Clicker',
  MULTIPLIER: 'Multiplier',
} as const

/**
 * Brand colors used throughout the application
 */
export const COLORS = {
  CELO_GREEN: '#35D07F',
  CELO_GOLD: '#FBCC5C',
  PURPLE: '#9333EA',
  PINK: '#EC4899',
  INDIGO: '#6366F1',
} as const

/**
 * Maximum number of entries shown in the leaderboard.
 */
export const MAX_LEADERBOARD_SIZE = 100
