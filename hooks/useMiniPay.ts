import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const refreshDetection = () => {
      setIsMiniPay(isMiniPayBrowser())
    }

    refreshDetection()
    window.addEventListener('focus', refreshDetection)
    window.addEventListener('ethereum#initialized', refreshDetection as EventListener)

    return () => {
      window.removeEventListener('focus', refreshDetection)
      window.removeEventListener('ethereum#initialized', refreshDetection as EventListener)
    }
  }, [])

  return isMiniPay
}
