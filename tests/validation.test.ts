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

  it('rejects addresses with non-hex characters', () => {
    expect(validateContractAddress('0x123456789012345678901234567890123456789Z')).toBe(false)
  })

  it('accepts valid addresses with surrounding whitespace', () => {
    expect(validateContractAddress('  0x1234567890123456789012345678901234567890  ')).toBe(true)
  })

  it('rejects the zero address', () => {
    expect(validateContractAddress('0x0000000000000000000000000000000000000000')).toBe(false)
  })
})

describe('lib/validation validateEnvironment', () => {
  it('passes when required environment values are valid', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'abcdef1234567890'

    expect(validateEnvironment()).toEqual({
      isValid: true,
      errors: [],
    })
  })

  it('reports a missing contract address', () => {
    delete process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'wallet-connect-id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_CELOCLICKER_CONTRACT is not set'],
    })
  })

  it('collects contract and wallet errors together', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = 'not-an-address'
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: [
        'NEXT_PUBLIC_CELOCLICKER_CONTRACT is not a valid address',
        'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set',
      ],
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

  it('rejects wallet connect ids that are too short', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'short'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID appears too short to be valid'],
    })
  })

  it('rejects placeholder wallet connect ids', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'your_project_id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })

  it('rejects placeholder wallet connect ids regardless of case', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'YOUR_PROJECT_ID'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })

  it('rejects placeholder wallet connect ids with surrounding whitespace', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = '  your_project_id  '

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })
})
