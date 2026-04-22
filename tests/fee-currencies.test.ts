import { describe, expect, it } from 'vitest'
import {
  getAvailableFeeCurrencies,
  getDefaultFeeCurrencyId,
  getFeeCurrencies,
  getFeeCurrencyAddress,
  getFeeCurrencyById,
  getFeeCurrencyLabel,
  isFeeCurrencyAvailable,
} from '../lib/feeCurrencies'
import { CELO_MAINNET_CHAIN_ID } from '../lib/constants'

describe('lib/feeCurrencies getFeeCurrencies', () => {
  it('always returns both CELO and USDC options', () => {
    expect(getFeeCurrencies(CELO_MAINNET_CHAIN_ID)).toHaveLength(2)
  })

  it('exposes USDC gas payments on Celo mainnet', () => {
    const usdcCurrency = getFeeCurrencies(CELO_MAINNET_CHAIN_ID).find((currency) => currency.id === 'USDC')

    expect(usdcCurrency).toMatchObject({
      id: 'USDC',
      isAvailable: true,
      symbol: 'USDCm',
    })
  })

  it('hides USDC gas payments off mainnet', () => {
    const usdcCurrency = getFeeCurrencies(44787).find((currency) => currency.id === 'USDC')

    expect(usdcCurrency).toMatchObject({
      id: 'USDC',
      isAvailable: false,
    })
    expect(usdcCurrency?.feeCurrency).toBeUndefined()
  })

  it('keeps USDC unavailable when chain id is missing', () => {
    const usdcCurrency = getFeeCurrencies().find((currency) => currency.id === 'USDC')
    expect(usdcCurrency?.isAvailable).toBe(false)
  })
})

describe('lib/feeCurrencies getDefaultFeeCurrencyId', () => {
  it('prefers USDC inside MiniPay on Celo mainnet', () => {
    expect(getDefaultFeeCurrencyId(true, CELO_MAINNET_CHAIN_ID)).toBe('USDC')
  })

  it('falls back to CELO inside MiniPay off mainnet', () => {
    expect(getDefaultFeeCurrencyId(true, 44787)).toBe('CELO')
  })

  it('defaults to CELO for non-MiniPay sessions', () => {
    expect(getDefaultFeeCurrencyId(false, CELO_MAINNET_CHAIN_ID)).toBe('CELO')
  })
})

describe('lib/feeCurrencies getFeeCurrencyById', () => {
  it('returns the CELO fee option', () => {
    expect(getFeeCurrencyById('CELO', CELO_MAINNET_CHAIN_ID)).toMatchObject({
      id: 'CELO',
      isAvailable: true,
      symbol: 'CELO',
    })
  })

  it('returns USDC without fee addresses off mainnet', () => {
    expect(getFeeCurrencyById('USDC', 44787)).toMatchObject({
      id: 'USDC',
      isAvailable: false,
      feeCurrency: undefined,
    })
  })

  it('returns USDC fee addresses on Celo mainnet', () => {
    expect(getFeeCurrencyById('USDC', CELO_MAINNET_CHAIN_ID)).toMatchObject({
      id: 'USDC',
      isAvailable: true,
      feeCurrency: expect.stringMatching(/^0x[a-fA-F0-9]{40}$/),
    })
  })
})

describe('lib/feeCurrencies isFeeCurrencyAvailable', () => {
  it('returns false for USDC off mainnet', () => {
    expect(isFeeCurrencyAvailable('USDC', 44787)).toBe(false)
  })

  it('returns true for USDC on Celo mainnet', () => {
    expect(isFeeCurrencyAvailable('USDC', CELO_MAINNET_CHAIN_ID)).toBe(true)
  })

  it('returns true for CELO across supported chains', () => {
    expect(isFeeCurrencyAvailable('CELO', 44787)).toBe(true)
  })

  it('returns true for CELO when chain id is missing', () => {
    expect(isFeeCurrencyAvailable('CELO')).toBe(true)
  })
})

describe('lib/feeCurrencies getAvailableFeeCurrencies', () => {
  it('includes CELO and USDC on Celo mainnet', () => {
    expect(getAvailableFeeCurrencies(CELO_MAINNET_CHAIN_ID).map((currency) => currency.id)).toEqual(['CELO', 'USDC'])
  })

  it('keeps only CELO available off mainnet', () => {
    expect(getAvailableFeeCurrencies(44787).map((currency) => currency.id)).toEqual(['CELO'])
  })
})

describe('lib/feeCurrencies getFeeCurrencyLabel', () => {
  it('returns the CELO display label', () => {
    expect(getFeeCurrencyLabel('CELO', CELO_MAINNET_CHAIN_ID)).toBe('CELO')
  })
})
