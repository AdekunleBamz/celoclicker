import { describe, expect, it } from 'vitest'
import {
  getDefaultFeeCurrencyId,
  getFeeCurrencies,
  getFeeCurrencyById,
} from '../lib/feeCurrencies'
import { CELO_MAINNET_CHAIN_ID } from '../lib/constants'

describe('lib/feeCurrencies getFeeCurrencies', () => {
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
})

describe('lib/feeCurrencies getDefaultFeeCurrencyId', () => {
  it('prefers USDC inside MiniPay on Celo mainnet', () => {
    expect(getDefaultFeeCurrencyId(true, CELO_MAINNET_CHAIN_ID)).toBe('USDC')
  })
})
