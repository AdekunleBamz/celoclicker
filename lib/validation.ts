/**
 * Validation utilities for CeloClicker
 * @module validation
 */
import { CONTRACT_ADDRESS_ENV_KEY, SUPPORTED_CHAIN_IDS, MIN_WALLET_CONNECT_ID_LENGTH } from './constants'
import { isValidAddress, isZeroAddress, isPositiveBigInt } from './utils'

/**
 * Validates if a string is a valid Ethereum contract address format
 * @param address - The address string to validate
 * @returns True if the address is a valid Ethereum address format
 */
export function validateContractAddress(address: string): boolean {
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''
  if (!normalizedAddress) return false
  if (isZeroAddress(normalizedAddress)) return false
  return isValidAddress(normalizedAddress)
}

/**
 * Validates that all required environment variables are set and valid
 * @returns An object containing validation status and any error messages
 */
export function validateEnvironment(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT?.trim()
  if (!contractAddress) {
    errors.push(`${CONTRACT_ADDRESS_ENV_KEY} is not set`)
  } else if (!validateContractAddress(contractAddress)) {
    errors.push(`${CONTRACT_ADDRESS_ENV_KEY} is not a valid address`)
  }
  
  const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim()
  if (!walletConnectId) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set')
  } else {
    const normalizedProjectId = walletConnectId.toLowerCase()
    const placeholderIds = new Set([
      'your_project_id',
      'your_project_id_here',
      'walletconnect_project_id',
    ])

    if (placeholderIds.has(normalizedProjectId)) {
      errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value')
    }

    if (walletConnectId.length < MIN_WALLET_CONNECT_ID_LENGTH) {
      errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID appears too short to be valid')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Returns true when the provided upgrade level is within the allowed range [0, 100].
 *
 * @param level - The upgrade level to validate (bigint).
 */
export function isValidUpgradeLevel(level: bigint): boolean {
  return level >= 0n && level <= 100n
}

/**
 * Returns true when the provided point value is a non-negative bigint.
 *
 * @param points - The points value to validate.
 */
export function isValidPoints(points: bigint): boolean {
  return points >= 0n
}

/**
 * Returns true when the given chain ID is in the supported list.
 *
 * @param chainId - The numeric chain ID to check.
 */
export function isValidChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && SUPPORTED_CHAIN_IDS.includes(chainId)
}

/**
 * Returns true when the value looks like a valid Ethereum transaction hash.
 * Expects a 0x-prefixed 64-character hex string.
 *
 * @param hash - The hash string to validate.
 */
export function isValidTxHash(hash: string): boolean {
  if (typeof hash !== 'string') return false
  return /^0x[a-fA-F0-9]{64}$/.test(hash.trim())
}

/**
 * Returns true when the click count is a positive safe integer.
 *
 * @param count - The click count to validate (bigint).
 */
export function isValidClickCountBigInt(count: bigint): boolean {
  return count >= 0n
}

/**
 * Returns true when value is a finite, non-negative number suitable for
 * use as a CPS (clicks-per-second) rate.
 *
 * @param cps - The value to validate.
 */
export function isValidCps(cps: number): boolean {
  return Number.isFinite(cps) && cps >= 0
}

/**
 * Returns true when the provided address looks like an ERC-20 token placeholder
 * (all zeros except the last character).  Placeholder addresses are NOT zero addresses
 * and should not be trusted as real contract addresses.
 *
 * @param address - The address string to check.
 */
export function isPlaceholderAddress(address: string): boolean {
  return /^0x0{38}[1-9a-f]$/i.test(address.trim())
}

/**
 * Returns true when the provided bigint value is within the given inclusive range.
 *
 * @param value - The value to check.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 */
export function isBigIntInRange(value: bigint, min: bigint, max: bigint): boolean {
  return value >= min && value <= max
}

/**
 * Returns true if the upgrade level is within a valid purchase range [1, maxLevel].
 *
 * @param level - The upgrade level bigint to validate.
 * @param maxLevel - Maximum allowed level (default 10n).
 */
export function isPurchasableUpgradeLevel(level: bigint, maxLevel = 10n): boolean {
  return level >= 1n && level <= maxLevel
}

/**
 * Returns true if the player address is a valid non-zero EVM address.
 *
 * @param address - The address string to validate.
 */
export function isValidPlayerAddress(address: string): boolean {
  if (typeof address !== 'string') return false
  const normalized = address.trim()
  return /^0x[a-fA-F0-9]{40}$/.test(normalized) && normalized.toLowerCase() !== '0x0000000000000000000000000000000000000000'
}

/**
 * Returns true if the click count is a positive bigint greater than zero.
 * @param clicks - The bigint click count to validate.
 */
export function isPositiveClicks(clicks: bigint): boolean {
  return clicks > 0n
}

/** Returns true if the games count is a non-negative bigint. */
export function isValidGamesCount(n: bigint): boolean {
  return n >= 0n
}

/** Returns true if the click power is at least 1 (minimum valid). */
export function isValidClickPower(power: bigint): boolean {
  return power >= 1n
}

/** Returns true if the multiplier level is within [0, max]. */
export function isValidMultiplierLevel(level: bigint, max = 5n): boolean {
  return level >= 0n && level <= max
}

/**
 * Returns true if the given value is a non-empty string.
 */
export function isNonEmptyString(s: unknown): s is string {
  return typeof s === 'string' && s.trim().length > 0
}

/**
 * Returns true if the given value is a positive integer.
 */
export function isPositiveInt(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n > 0
}

/**
 * Returns true if the number is within the inclusive range [lo, hi].
 */
export function isInRange(n: number, lo: number, hi: number): boolean {
  const min = Math.min(lo, hi)
  const max = Math.max(lo, hi)
  return n >= min && n <= max
}

/**
 * Returns true if the string is a valid hex string starting with 0x.
 */
export function isHexString(s: string): boolean {
  return /^0x[0-9a-fA-F]*$/.test(s)
}

/**
 * Returns true if the ID is a valid positive chain identifier.
 */
export function isPositiveChainId(id: number): boolean {
  return Number.isInteger(id) && id > 0
}

/**
 * Returns true if the value is a finite positive timestamp.
 */
export function isValidTimestamp(ts: number): boolean {
  return Number.isFinite(ts) && ts > 0
}

/**
 * Returns true if the score is a finite non-negative number.
 */
export function isValidScore(score: number): boolean {
  return Number.isFinite(score) && score >= 0
}

/**
 * Returns true if the string is a valid http or https URL.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Returns true if the multiplier is a finite number greater than or equal to 1.
 */
export function isValidMultiplier(m: number): boolean {
  return Number.isFinite(m) && m >= 1
}

/**
 * Returns true when the given token amount string represents a parseable non-negative value.
 *
 * @param amount - The amount string to validate (e.g. "1.5", "0.001").
 */
export function isValidTokenAmount(amount: string): boolean {
  if (typeof amount !== 'string' || !amount.trim()) return false
  const n = parseFloat(amount.trim())
  return Number.isFinite(n) && n >= 0
}

/**
 * Returns true when the leaderboard rank is a valid positive integer.
 *
 * @param rank - The rank number to validate.
 */
export function isValidLeaderboardRank(rank: number): boolean {
  return Number.isInteger(rank) && rank >= 1
}

/**
 * Returns true when the prestige count is a non-negative integer.
 *
 * @param count - The prestige count to check.
 */
export function isValidPrestigeCount(count: number): boolean {
  return Number.isInteger(count) && count >= 0
}

/**
 * Returns true when the given combo count is a non-negative safe integer.
 *
 * @param combo - The combo count to validate.
 */
export function isValidComboCount(combo: number): boolean {
  return Number.isInteger(combo) && combo >= 0 && Number.isSafeInteger(combo)
}

/**
 * Returns true when the duration is a finite positive number of milliseconds.
 *
 * @param ms - Duration in milliseconds.
 */
export function isValidDurationMs(ms: number): boolean {
  return Number.isFinite(ms) && ms > 0
}

/**
 * Returns true when the value is a finite number representing a valid CELO amount
 * (non-negative and within JavaScript's safe number range).
 *
 * @param amount - The CELO amount as a number.
 */
export function isValidCeloAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER
}
