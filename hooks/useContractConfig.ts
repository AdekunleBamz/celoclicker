import { useMemo } from 'react'
import { celoClickerABI } from '@/lib/abis'
import { isValidAddress } from '@/lib/utils'

export function useContractConfig() {
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT || '0x0000000000000000000000000000000000000000'
  
  const isValid = useMemo(() => {
    return isValidAddress(contractAddress) && contractAddress !== '0x0000000000000000000000000000000000000000'
  }, [contractAddress])

  return {
    address: contractAddress as `0x${string}`,
    abi: celoClickerABI,
    isValid,
  }
}

