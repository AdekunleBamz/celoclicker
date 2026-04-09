import { describe, expect, it } from 'vitest'
import { formatNumber } from '../lib/utils'

describe('lib/utils formatNumber', () => {
  it('abbreviates thousands with a K suffix', () => {
    expect(formatNumber(1500)).toBe('1.50K')
  })

  it('handles bigint values in the millions', () => {
    expect(formatNumber(2500000n)).toBe('2.50M')
  })
})
