import { describe, expect, it, vi } from 'vitest'
import { getInjectedConnector, isMiniPayBrowser } from '../hooks/useMiniPay'

describe('hooks/useMiniPay isMiniPayBrowser', () => {
  it('returns false when window is undefined', () => {
    const hadWindow = 'window' in globalThis
    const originalWindow = (globalThis as { window?: unknown }).window

    delete (globalThis as { window?: unknown }).window
    expect(isMiniPayBrowser()).toBe(false)

    if (hadWindow) {
      ;(globalThis as { window?: unknown }).window = originalWindow
    }
  })

  it('returns false when window.ethereum is unavailable', () => {
    vi.stubGlobal('window', {})
    expect(isMiniPayBrowser()).toBe(false)
  })

  it('returns false when provider is present without MiniPay flag', () => {
    vi.stubGlobal('window', { ethereum: {} })
    expect(isMiniPayBrowser()).toBe(false)
  })

  it('returns true when ethereum provider exposes isMiniPay', () => {
    vi.stubGlobal('window', { ethereum: { isMiniPay: true } })
    expect(isMiniPayBrowser()).toBe(true)
  })
})

describe('hooks/useMiniPay getInjectedConnector', () => {
  it('prefers connectors marked as injected', () => {
    const connector = getInjectedConnector([
      { id: 'walletconnect', type: 'walletConnect' },
      { id: 'injected', type: 'injected' },
    ] as never)

    expect(connector).toMatchObject({ id: 'injected' })
  })

  it('matches connectors by id when type is not injected', () => {
    const connector = getInjectedConnector([
      { id: 'walletconnect', type: 'walletConnect' },
      { id: 'injected', type: 'metaMask' },
    ] as never)

    expect(connector).toMatchObject({ id: 'injected' })
  })

  it('returns undefined when no injected connector is available', () => {
    const connector = getInjectedConnector([
      { id: 'walletconnect', type: 'walletConnect' },
      { id: 'coinbase', type: 'coinbaseWallet' },
    ] as never)

    expect(connector).toBeUndefined()
  })
})
