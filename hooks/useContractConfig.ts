import { useMemo } from 'react'
import { celoClickerABI } from '@/lib/abis'
import { isValidAddress, isZeroAddress, ZERO_ADDRESS } from '@/lib/utils'

/**
 * Resolves and normalizes a contract address from an optional env value.
 */
export function resolveContractAddress(value?: string): `0x${string}` {
  const normalized = value?.trim() || ZERO_ADDRESS
  return normalized.toLowerCase() as `0x${string}`
}

/**
 * Returns true when a resolved contract address can be safely used in the app.
 */
export function isConfiguredContractAddress(address: string): boolean {
  return isValidAddress(address) && !isZeroAddress(address)
}

/**
 * Returns a short UI status label for contract configuration state.
 */
export function getContractConfigStatusLabel(isValid: boolean): string {
  return isValid ? 'Configured' : 'Not configured'
}

/**
 * Provides the current CeloClicker contract configuration.
 * Resolves the address from environment variables and checks its validity.
 * 
 * @returns An object containing the contract address, ABI, and an isValid boolean flag.
 */
export function useContractConfig(): {
  address: `0x${string}`
  abi: typeof celoClickerABI
  isValid: boolean
} {
  const contractAddress = resolveContractAddress(process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT)

  const isValid = useMemo(() => {
    return isConfiguredContractAddress(contractAddress)
  }, [contractAddress])

  return {
    address: contractAddress,
    abi: celoClickerABI,
    isValid,
  }
}
