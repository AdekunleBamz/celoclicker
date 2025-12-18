/**
 * Game constants and configuration
 */

export const GAME_CONFIG = {
  AUTOCLICKER_INTERVAL_SECONDS: 300, // 5 minutes
  REFETCH_INTERVALS: {
    PLAYER_STATS: 3000,
    UPGRADE_COSTS: 5000,
    PENDING_AUTO: 1000,
    LEADERBOARD: 5000,
  },
  ANIMATION_DURATION: {
    FLOATING_NUMBER: 1000,
    CLICK_EFFECT: 300,
  },
} as const

export const UPGRADE_NAMES = {
  CLICK_POWER: 'Click Power',
  AUTO_CLICKER: 'Auto-Clicker',
  MULTIPLIER: 'Multiplier',
} as const

export const COLORS = {
  CELO_GREEN: '#35D07F',
  CELO_GOLD: '#FBCC5C',
  PURPLE: '#9333EA',
  PINK: '#EC4899',
  INDIGO: '#6366F1',
} as const

