import { useEffect, useState } from 'react'
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

export function isMiniPayBrowser() {
  return Boolean(getEthereum()?.isMiniPay)
}

export function getInjectedConnector(connectors: readonly Connector[]) {
  return connectors.find((connector) => {
    return connector.type === 'injected' || connector.id === 'injected'
  })
}

export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false)

  useEffect(() => {
    setIsMiniPay(isMiniPayBrowser())
  }, [])

  return isMiniPay
}
