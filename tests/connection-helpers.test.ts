import { describe, expect, it } from 'vitest'
import { normaliseAddress } from '../hooks/useConnection'

describe('connection helpers: normaliseAddress', () => {
  it('trims whitespace before lowering case', () => {
    expect(normaliseAddress('  0xAbCdEf  ')).toBe('0xabcdef')
  })
})
