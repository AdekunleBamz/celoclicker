import { useMemo } from 'react'
import { celoClickerABI } from '@/lib/abis'
import { isValidAddress, isZeroAddress, ZERO_ADDRESS } from '@/lib/utils'

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
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT || ZERO_ADDRESS

  const isValid = useMemo(() => {
    return isValidAddress(contractAddress) && !isZeroAddress(contractAddress)
  }, [contractAddress])

  return {
    address: contractAddress as `0x${string}`,
    abi: celoClickerABI,
    isValid,
  }
}
