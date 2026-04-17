import type { Address } from 'viem'
import { CELO_MAINNET_CHAIN_ID } from './constants'

/** Fee currency identifier type */
export type FeeCurrencyId = 'CELO' | 'USDC'

/** Configuration for a fee currency option */
export type FeeCurrencyConfig = {
  /** Unique identifier for the currency */
  id: FeeCurrencyId
  /** Display label for the currency */
  label: string
  /** Currency symbol */
  symbol: string
  /** Description of the currency */
  description: string
  /** Optional fee currency address for Celo fee abstraction */
  feeCurrency?: Address
  /** Optional token address for balance queries */
  tokenAddress?: Address
  /** Whether this currency is available on the current chain */
  isAvailable: boolean
}

/** USDC token address on Celo mainnet */
const USDC_MAINNET_TOKEN_ADDRESS = '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' as const

/** USDC fee adapter address on Celo mainnet */
const USDC_MAINNET_ADAPTER_ADDRESS = '0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B' as const

/**
 * Get available fee currency options for the given chain
 * @param chainId - Optional chain ID to determine availability
 * @returns Array of available fee currency configurations
 */
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
      symbol: 'USDCm',
      description: usdcAvailable
        ? 'Pay gas with the MiniPay-friendly USDC fee adapter on Celo mainnet.'
        : 'USDC gas mode is only available on Celo mainnet.',
      feeCurrency: usdcAvailable ? USDC_MAINNET_ADAPTER_ADDRESS : undefined,
      tokenAddress: usdcAvailable ? USDC_MAINNET_TOKEN_ADDRESS : undefined,
      isAvailable: usdcAvailable,
    },
  ]
}

/**
 * Get the default fee currency ID based on environment
 * @param isMiniPay - Whether the app is running inside MiniPay
 * @param chainId - Optional chain ID to determine availability
 * @returns The default fee currency ID
 */
export function getDefaultFeeCurrencyId(isMiniPay: boolean, chainId?: number): FeeCurrencyId {
  const usdcCurrency = getFeeCurrencies(chainId).find((currency) => currency.id === 'USDC')

  if (isMiniPay && usdcCurrency?.isAvailable) {
    return 'USDC'
  }

  return 'CELO'
}

/**
 * Get fee currency configuration by ID
 * @param id - The fee currency ID to look up
 * @param chainId - Optional chain ID to determine availability
 * @returns The fee currency configuration or undefined if not found
 */
export function getFeeCurrencyById(id: FeeCurrencyId, chainId?: number) {
  return getFeeCurrencies(chainId).find((currency) => currency.id === id)
}

/**
 * Check if a specific fee currency is available on the given chain
 * @param id - The fee currency ID to check
 * @param chainId - Optional chain ID
 * @returns True if the currency is available
 */
export function isFeeCurrencyAvailable(id: FeeCurrencyId, chainId?: number): boolean {
  return getFeeCurrencyById(id, chainId)?.isAvailable ?? false
}
