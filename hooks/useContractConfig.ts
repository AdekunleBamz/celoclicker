import { useMemo } from 'react'
import { celoClickerABI } from '@/lib/abis'
import { isValidAddress, isZeroAddress, ZERO_ADDRESS } from '@/lib/utils'

/**
 * Hook to get contract configuration including address, ABI, and validity status
 * @returns Object containing contract address, ABI, and validity flag
 */
export function useContractConfig() {
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT?.trim() || ZERO_ADDRESS
  
  const isValid = useMemo(() => {
    return isValidAddress(contractAddress) && !isZeroAddress(contractAddress)
  }, [contractAddress])

  return {
    address: contractAddress as `0x${string}`,
    abi: celoClickerABI,
    isValid,
  }
}
