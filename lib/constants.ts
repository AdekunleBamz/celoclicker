/**
 * Game constants and configuration for CeloClicker
 * @module constants
 */

/** Chain ID for Celo Mainnet */
export const CELO_MAINNET_CHAIN_ID = 42220

/** Chain ID for Alfajores Celo Testnet */
export const CELO_TESTNET_CHAIN_ID = 44787

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
 * Minimum effective click power a player can have (base value before upgrades).
 */
export const MIN_CLICK_POWER = 1n

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

/**
 * Minimum upgrade level. Upgrades start at 0 before any purchase.
 */
export const MIN_UPGRADE_LEVEL = 0n

/**
 * Maximum upgrade level allowed for any single upgrade type.
 */
export const MAX_UPGRADE_LEVEL = 100n

/**
 * Default number of decimal places used when displaying CELO token amounts.
 */
export const CELO_DISPLAY_DECIMALS = 4

/**
 * Base URL for the Celo block explorer (mainnet).
 */
export const CELO_EXPLORER_URL = 'https://explorer.celo.org/mainnet'

/**
 * Base URL for the Alfajores testnet block explorer.
 */
export const CELO_TESTNET_EXPLORER_URL = 'https://explorer.celo.org/alfajores'

/**
 * Array of chain IDs that the app officially supports.
 */
export const SUPPORTED_CHAIN_IDS: readonly number[] = [
  CELO_MAINNET_CHAIN_ID,
  CELO_TESTNET_CHAIN_ID,
] as const

/**
 * Application version sourced from the environment at build time.
 * Falls back to '0.0.0' when the variable is not set.
 */
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.0'

/**
 * Default easing function used for CSS animations throughout the application.
 */
export const DEFAULT_ANIMATION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

/**
 * Maximum number of leaderboard entries the UI will attempt to render.
 * Requests returning more than this value will be truncated client-side.
 */
export const MAX_RENDERED_LEADERBOARD_ENTRIES = 50

/**
 * Number of milliseconds a "success" toast or notification should be visible.
 */
export const SUCCESS_TOAST_DURATION_MS = 3000

/**
 * Number of milliseconds an "error" toast or notification should be visible.
 */
export const ERROR_TOAST_DURATION_MS = 5000

/**
 * Default polling interval in ms for on-chain player stats.
 */
export const STATS_POLL_INTERVAL_MS = 15_000

/**
 * Maximum number of auto-clicker upgrades a player can purchase.
 */
export const MAX_AUTO_CLICKER_LEVEL = 10n

/**
 * Maximum multiplier upgrade level.
 */
export const MAX_MULTIPLIER_LEVEL = 5n

/**
 * Frozen enum of in-game transaction types.
 */
export const GAME_TX_TYPE = Object.freeze({
  CLICK: 'click',
  UPGRADE_AUTO: 'upgrade_auto',
  UPGRADE_MULT: 'upgrade_mult',
  WITHDRAW: 'withdraw',
} as const)

/**
 * Minimum click power a player starts with.
 */
export const BASE_CLICK_POWER = 1n

/**
 * Minimum points required to appear on the leaderboard.
 */
export const MIN_LEADERBOARD_POINTS = 1n

/** Maximum number of results shown on the leaderboard UI. */
export const MAX_LEADERBOARD_DISPLAY = 100

/** Minimum number of games played required to have a rank computed. */
export const MIN_GAMES_FOR_RANK = 5n

/** Display names for each upgrade type, keyed by GAME_TX_TYPE value. */
export const UPGRADE_DISPLAY_NAMES = Object.freeze({
  UPGRADE_AUTO: 'Auto Clicker',
  UPGRADE_MULT: 'Multiplier',
} as const)

/** How long to wait (ms) before retrying a failed transaction. */
export const TX_RETRY_DELAY_MS = 3_000

/** Timeout in ms for a pending transaction before it is considered stale. */
export const TX_TIMEOUT_MS = 60_000

/** Duration in ms for click burst animation shown after clicking. */
export const CLICK_ANIMATION_DURATION_MS = 150

/** How many ms between each leaderboard auto-refresh fetch. */
export const LEADERBOARD_REFRESH_MS = 30_000

/** Zero address constant for EVM chains. */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const

export const MAX_CLICK_SCORE = 1_000_000

export const CLICK_COOLDOWN_MS = 500

export const UPGRADE_PRICE_BASE = 100

export const AUTO_CLICK_INTERVAL_MS = 1_000

export const PRESTIGE_THRESHOLD = 1_000_000

export const MAX_UPGRADES = 20

export const SAVE_INTERVAL_MS = 5_000

export const INITIAL_CLICKS_PER_SECOND = 0

export const ACHIEVEMENT_COUNT = 15

export const MULTIPLIER_BASE = 1.5

export const MAX_PRESTIGE_LEVEL = 10

export const BONUS_CLICK_CHANCE = 0.05

export const CLICK_VALUE_DEFAULT = 1

export const UPGRADE_SCALE_FACTOR = 1.15

export const COMBO_WINDOW_MS = 2_000

export const MAX_COMBO_MULTIPLIER = 8

export const SYNC_RETRY_ATTEMPTS = 3

export const OFFLINE_INCOME_CAP_HOURS = 8
