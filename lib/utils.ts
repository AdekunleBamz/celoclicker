/**
 * Ethereum zero address constant used for validation
 */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Formats a number with K, M, B suffixes for display
 * @param num - The number to format (bigint or number)
 * @returns Formatted string with suffix (e.g., "1.50K", "2.30M", "1.00B")
 * @example
 * formatNumber(1500) // "1.50K"
 * formatNumber(1000000) // "1.00M"
 */
export function formatNumber(num: bigint | number): string {
  const n = typeof num === 'bigint' ? Number(num) : num
  if (!Number.isFinite(n)) {
    return '0'
  }

  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  const compact = (value: number) => value.toFixed(2).replace(/\.?0+$/, '')

  if (abs >= 1_000_000_000) {
    return sign + compact(abs / 1_000_000_000) + 'B'
  }
  if (abs >= 1_000_000) {
    return sign + compact(abs / 1_000_000) + 'M'
  }
  if (abs >= 1_000) {
    return sign + compact(abs / 1_000) + 'K'
  }
  return n.toLocaleString()
}

/**
 * Formats an Ethereum address for display by truncating it
 * @param address - The Ethereum address to format
 * @returns Truncated address string (e.g., "0x1234...5678")
 */
export function formatAddress(address: string): string {
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''
  if (!normalizedAddress) return ''
  if (normalizedAddress.length <= 10) return normalizedAddress
  return `${normalizedAddress.slice(0, 6)}...${normalizedAddress.slice(-4)}`
}

/**
 * Formats token amounts for display with appropriate decimal places
 * @param value - The token amount as a string
 * @param symbol - Optional token symbol to append
 * @returns Formatted amount string with symbol
 */
export function formatTokenAmount(value?: string, symbol?: string): string {
  if (!value) {
    return `0 ${symbol ?? ''}`.trim()
  }

  const normalizedValue = value.trim().replace(/,/g, '')
  const numericValue = Number(normalizedValue)

  if (!Number.isFinite(numericValue)) {
    return `0 ${symbol ?? ''}`.trim()
  }

  const safeNumericValue = Math.max(0, numericValue)
  const absoluteValue = Math.abs(safeNumericValue)
  const decimals =
    absoluteValue >= 100 ? 2 :
    absoluteValue >= 1 ? 3 :
    absoluteValue >= 0.01 ? 4 : 6
  const fixedValue = safeNumericValue.toFixed(decimals).replace(/\.?0+$/, '')
  const formattedValue =
    absoluteValue >= 1000
      ? Number(fixedValue).toLocaleString('en-US', { maximumFractionDigits: decimals })
      : fixedValue

  return `${formattedValue} ${symbol ?? ''}`.trim()
}

/**
 * Validates if a string is a valid Ethereum address format
 * @param address - The address string to validate
 * @returns True if the address is a valid Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim())
}

/**
 * Checks if an address is the Ethereum zero address
 * @param address - The address to check
 * @returns True if the address is the zero address
 */
export function isZeroAddress(address: string): boolean {
  if (!address) return false
  return address.trim().toLowerCase() === ZERO_ADDRESS
}

/**
 * Returns true when two Ethereum addresses are equal, ignoring case.
 *
 * @param a - First address string.
 * @param b - Second address string.
 */
