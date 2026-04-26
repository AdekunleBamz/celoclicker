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
