import { useAccount } from 'wagmi'

/**
 * A simple hook to get the connection status of the user's wallet.
 * @returns An object with address, isConnected, and isConnecting properties.
 */
export function useConnection(): {
  address: string | undefined
  isConnected: boolean
  isConnecting: boolean
  isReconnecting: boolean
  hasAddress: boolean
  isDisconnected: boolean
} {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  
  return {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    /** Shorthand for checking if the user has an address. */
    hasAddress: !!address,
    /** Shorthand for checking if the wallet is currently disconnected. */
    isDisconnected: !isConnected && !isConnecting,
  }
}

/**
 * Returns a short display string for the connection state.
 * E.g. "Connected", "Connecting…", "Disconnected".
 *
 * @param isConnected - Whether the wallet is connected.
 * @param isConnecting - Whether a connection attempt is in progress.
 */
export function connectionStateLabel(isConnected: boolean, isConnecting: boolean): string {
  if (isConnected) return 'Connected'
  if (isConnecting) return 'Connecting…'
  return 'Disconnected'
}

/**
 * Returns true when any async wallet operation is in progress
 * (connecting or reconnecting).
 *
 * @param isConnecting - Pending connection flag.
 * @param isReconnecting - Pending reconnection flag.
 */
export function isWalletBusy(isConnecting: boolean, isReconnecting: boolean): boolean {
  return isConnecting || isReconnecting
}

/**
 * Normalises a wallet address to lowercase for consistent comparisons.
 * Returns undefined when address is not provided.
 *
 * @param address - The 0x-prefixed wallet address.
 */
export function normaliseAddress(address: string | undefined): string | undefined {
  return address ? address.toLowerCase() : undefined
}

/**
 * Returns true when two wallet addresses refer to the same account
 * using a case-insensitive comparison.
 *
 * @param a - First address.
 * @param b - Second address.
 */
export function isSameAddress(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false
  return a.toLowerCase() === b.toLowerCase()
}

/**
 * Returns true when an address string has a valid 0x-prefixed hex format.
 * Does not validate the checksum.
 *
 * @param address - The address string to validate.
 */
export function isValidAddressFormat(address: string | undefined): boolean {
  if (!address) return false
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}

/**
 * Returns a masked version of the address suitable for accessibility labels.
 * E.g. "0xAbCd...1234" -> "wallet ending in 1234".
 *
 * @param address - The wallet address string.
 */
export function addressAccessibilityLabel(address: string | undefined): string {
  if (!address || address.length < 8) return 'unknown wallet'
  return `wallet ending in ${address.slice(-4)}`
}

/**
 * Returns a colour class name based on connection state for use in status badges.
 *
 * @param isConnected - Whether the wallet is connected.
 * @param isConnecting - Whether a connection attempt is in progress.
 */
export function connectionStatusColor(isConnected: boolean, isConnecting: boolean): string {
  if (isConnected) return 'text-green-400'
  if (isConnecting) return 'text-yellow-400'
  return 'text-red-400'
}

/**
 * Returns an emoji indicator for the current connection state.
 *
 * @param isConnected - Whether the wallet is connected.
 * @param isConnecting - Whether a connection is being established.
 */
export function connectionStatusEmoji(isConnected: boolean, isConnecting: boolean): string {
  if (isConnected) return '🟢'
  if (isConnecting) return '🟡'
  return '🔴'
}

/**
 * Returns a shortened version of the wallet address for compact UI display.
 * Returns "Not connected" when address is absent.
 *
 * @param address - The wallet address string.
 */
export function shortAddress(address: string | undefined): string {
  if (!address) return 'Not connected'
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

/**
 * Returns true when the provided address matches the currently connected wallet.
 *
 * @param connectedAddress - The active wallet address from the hook.
 * @param targetAddress - The address to compare against.
 */
export function isCurrentUser(
  connectedAddress: string | undefined,
  targetAddress: string | undefined
): boolean {
  if (!connectedAddress || !targetAddress) return false
  return connectedAddress.toLowerCase() === targetAddress.toLowerCase()
}
