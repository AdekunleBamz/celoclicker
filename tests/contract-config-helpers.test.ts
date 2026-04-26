import { describe, expect, it } from 'vitest'
import { isConfiguredContractAddress, resolveContractAddress } from '../hooks/useContractConfig'

describe('contract config helpers: resolveContractAddress', () => {
  it('normalizes and lowercases trimmed addresses', () => {
    expect(resolveContractAddress('  0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD  ')).toBe(
      '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
    )
  })

  it('falls back to zero address for missing values', () => {
    expect(resolveContractAddress(undefined)).toBe('0x0000000000000000000000000000000000000000')
  })
})

describe('contract config helpers: isConfiguredContractAddress', () => {
  it('returns false for zero address', () => {
    expect(isConfiguredContractAddress('0x0000000000000000000000000000000000000000')).toBe(false)
  })

  it('returns true for valid non-zero addresses', () => {
    expect(isConfiguredContractAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe(true)
  })
})
