import { afterEach, describe, expect, it } from 'vitest'
import { validateContractAddress, validateEnvironment } from '../lib/validation'

const originalContractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
const originalWalletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

afterEach(() => {
  if (originalContractAddress === undefined) {
    delete process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
  } else {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = originalContractAddress
  }

  if (originalWalletConnectProjectId === undefined) {
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  } else {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = originalWalletConnectProjectId
  }
})

describe('lib/validation validateContractAddress', () => {
  it('rejects blank contract addresses', () => {
    expect(validateContractAddress('')).toBe(false)
  })
})

describe('lib/validation validateEnvironment', () => {
  it('reports a missing contract address', () => {
    delete process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'wallet-connect-id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_CELOCLICKER_CONTRACT is not set'],
    })
  })
})
