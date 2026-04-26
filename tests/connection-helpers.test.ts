import { describe, expect, it } from 'vitest'
import { addressAccessibilityLabel, isValidAddressFormat, normaliseAddress, walletDisplayName } from '../hooks/useConnection'

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

describe('connection helpers: addressAccessibilityLabel', () => {
  it('keeps short addresses readable without forced truncation', () => {
    expect(addressAccessibilityLabel(' 0x1234 ')).toBe('Wallet 0x1234')
  })
})

describe('connection helpers: walletDisplayName', () => {
  it('prefers a trimmed ENS name when available', () => {
    expect(walletDisplayName('0x1234567890abcdef1234567890abcdef12345678', '  player.eth  ')).toBe('player.eth')
  })

  it('keeps very short addresses as-is', () => {
    expect(walletDisplayName(' 0x1234 ')).toBe('0x1234')
  })
})
