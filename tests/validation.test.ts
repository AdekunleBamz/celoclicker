import { afterEach, describe, expect, it } from 'vitest'
import { validateContractAddress } from '../lib/validation'

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
