import { describe, expect, it } from 'vitest'
import {
  getDefaultFeeCurrencyId,
  getFeeCurrencies,
  getFeeCurrencyById,
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
})

describe('lib/feeCurrencies isFeeCurrencyAvailable', () => {
  it('returns false for USDC off mainnet', () => {
    expect(isFeeCurrencyAvailable('USDC', 44787)).toBe(false)
  })

  it('returns true for USDC on Celo mainnet', () => {
    expect(isFeeCurrencyAvailable('USDC', CELO_MAINNET_CHAIN_ID)).toBe(true)
  })
})
