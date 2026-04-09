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
})
