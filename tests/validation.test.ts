import { afterEach, describe, expect, it } from 'vitest'
import { isValidPlayerAddress, validateContractAddress, validateEnvironment } from '../lib/validation'

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

  it('accepts valid addresses with surrounding whitespace', () => {
    expect(validateContractAddress(' 0x1234567890123456789012345678901234567890 ')).toBe(true)
  })
})

describe('lib/validation isValidPlayerAddress', () => {
  it('accepts a valid address with surrounding whitespace', () => {
    expect(isValidPlayerAddress(' 0x1234567890123456789012345678901234567890 ')).toBe(true)
  })

  it('rejects the zero address regardless of case', () => {
    expect(isValidPlayerAddress('0X0000000000000000000000000000000000000000')).toBe(false)
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

  it('rejects malformed contract addresses', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = 'not-an-address'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'wallet-connect-id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_CELOCLICKER_CONTRACT is not a valid address'],
    })
  })

  it('requires a wallet connect project id', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set'],
    })
  })
})
