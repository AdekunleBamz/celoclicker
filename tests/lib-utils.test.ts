import { describe, expect, it } from 'vitest'
import { formatAddress, formatNumber } from '../lib/utils'

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
})
