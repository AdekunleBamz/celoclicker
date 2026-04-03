import type { Address } from 'viem'

export type FeeCurrencyId = 'CELO' | 'USDC'

export type FeeCurrencyConfig = {
  id: FeeCurrencyId
  label: string
  symbol: string
  description: string
  feeCurrency?: Address
  tokenAddress?: Address
  isAvailable: boolean
}

const CELO_MAINNET_CHAIN_ID = 42220
const USDC_MAINNET_TOKEN_ADDRESS = '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' as const
const USDC_MAINNET_ADAPTER_ADDRESS = '0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B' as const

export function getFeeCurrencies(chainId?: number): FeeCurrencyConfig[] {
  const usdcAvailable = chainId === CELO_MAINNET_CHAIN_ID

  return [
    {
      id: 'CELO',
      label: 'CELO',
      symbol: 'CELO',
      description: 'Pay gas with native CELO on web or mobile.',
      isAvailable: true,
    },
    {
      id: 'USDC',
      label: 'USDCm',
      symbol: 'USDC',
      description: usdcAvailable
        ? 'Pay gas with the MiniPay-friendly USDC fee adapter on Celo mainnet.'
        : 'USDC gas mode is only available on Celo mainnet.',
      feeCurrency: usdcAvailable ? USDC_MAINNET_ADAPTER_ADDRESS : undefined,
      tokenAddress: usdcAvailable ? USDC_MAINNET_TOKEN_ADDRESS : undefined,
      isAvailable: usdcAvailable,
    },
  ]
}

export function getDefaultFeeCurrencyId(isMiniPay: boolean, chainId?: number): FeeCurrencyId {
  const usdcCurrency = getFeeCurrencies(chainId).find((currency) => currency.id === 'USDC')

  if (isMiniPay && usdcCurrency?.isAvailable) {
    return 'USDC'
  }

  return 'CELO'
}

export function getFeeCurrencyById(id: FeeCurrencyId, chainId?: number) {
  return getFeeCurrencies(chainId).find((currency) => currency.id === id)
}
