import { describe, expect, it } from 'vitest'
import { formatAddress, formatNumber, formatTokenAmount } from '../lib/utils'

describe('lib/utils formatNumber', () => {
  it('abbreviates thousands with a K suffix', () => {
    expect(formatNumber(1500)).toBe('1.50K')
  })

  it('handles bigint values in the millions', () => {
    expect(formatNumber(2500000n)).toBe('2.50M')
  })
})

describe('lib/utils formatAddress', () => {
  it('leaves short addresses unchanged', () => {
    expect(formatAddress('0x1234')).toBe('0x1234')
  })

  it('truncates long addresses for display', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234...5678')
  })
})

describe('lib/utils formatTokenAmount', () => {
  it('returns zero when the amount is blank', () => {
    expect(formatTokenAmount(undefined, 'CELO')).toBe('0 CELO')
  })

  it('falls back to zero for invalid numeric input', () => {
    expect(formatTokenAmount('not-a-number', 'CELO')).toBe('0 CELO')
  })

  it('keeps two decimals for large token balances', () => {
    expect(formatTokenAmount('123.4567', 'USDC')).toBe('123.46 USDC')
  })
})
