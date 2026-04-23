import { useEffect, useState, useCallback } from 'react'
import type { Connector } from 'wagmi'

type MiniPayEthereum = {
  isMiniPay?: boolean
}

/**
 * Get the ethereum provider from window if available
 */
function getEthereum() {
  if (typeof window === 'undefined') {
    return null
  }

  return (window as Window & { ethereum?: MiniPayEthereum }).ethereum ?? null
}

/**
 * Check if running inside MiniPay browser
 */
export function isMiniPayBrowser() {
  return Boolean(getEthereum()?.isMiniPay)
}

/**
 * Get the injected wallet connector from available connectors
 */
export function getInjectedConnector(connectors: readonly Connector[]) {
  return connectors.find((connector) => {
    return connector.type === 'injected' || connector.id === 'injected'
  })
}

/**
 * Hook to detect if running inside MiniPay browser
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

    // Poll for 5s in case the provider is injected after initial render
    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      if (isMiniPayBrowser()) {
        clearInterval(timer)
        setIsMiniPay(true)
      } else if (attempts >= 20) {
        clearInterval(timer)
      }
    }, 250)

    return () => {
      clearInterval(timer)
      window.removeEventListener('focus', refreshDetection)
      window.removeEventListener('ethereum#initialized', refreshDetection as EventListener)
    }
  }, [refreshDetection])

  return isMiniPay
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
  return connectors.some(c => c.id === idOrType || c.type === idOrType)
}

/**
 * Returns a human-readable label for the current browser/wallet environment.
 * Returns 'MiniPay' inside the MiniPay app, otherwise 'Browser'.
 */
export function getWalletEnvironmentLabel(): string {
  return isMiniPayBrowser() ? 'MiniPay' : 'Browser'
}
