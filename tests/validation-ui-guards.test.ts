import { describe, expect, it } from 'vitest'
import { CELO_MAINNET_CHAIN_ID } from '../lib/constants'
import { isHexString, isValidChainId, isValidPlayerAddress } from '../lib/validation'

describe('validation ui guards: isValidChainId', () => {
  it('accepts supported integer chain IDs', () => {
    expect(isValidChainId(CELO_MAINNET_CHAIN_ID)).toBe(true)
  })

  it('rejects non-integer values', () => {
    expect(isValidChainId(42220.5)).toBe(false)
  })
})

describe('validation ui guards: isValidPlayerAddress', () => {
  it('accepts valid addresses with surrounding whitespace', () => {
    expect(isValidPlayerAddress(' 0x1234567890abcdef1234567890abcdef12345678 ')).toBe(true)
  })

  it('rejects non-string values', () => {
    expect(isValidPlayerAddress(123 as unknown as string)).toBe(false)
  })
})

describe('validation ui guards: isHexString', () => {
  it('accepts trimmed hex strings', () => {
    expect(isHexString('  0xabc123  ')).toBe(true)
  })

  it('rejects malformed hex strings', () => {
    expect(isHexString('abc123')).toBe(false)
  })
})
