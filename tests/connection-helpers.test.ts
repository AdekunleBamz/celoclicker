import { describe, expect, it } from 'vitest'
import { isValidAddressFormat, normaliseAddress } from '../hooks/useConnection'

describe('connection helpers: normaliseAddress', () => {
  it('trims whitespace before lowering case', () => {
    expect(normaliseAddress('  0xAbCdEf  ')).toBe('0xabcdef')
  })
})

describe('connection helpers: isValidAddressFormat', () => {
  it('accepts values with surrounding whitespace', () => {
    expect(isValidAddressFormat('  0x1234567890abcdef1234567890abcdef12345678  ')).toBe(true)
  })
})
