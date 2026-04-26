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
