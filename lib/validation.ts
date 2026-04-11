/**
 * Validation utilities for CeloClicker
 * @module validation
 */
import { CONTRACT_ADDRESS_ENV_KEY } from './constants'
import { isValidAddress, isZeroAddress } from './utils'

/**
 * Validates if a string is a valid Ethereum contract address format
 * @param address - The address string to validate
 * @returns True if the address is a valid Ethereum address format
 */
export function validateContractAddress(address: string): boolean {
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''
  if (!normalizedAddress) return false
  if (isZeroAddress(normalizedAddress)) return false
  return isValidAddress(normalizedAddress)
}

/**
 * Validates that all required environment variables are set and valid
 * @returns An object containing validation status and any error messages
 */
export function validateEnvironment(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT?.trim()
  if (!contractAddress) {
    errors.push(`${CONTRACT_ADDRESS_ENV_KEY} is not set`)
  } else if (!validateContractAddress(contractAddress)) {
    errors.push(`${CONTRACT_ADDRESS_ENV_KEY} is not a valid address`)
  }
  
  const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim()
  if (!walletConnectId) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set')
  } else {
    const normalizedProjectId = walletConnectId.toLowerCase()
    const placeholderIds = new Set([
      'your_project_id',
      'your_project_id_here',
      'walletconnect_project_id',
    ])

    if (placeholderIds.has(normalizedProjectId)) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}
