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

/** 
 * USDC token address on Celo mainnet.
 * This is the standard Mento-wrapped USDC (USDCm).
 */
const USDC_MAINNET_TOKEN_ADDRESS = '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' as const

/** 
 * USDC fee adapter address on Celo mainnet.
 * Used for paying gas fees in USDC via Celo's native fee currency abstraction.
 */
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
 * Returns only the fee currencies that are available on the provided chain.
 *
 * @param chainId - The chain ID to filter against.
 */
export function getAvailableFeeCurrencies(chainId?: number): FeeCurrencyConfig[] {
  return getFeeCurrencies(chainId).filter(c => c.isAvailable)
}

/**
 * Returns a human-readable label for the given fee currency id.
 * Falls back to the id itself when no matching config is found.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID used to resolve availability.
 */
export function getFeeCurrencyLabel(id: FeeCurrencyId, chainId?: number): string {
  return getFeeCurrencyById(id, chainId)?.label ?? id
}

/**
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
export function getFeeCurrencyById(
  id: FeeCurrencyId,
  chainId?: number
): FeeCurrencyConfig | undefined {
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

/**
 * Returns the fee address (for Celo fee abstraction) of the given fee currency, or undefined
 * when the currency does not support fee abstraction on the current chain.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID used to determine availability.
 */
export function getFeeCurrencyAddress(
  id: FeeCurrencyId,
  chainId?: number
): `0x${string}` | undefined {
  return getFeeCurrencyById(id, chainId)?.feeCurrency
}

/**
 * Returns the CELO fee currency config, which is always available as the fallback.
 *
 * @param chainId - Optional chain ID passed through to the resolver.
 */
export function getFallbackFeeCurrency(chainId?: number): FeeCurrencyConfig {
  return getFeeCurrencies(chainId)[0]
}

/**
 * Returns the symbol for a fee currency id.
 * Falls back to the id string when the currency is not found.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID for availability resolution.
 */
export function getFeeCurrencySymbol(id: FeeCurrencyId, chainId?: number): string {
  return getFeeCurrencyById(id, chainId)?.symbol ?? id
}

/**
 * Returns the description string for the given fee currency.
 * Falls back to an empty string when not found.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID for availability resolution.
 */
export function getFeeCurrencyDescription(id: FeeCurrencyId, chainId?: number): string {
  return getFeeCurrencyById(id, chainId)?.description ?? ''
}

/**
 * Returns the ERC-20 token address used for balance queries for the given fee currency.
 * Returns undefined when the currency has no associated token address.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID for availability resolution.
 */
export function getFeeCurrencyTokenAddress(
  id: FeeCurrencyId,
  chainId?: number
): Address | undefined {
  return getFeeCurrencyById(id, chainId)?.tokenAddress
}

/**
 * Returns true when the given fee currency id is the native CELO token.
 *
 * @param id - The fee currency identifier.
 */
export function isCeloNativeCurrency(id: FeeCurrencyId): boolean {
  return id === 'CELO'
}

/**
 * Returns an array of all supported fee currency IDs regardless of chain.
 */
export function getAllFeeCurrencyIds(): FeeCurrencyId[] {
  return getFeeCurrencies().map((c) => c.id)
}

/**
 * Returns true when the given fee currency id is USDC.
 *
 * @param id - The fee currency identifier.
 */
export function isUSDCFeeCurrency(id: FeeCurrencyId): boolean {
  return id === 'USDC'
}

/**
 * Returns the user-facing display name (label) for a fee currency.
 * When the currency is unavailable on the current chain the id is returned instead.
 *
 * @param id - The fee currency identifier.
 * @param chainId - Optional chain ID for availability resolution.
 */
export function getFeeCurrencyDisplayName(id: FeeCurrencyId, chainId?: number): string {
  const config = getFeeCurrencyById(id, chainId)
  if (!config || !config.isAvailable) return id
  return config.label
}

/**
 * Counts how many fee currencies are available on the given chain.
 *
 * @param chainId - Optional chain ID.
 */
export function countAvailableFeeCurrencies(chainId?: number): number {
  return getAvailableFeeCurrencies(chainId).length
}

/**
 * Looks up a fee currency config by its fee abstraction address.
 * Returns undefined when no currency uses that address.
 *
 * @param address - The fee currency (adapter) address.
 * @param chainId - Optional chain ID for availability resolution.
 */
export function getFeeCurrencyByAddress(
  address: Address,
  chainId?: number
): FeeCurrencyConfig | undefined {
  return getFeeCurrencies(chainId).find(
    (c) => c.feeCurrency?.toLowerCase() === address.toLowerCase()
  )
}
