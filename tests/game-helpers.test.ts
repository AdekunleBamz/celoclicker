import { describe, expect, it } from 'vitest'
import { formatPrestigeCount } from '../lib/game'

describe('game helpers: formatPrestigeCount', () => {
  it('formats positive counts with grouping', () => {
    expect(formatPrestigeCount(12000)).toBe('Prestige x12,000')
  })

  it('clamps invalid negative values to zero', () => {
    expect(formatPrestigeCount(-3)).toBe('Prestige x0')
  })
})
