/**
 * Ethereum zero address constant used for validation
 */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Formats a number with K, M, B suffixes for display
 * @param num - The number to format (bigint or number)
 * @returns Formatted string with suffix (e.g., "1.5K", "2.3M", "1B")
 */
export function formatNumber(num: bigint | number): string {
  const n = typeof num === 'bigint' ? Number(num) : num
  if (!Number.isFinite(n)) {
    return '0'
  }

  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''

  if (abs >= 1_000_000_000) {
    return sign + (abs / 1_000_000_000).toFixed(2) + 'B'
  }
  if (abs >= 1_000_000) {
    return sign + (abs / 1_000_000).toFixed(2) + 'M'
  }
  if (abs >= 1_000) {
    return sign + (abs / 1_000).toFixed(2) + 'K'
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
  const decimals = safeNumericValue >= 100 ? 2 : safeNumericValue >= 1 ? 3 : 4
  const formattedValue = safeNumericValue.toFixed(decimals).replace(/\.?0+$/, '')

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
 * Converts a value in CELO (18-decimal) to its wei representation as a bigint.
 *
 * @param celo - Amount in CELO (e.g. 1.5 = 1.5 CELO).
 */
export function celoToWei(celo: number): bigint {
  return BigInt(Math.round(celo * 1e18))
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