export function isSameAddress(a: string, b: string): boolean {
  if (!a || !b) return false
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

/**
 * Clamps a bigint value between min and max (inclusive).
 *
 * @param value - The value to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 */
export function clampBigInt(value: bigint, min: bigint, max: bigint): bigint {
  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Returns true if the value is a positive bigint (> 0).
 * 
 * @param value - The bigint to check.
 */
export function isPositiveBigInt(value: bigint): boolean {
  return value > 0n
}

/**
 * Returns a human-readable elapsed time string (e.g. "2h 5m") from a number of seconds.
 *
 * @param seconds - Elapsed time in seconds.
 */
export function formatElapsedTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0s'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

/**
 * Safely parses a string to an integer, returning a fallback value on failure.
 *
 * @param value - The string to parse.
 * @param fallback - Value returned when parsing fails. Defaults to 0.
 */
export function safeParseInt(value: string, fallback = 0): number {
  const parsed = parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * Safely parses a string to a float, returning a fallback value on failure.
 *
 * @param value - The string to parse.
 * @param fallback - Value returned when parsing fails. Defaults to 0.
 */
export function safeParseFloat(value: string, fallback = 0): number {
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * Converts a value in CELO (18-decimal) to its wei representation as a bigint.
 *
 * @param celo - Amount in CELO (e.g. 1.5 = 1.5 CELO).
 */
export function celoToWei(celo: number): bigint {
  const safeAmount = Math.max(0, celo)
  return BigInt(Math.round(safeAmount * 1e18))
}

/**
 * Converts a wei bigint to its CELO equivalent as a plain number.
 *
 * @param wei - Amount in wei.
 */
export function weiToCelo(wei: bigint): number {
  return Number(wei) / 1e18
}

/**
 * Pads a string to the given length with a pad character on the left.
 * Safe for use with numbers that need consistent string widths in the UI.
 *
 * @param value - The value to pad (coerced to string).
 * @param length - The target string length.
 * @param padChar - Character to pad with. Defaults to '0'.
 */
export function padStart(value: string | number, length: number, padChar = '0'): string {
  return String(value).padStart(length, padChar)
}

/**
 * Returns a truncated version of a string with an ellipsis in the middle.
 * Useful for long hashes or addresses that don't fit in the UI.
 *
 * @param value - The string to truncate.
 * @param startChars - Number of characters to keep at the start. Defaults to 8.
 * @param endChars - Number of characters to keep at the end. Defaults to 6.
 */
export function truncateMiddle(value: string, startChars = 8, endChars = 6): string {
  if (value.length <= startChars + endChars + 3) return value
  return `${value.slice(0, startChars)}...${value.slice(-endChars)}`
}

/**
 * Formats a bigint click score with thousands separators for display.
 *
 * @param clicks - The bigint click count.
 * @returns Localized number string e.g. "1,234,567".
 */
export function formatClickScore(clicks: bigint): string {
  return Number(clicks).toLocaleString('en-US')
}

/**
 * Returns a compact click score string (e.g. "1.2M", "450K").
 *
 * @param clicks - The bigint click count.
 */
export function formatClickScoreCompact(clicks: bigint): string {
  const n = Number(clicks)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

/**
 * Calculates clicks per second from a total click count and elapsed seconds.
 *
 * @param totalClicks - Total bigint click count.
 * @param elapsedSeconds - Number of seconds elapsed.
 * @returns Clicks-per-second as a number, or 0 if invalid.
 */
export function clicksPerSecond(totalClicks: bigint, elapsedSeconds: number): number {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0) return 0
  return Number(totalClicks) / elapsedSeconds
}

/**
 * Converts a CELO amount (as string or number) to a display string with 4 decimal places.
 * @param celo - Amount in CELO.
 */
export function formatCelo(celo: number | string): string {
  const n = Number(celo)
  if (!Number.isFinite(n)) return '0.0000'
  return n.toFixed(4).replace(/\.?0+$/, '') || '0'
}

/** Clamps a bigint value between min and max (inclusive). */
export function clampBigint(val: bigint, min: bigint, max: bigint): bigint {
  return clampBigInt(val, min, max)
}

/** Returns 'Level N' display string for a given upgrade level bigint. */
export function formatUpgradeLevel(level: bigint): string {
  return `Level ${level.toString()}`
}

/** Formats a games-played count as a readable string, e.g. "42 games". */
export function formatGamesPlayed(n: bigint): string {
  return `${n.toString()} game${n === 1n ? '' : 's'}`
}

/** Converts a timestamp in ms to a locale time string. */
/**
 * Converts a millisecond timestamp to a locale time string.
 *  ms - Timestamp in milliseconds.
 */
export function formatTimestamp(ms: number): string {
  return new Date(ms).toLocaleTimeString()
}

/** Returns percentage of val out of total as a number (0-100). */
/**
 * Computes a percentage from a bigint numerator and denominator.
 *  val - The partial value.
 *  total - The total value.
 */
export function bigintToPercent(val: bigint, total: bigint): number {
  if (total === 0n) return 0
  return Math.min(100, (Number(val) / Number(total)) * 100)
}

/** Truncates a hex address to short form: 0x1234...abcd */
/**
 * Truncates a hex address to short form for UI display.
 *  addr - The address string to truncate.
 */
export function shortAddress(addr: string): string {
  const normalizedAddress = typeof addr === 'string' ? addr.trim() : ''
  if (!normalizedAddress || normalizedAddress.length <= 10) return normalizedAddress
  return `${normalizedAddress.slice(0, 6)}...${normalizedAddress.slice(-4)}`
}

/**
 * Formats a click count with K/M suffixes for compact display.
 * @param n - The click count to format.
 */
export function formatClicks(n: number): string {
  if (!Number.isFinite(n)) return '0'

  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  const compact = (value: number) => value.toFixed(1).replace(/\.0$/, '')

  if (abs >= 1_000_000) return `${sign}${compact(abs / 1_000_000)}M`
  if (abs >= 1_000) return `${sign}${compact(abs / 1_000)}K`
  return n.toLocaleString()
}

/**
 * Calculates the next upgrade price given a base cost and current level.
 * Cost scales by 1.15x per level.
 * @param base - The base cost of the upgrade at level 0.
 * @param level - The current level of the upgrade.
 * @returns The calculated price rounded down to the nearest integer.
 */
export function calcUpgradePrice(base: number, level: number): number {
  if (level < 0) return base
  return Math.floor(base * Math.pow(1.15, level))
}

/**
 * Checks whether a player has reached the threshold needed to prestige.
 * @param clicks - Current total click count.
 * @param threshold - Minimum clicks required for prestige.
 * @returns True if the player is ready for prestige.
 */
export function isPrestigeReady(clicks: number, threshold: number): boolean {
  return clicks >= threshold
}

/**
 * Formats a multiplier value with two decimals and an x suffix.
 * @param m - The multiplier value.
 */
export function formatMultiplier(m: number): string {
  return `${m.toFixed(2)}x`
}

/**
 * Calculates total clicks per second from an array of upgrade values.
 * 
 * @param upgrades - Array of points-per-second values from various upgrades.
 * @returns Total clicks per second.
 */
export function calcClicksPerSecond(upgrades: number[]): number {
  return upgrades.reduce((sum, u) => sum + u, 0)
}

/**
 * Constrains a number between a lower and upper bound.
 *
 * @param v - The value to clamp.
 * @param lo - The lower bound.
 * @param hi - The upper bound.
 * @returns The clamped value.
 */
export function clampNumber(v: number, lo: number, hi: number): number {
  const low = Math.min(lo, hi)
  const high = Math.max(lo, hi)
  return Math.max(low, Math.min(high, v))
}

/**
 * Validates that a value is a non-negative integer click count.
 *  n - The number to validate.
 */
export function isValidClickCount(n: number): boolean {
  return Number.isInteger(n) && n >= 0
}

/**
 * Converts a part-over-total ratio into a rounded percentage.
 *  value - The partial value.
 *  total - The total value.
 */
export function toPercent(value: number, total: number): number {
  if (total === 0) return 0
  const percent = Math.round((value / total) * 100)
  return Math.max(0, Math.min(100, percent))
}

/**
 * Calculates the sum of an array of numbers.
 * 
 * @param arr - The array of numbers to sum.
 * @returns The total sum.
 */
export function sumArray(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

/**
 * Finds the maximum value in an array of numbers.
 *
 * @param arr - The array of numbers.
 * @returns The maximum value, or 0 if the array is empty.
 */
export function maxOfArray(arr: number[]): number {
  if (arr.length === 0) return 0
  return arr.slice(1).reduce((a, b) => Math.max(a, b), arr[0])
}

/**
 * Returns the plural form of a word based on a count.
 * 
 * @param count - The number to check.
 * @param singular - The singular form of the word.
 * @param plural - The plural form of the word.
 * @returns The appropriate form based on count.
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param s - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(s: string): string {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Formats a number as a percentage string with one decimal place.
 * 
 * @param value - The value to format (0-1 range expected).
 * @returns Formatted percentage string e.g. "45.2%".
 */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '0%'
  return `${(value * 100).toFixed(1)}%`
}

/** Returns true when value is a non-empty string after trimming. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Formats a duration in milliseconds as a human-readable string.
 * E.g. 90500 -> "1m 30s", 3600000 -> "1h 0m".
 *
 * @param ms - Duration in milliseconds.
 */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '0s'
  const totalSeconds = Math.floor(ms / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

/**
 * Truncates an Ethereum address for display purposes.
 * E.g. "0x1234...5678".
 *
 * @param address - The full 0x-prefixed address string.
 * @param prefixLen - Number of characters to show after "0x" prefix (default 4).
 * @param suffixLen - Number of characters to show at the end (default 4).
 */
export function truncateAddress(
  address: string,
  prefixLen = 4,
  suffixLen = 4
): string {
  if (!address || address.length < prefixLen + suffixLen + 2) return address
  return `${address.slice(0, prefixLen + 2)}...${address.slice(-suffixLen)}`
}

/**
 * Formats a bigint value as a compact display string with K/M/B suffixes.
 * E.g. 1_500_000n -> "1.5M".
 *
 * @param value - The bigint value to format.
 */
export function formatBigIntCompact(value: bigint): string {
  const n = Number(value)
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

/**
 * Returns a percentage string from a numerator and denominator.
 * E.g. percentageOf(3, 4) -> "75.0%"
 *
 * @param part - The numerator value.
 * @param total - The denominator value. Returns "0%" when zero.
 * @param decimals - Number of decimal places (default 1).
 */
export function percentageOf(part: number, total: number, decimals = 1): string {
  if (total === 0) return '0%'
  return `${((part / total) * 100).toFixed(decimals)}%`
}

/**
 * Pads a number string with leading zeroes up to a minimum width.
 * E.g. zeroPad(5, 3) -> "005".
 *
 * @param value - The numeric value to pad.
 * @param width - Minimum total width (default 2).
 */
export function zeroPad(value: number, width = 2): string {
  return String(Math.floor(value)).padStart(width, '0')
}

/**
 * Capitalises the first character of a string and lowercases the rest.
 *
 * @param str - Input string.
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts a snake_case or kebab-case identifier to Title Case.
 * E.g. "auto_clicker" -> "Auto Clicker".
 *
 * @param str - The identifier string.
 */
export function identifierToTitle(str: string): string {
  return str
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Returns a relative time string from a past Unix timestamp in seconds.
 * E.g. "2 hours ago", "just now".
 *
 * @param timestampSec - Unix timestamp in seconds.
 */
export function relativeTime(timestampSec: number): string {
  const diffSec = Math.floor(Date.now() / 1000) - timestampSec
  if (diffSec < 10) return 'just now'
  if (diffSec < 60) return `${diffSec}s ago`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  return `${diffDay}d ago`
}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value - The value to clamp.
 * @param min - Lower bound.
 * @param max - Upper bound.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linearly interpolates between two numbers.
 * Returns start when t=0, end when t=1.
 *
 * @param start - Starting value.
 * @param end - Ending value.
 * @param t - Interpolation factor, typically in [0, 1].
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/** Returns the minimum value in a numeric array. */
export function minOfArray(arr: number[]): number {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0]
  return arr.reduce((min, v) => v < min ? v : min, arr[0])
}

/** Returns the average of a numeric array. */
export function avgOfArray(arr: number[]): number {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0]
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

/** Filters out NaN and Infinity from a numeric array. */
export function filterFinite(arr: number[]): number[] {
  return arr.filter(v => Number.isFinite(v))
}

/** Counts elements in an array satisfying a predicate. */
export function countWhere<T>(arr: T[], predicate: (item: T) => boolean): number {
  return arr.filter(predicate).length
}

/** Rounds a number to the given decimal places. */
export function roundToDecimalPlaces(value: number, places: number): number {
  const factor = Math.pow(10, places)
  return Math.round(value * factor) / factor
}

/** Returns the sum of a numeric array. */
export function sumArray(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

/** Returns median value of a numeric array. */
export function medianOfArray(arr: number[]): number {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const isOdd = sorted.length % 2 !== 0
  return isOdd ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

/** Clamps a number between min and max inclusive. */
export function clampNum(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Normalizes an array of numbers to the [0, 1] range. */
export function normalizeArray(arr: number[]): number[] {
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  if (max === min) return arr.map(() => 0)
  return arr.map(v => (v - min) / (max - min))
}

/** Returns true if all numbers in array are positive. */
export function allPositive(arr: number[]): boolean {
  return arr.every(v => v > 0)
}

/** Merges prestige and combo multipliers for total click value. */
export function calcCombinedClickValue(base: number, prestige: number, combo: number): number {
  return base * prestige * combo
}

/** Calculates auto-clicker income over a time period in ms. */
export function calcAutoClickerIncome(cps: number, ms: number): number {
  return cps * (ms / 1000)
}

/** Returns the next prestige threshold based on current level. */
export function getNextPrestigeThreshold(level: number, base: number): number {
  return base * Math.pow(2, level)
}

/** Returns a display label for an upgrade type. */
export function getUpgradeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ")
}

/** Formats a bonus as a signed display string. */
export function formatBonus(value: number): string {
  const sign = value >= 0 ? "+" : ""
  const pct = value + "%"
  return sign + pct
}

/** Checks if the player can afford an upgrade. */
export function canAffordUpgrade(balance: number, cost: number): boolean {
  return balance >= cost
}

/** Returns combo timeout scaled by prestige level. */
export function calcComboTimeout(base: number, prestige: number): number {
  return Math.max(500, base - prestige * 100)
}

/** Returns true if a click should be a bonus click. */
export function isBonusClick(random: () => number, chance: number): boolean {
  return random() < chance
}

/** Calculates total earnings from manual and auto income. */
export function calcTotalEarnings(manual: number, auto: number, ms: number, cps: number): number {
  return manual + auto + calcAutoClickerIncome(cps, ms)
}

/** Returns an achievement tier label based on click count milestones. */
export function getAchievementTier(clicks: number): string {
  if (clicks >= 1000000) return "legendary"
  if (clicks >= 100000) return "epic"
  if (clicks >= 10000) return "rare"
  return "common"
}

/** Checks if the player can afford an upgrade. */
export function canAffordUpgrade(balance: number, cost: number): boolean {
  return balance >= cost
}
