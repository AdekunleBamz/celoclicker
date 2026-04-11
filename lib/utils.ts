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
  
  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(2) + 'B'
  }
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(2) + 'M'
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(2) + 'K'
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
  if (!normalizedAddress || normalizedAddress.length < 10) return normalizedAddress
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

  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return `0 ${symbol ?? ''}`.trim()
  }

  const decimals = numericValue >= 100 ? 2 : numericValue >= 1 ? 3 : 4
  const formattedValue = numericValue.toFixed(decimals).replace(/\.?0+$/, '')

  return `${formattedValue} ${symbol ?? ''}`.trim()
}

/**
 * Validates if a string is a valid Ethereum address format
 * @param address - The address string to validate
 * @returns True if the address is a valid Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
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
