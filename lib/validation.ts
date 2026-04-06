/**
 * Validation utilities
 */
import { CONTRACT_ADDRESS_ENV_KEY } from './constants'
import { isValidAddress } from './utils'

/**
 * Validate a contract address format
 */
export function validateContractAddress(address: string): boolean {
  if (!address) return false
  return isValidAddress(address)
}

/**
 * Validate required environment variables
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
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}
