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
    return isValidAddress(contractAddress) && !isZeroAddress(contractAddress)
  }, [contractAddress])

  return {
    address: contractAddress,
    abi: celoClickerABI,
    isValid,
  }
}
