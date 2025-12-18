/**
 * Format large numbers with K, M, B suffixes
 */
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
 * Validate contract address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

