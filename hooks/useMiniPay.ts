import { useState } from 'react'
import type { Connector } from 'wagmi'

type MiniPayEthereum = {
  isMiniPay?: boolean
}

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
  const [isMiniPay] = useState(() => isMiniPayBrowser())

  return isMiniPay
}
