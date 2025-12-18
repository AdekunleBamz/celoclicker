/**
 * Validation utilities
 */

export function validateContractAddress(address: string): boolean {
  if (!address) return false
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function validateEnvironment(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  const contractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
  if (!contractAddress) {
    errors.push('NEXT_PUBLIC_CELOCLICKER_CONTRACT is not set')
  } else if (!validateContractAddress(contractAddress)) {
    errors.push('NEXT_PUBLIC_CELOCLICKER_CONTRACT is not a valid address')
  }
  
  const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  if (!walletConnectId) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

