import { useAccount } from 'wagmi'

/**
 * A simple hook to get the connection status of the user's wallet.
 * @returns An object with address, isConnected, and isConnecting properties.
 */
export function useConnection() {
  const { address, isConnected, isConnecting } = useAccount()
  
  return {
    address,
    isConnected,
    isConnecting,
    /** Shorthand for checking if the user has an address. */
    hasAddress: !!address,
  }
}
