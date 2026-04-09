/**
 * Format large numbers with K, M, B suffixes
 */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function formatNumber(num: bigint | number): string {
  const n = typeof num === 'bigint' ? Number(num) : num

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
 * Format address for display
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format wallet balances without overwhelming the UI
 */
export function formatTokenAmount(value?: string, symbol?: string): string {
  if (!value) {
    return `0 ${symbol ?? ''}`.trim()
  }

  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return `0 ${symbol ?? ''}`.trim()
  }

  const absoluteValue = Math.abs(numericValue)
  const decimals =
    absoluteValue >= 100 ? 2 :
    absoluteValue >= 1 ? 3 :
    absoluteValue >= 0.01 ? 4 : 6
  const formattedValue = numericValue.toFixed(decimals).replace(/\.?0+$/, '')

  return `${formattedValue} ${symbol ?? ''}`.trim()
}

/**
 * Validate contract address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function isZeroAddress(address: string): boolean {
  return address.toLowerCase() === ZERO_ADDRESS
}
