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

/** Returns a human-readable label for a wallet connection state. */
export function connectionStateLabel(state: string): string {
  const labels: Record<string, string> = {
    connected: "Connected",
    disconnected: "Disconnected",
    connecting: "Connecting...",
    reconnecting: "Reconnecting...",
  }
  return labels[state] ?? "Unknown"
}

/** Returns true if a wallet operation is in progress. */
export function isWalletBusy(status: string): boolean {
  return status === "connecting" || status === "reconnecting"
}

/** Normalises an Ethereum address to lowercase. */
export function normaliseAddress(address: string): string {
  return address.toLowerCase()
}

/** Returns true if an address matches the 0x + 40 hex char pattern. */
export function isValidAddressFormat(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}

/** Returns an accessibility-friendly label for a wallet address. */
export function addressAccessibilityLabel(address: string): string {
  return "Wallet " + address.slice(0, 6) + "..." + address.slice(-4)
}

/** Returns a CSS color string for a connection status. */
export function connectionStatusColor(status: string): string {
  if (status === "connected") return "#22c55e"
  if (status === "connecting" || status === "reconnecting") return "#f59e0b"
  return "#ef4444"
}

/** Returns an emoji indicator for a connection status. */
export function connectionStatusEmoji(status: string): string {
  if (status === "connected") return "🟢"
  if (status === "connecting" || status === "reconnecting") return "🟡"
  return "🔴"
}

/** Returns a display name for a wallet, preferring ENS or truncating address. */
export function walletDisplayName(address: string, ens?: string): string {
  return ens ? ens : address.slice(0, 6) + "..." + address.slice(-4)
}

/** Returns true if the wallet is currently in a reconnecting state. */
export function isReconnecting(status: string): boolean {
  return status === "reconnecting"
}

/** Returns a formatted error message for a connection failure. */
export function formatConnectionError(error: unknown): string {
  if (error instanceof Error) return "Connection failed: " + error.message
  return "Connection failed: unknown error"
}
