import { describe, expect, it } from 'vitest'
import { resolveContractAddress } from '../hooks/useContractConfig'

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
