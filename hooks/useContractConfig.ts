import { useMemo } from 'react'
import { celoClickerABI } from '@/lib/abis'
import { isValidAddress, isZeroAddress, ZERO_ADDRESS } from '@/lib/utils'
import { CELO_MAINNET_CHAIN_ID, CELO_TESTNET_CHAIN_ID } from '@/lib/constants'

/**
 * Hook to get contract configuration including address, ABI, and validity status
 * @returns Object containing contract address, ABI, and validity flag
 */
export function useContractConfig() {
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT?.trim() || ZERO_ADDRESS
  
  const isValid = useMemo(() => {
    return isValidAddress(contractAddress) && !isZeroAddress(contractAddress)
  }, [contractAddress])

  /** Expected chain ID for the deployed contract. */
  const configuredChainId = Number.parseInt(process.env.NEXT_PUBLIC_CHAIN_ID?.trim() || '', 10)
  const expectedChainId =
    configuredChainId === CELO_TESTNET_CHAIN_ID ? CELO_TESTNET_CHAIN_ID : CELO_MAINNET_CHAIN_ID

  /** Builds a Celo explorer URL for the configured contract address. */
  const explorerBase =
    expectedChainId === CELO_TESTNET_CHAIN_ID
      ? 'https://explorer.celo.org/alfajores/address'
      : 'https://explorer.celo.org/mainnet/address'
  const explorerUrl = isValid
    ? `${explorerBase}/${contractAddress}`
    : null

  return {
    address: contractAddress as `0x${string}`,
    abi: celoClickerABI,
    isValid,
    expectedChainId,
    explorerUrl,
  }
}
