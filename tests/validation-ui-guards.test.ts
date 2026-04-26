import { describe, expect, it } from 'vitest'
import { CELO_MAINNET_CHAIN_ID } from '../lib/constants'
import { isValidChainId } from '../lib/validation'

describe('validation ui guards: isValidChainId', () => {
  it('accepts supported integer chain IDs', () => {
    expect(isValidChainId(CELO_MAINNET_CHAIN_ID)).toBe(true)
  })

  it('rejects non-integer values', () => {
    expect(isValidChainId(42220.5)).toBe(false)
  })
})
