import { describe, expect, it } from 'vitest'
import { CELO_MAINNET_CHAIN_ID } from '../lib/constants'
import { isHexString, isInRange, isValidChainId, isValidPlayerAddress, isValidUrl } from '../lib/validation'

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

describe('validation ui guards: isValidUrl', () => {
  it('accepts trimmed https URLs', () => {
    expect(isValidUrl('  https://celoclicker.app  ')).toBe(true)
  })

  it('rejects empty strings', () => {
    expect(isValidUrl('   ')).toBe(false)
  })
})

describe('validation ui guards: isInRange', () => {
  it('works when lower and upper bounds are swapped', () => {
    expect(isInRange(7, 10, 5)).toBe(true)
  })

  it('still rejects values outside the normalized range', () => {
    expect(isInRange(11, 10, 5)).toBe(false)
  })
})
