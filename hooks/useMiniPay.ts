import { useEffect, useState, useCallback } from 'react'
import type { Connector } from 'wagmi'

type MiniPayEthereum = {
  isMiniPay?: boolean
}

/**
 * Get the ethereum provider from window if available.
 * Returns null if not in a browser environment or provider is missing.
 */
function getEthereum() {
  if (typeof window === 'undefined') {
    return null
  }

  return (window as Window & { ethereum?: MiniPayEthereum }).ethereum ?? null
}

/**
 * Check if the current environment is the MiniPay browser.
 * Uses the window.ethereum.isMiniPay flag.
 * 
 * @returns True if inside MiniPay.
 */
export function isMiniPayBrowser() {
  return Boolean(getEthereum()?.isMiniPay)
}

/**
 * Get the injected wallet connector from available connectors.
 * 
 * @param connectors - Array of wagmi connectors.
 * @returns The injected connector if found, undefined otherwise.
 */
export function getInjectedConnector(connectors: readonly Connector[]) {
  return connectors.find((connector) => {
    return connector.type === 'injected' || connector.id === 'injected'
  })
}

/**
 * Hook to detect if running inside MiniPay browser.
 * Listens for window focus and ethereum initialization events to refresh.
 * @returns boolean true if inside MiniPay.
 */
export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(() => isMiniPayBrowser())

  const refreshDetection = useCallback(() => {
    setIsMiniPay(isMiniPayBrowser())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    refreshDetection()
    window.addEventListener('focus', refreshDetection)
    window.addEventListener('ethereum#initialized', refreshDetection as EventListener)

    return () => {
      window.removeEventListener('focus', refreshDetection)
      window.removeEventListener('ethereum#initialized', refreshDetection as EventListener)
    }
  }, [refreshDetection])

  return isMiniPay
}

/**
 * Hook to automatically connect to the injected wallet when inside MiniPay.
 * 
 * @param connectors - Available connectors.
 * @param connect - Connect function from useConnect.
 * @param isConnected - Connection status from useAccount.
 * @param isConnecting - Pending status from useConnect.
 */
export function useMiniPayAutoConnect(
  connectors: readonly Connector[],
  connect: (args: { connector: Connector }) => void,
  isConnected: boolean,
  isConnecting: boolean
) {
  const isMiniPay = useMiniPay()
  const [hasAttempted, setHasAttempted] = useState(false)

  useEffect(() => {
    if (!isMiniPay || isConnected || isConnecting || hasAttempted) {
      return
    }

    const injected = getInjectedConnector(connectors)
    if (injected) {
      setHasAttempted(true)
      connect({ connector: injected })
    }
  }, [isMiniPay, isConnected, isConnecting, hasAttempted, connectors, connect])
}

/**
 * Returns the current window.ethereum provider object if accessible, or null.
 * Useful for direct provider interactions without wagmi.
 */
export function getEthereumProvider(): MiniPayEthereum | null {
  return getEthereum()
}

/**
 * Returns true when an injected connector with the given connector type or id is available.
 *
 * @param connectors - The list of wagmi connectors.
 * @param idOrType - The connector id or type string to search for.
 */
export function hasConnector(connectors: readonly import('wagmi').Connector[], idOrType: string): boolean {
  const normalizedTarget = idOrType.trim().toLowerCase()
  return connectors.some((c) => c.id.toLowerCase() === normalizedTarget || c.type.toLowerCase() === normalizedTarget)
}

/**
 * Returns a human-readable label for the current browser/wallet environment.
 * Returns 'MiniPay' inside the MiniPay app, otherwise 'Browser'.
 */
export function getWalletEnvironmentLabel(): string {
  return isMiniPayBrowser() ? 'MiniPay' : 'Browser'
}
