import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getEthereumProvider,
  getInjectedConnector,
  isMiniPayEnvironment,
  isInjectedConnector,
  getWalletEnvironmentLabel,
  hasConnector,
  isMiniPayBrowser,
} from '../hooks/useMiniPay'

afterEach(() => {
  vi.unstubAllGlobals()
})

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

  it('matches connectors with uppercase injected identifiers', () => {
    const connector = getInjectedConnector([
      { id: 'INJECTED', type: 'METAMASK' },
    ] as never)

    expect(connector).toMatchObject({ id: 'INJECTED' })
  })

  it('returns undefined when no injected connector is available', () => {
    const connector = getInjectedConnector([
      { id: 'walletconnect', type: 'walletConnect' },
      { id: 'coinbase', type: 'coinbaseWallet' },
    ] as never)

    expect(connector).toBeUndefined()
  })
})

describe('hooks/useMiniPay getEthereumProvider', () => {
  it('returns null when no ethereum provider is present', () => {
    vi.stubGlobal('window', {})
    expect(getEthereumProvider()).toBeNull()
  })

  it('returns the current ethereum provider object', () => {
    const provider = { isMiniPay: true }
    vi.stubGlobal('window', { ethereum: provider })

    expect(getEthereumProvider()).toBe(provider)
  })
})

describe('hooks/useMiniPay hasConnector', () => {
  it('matches connectors by id', () => {
    expect(hasConnector([{ id: 'injected', type: 'wallet' }] as never, 'injected')).toBe(true)
  })

  it('matches connectors by type', () => {
    expect(hasConnector([{ id: 'browser', type: 'injected' }] as never, 'injected')).toBe(true)
  })

  it('returns false when connectors do not match', () => {
    expect(hasConnector([{ id: 'walletconnect', type: 'walletConnect' }] as never, 'injected')).toBe(false)
  })

  it('matches connector keys using trimmed case-insensitive input', () => {
    expect(hasConnector([{ id: 'WalletConnect', type: 'walletConnect' }] as never, '  walletconnect  ')).toBe(true)
  })
})

describe('hooks/useMiniPay getWalletEnvironmentLabel', () => {
  it('labels regular browser sessions', () => {
    vi.stubGlobal('window', {})
    expect(getWalletEnvironmentLabel()).toBe('Web Browser')
  })

  it('labels MiniPay browser sessions', () => {
    vi.stubGlobal('window', { ethereum: { isMiniPay: true } })
    expect(getWalletEnvironmentLabel()).toBe('MiniPay Wallet')
  })
})

describe('hooks/useMiniPay isMiniPayEnvironment', () => {
  it('returns false for non-MiniPay sessions', () => {
    vi.stubGlobal('window', {})
    expect(isMiniPayEnvironment()).toBe(false)
  })

  it('returns true when MiniPay provider is detected', () => {
    vi.stubGlobal('window', { ethereum: { isMiniPay: true } })
    expect(isMiniPayEnvironment()).toBe(true)
  })
})

describe('hooks/useMiniPay isInjectedConnector', () => {
  it('recognizes injected connectors by type', () => {
    expect(isInjectedConnector({ id: 'metamask', type: 'injected' } as never)).toBe(true)
  })

  it('recognizes injected connectors by id', () => {
    expect(isInjectedConnector({ id: 'INJECTED', type: 'wallet' } as never)).toBe(true)
  })
})
