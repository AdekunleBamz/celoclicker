import { describe, expect, it } from 'vitest'
import { formatNumber } from '../lib/utils'

describe('lib/utils formatNumber', () => {
  it('abbreviates thousands with a K suffix', () => {
    expect(formatNumber(1500)).toBe('1.50K')
  })
})
