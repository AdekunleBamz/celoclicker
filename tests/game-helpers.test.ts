import { describe, expect, it } from 'vitest'
import { formatBonus, formatCps, formatPrestigeCount, getUpgradeLabel, pointsToNextUpgrade } from '../lib/game'

describe('game helpers: formatPrestigeCount', () => {
  it('formats positive counts with grouping', () => {
    expect(formatPrestigeCount(12000)).toBe('Prestige x12,000')
  })

  it('clamps invalid negative values to zero', () => {
    expect(formatPrestigeCount(-3)).toBe('Prestige x0')
  })
})

describe('game helpers: formatBonus', () => {
  it('returns +0 for negative values', () => {
    expect(formatBonus(-5)).toBe('+0')
  })

  it('formats decimal bonuses compactly', () => {
    expect(formatBonus(12.5)).toBe('+12.5')
  })
})

describe('game helpers: formatCps', () => {
  it('returns 0 CPS for invalid values', () => {
    expect(formatCps(Number.NaN)).toBe('0 CPS')
  })

  it('omits trailing decimal zero for whole values', () => {
    expect(formatCps(3)).toBe('3 CPS')
  })
})

describe('game helpers: getUpgradeLabel', () => {
  it('floors decimal levels', () => {
    expect(getUpgradeLabel(3.9)).toBe('Level 3')
  })

  it('clamps negative levels to zero', () => {
    expect(getUpgradeLabel(-2)).toBe('Level 0')
  })
})

describe('game helpers: pointsToNextUpgrade', () => {
  it('rounds up remaining points for decimal costs', () => {
    expect(pointsToNextUpgrade(100.2, 99.9)).toBe(1)
  })

  it('returns zero for invalid numeric inputs', () => {
    expect(pointsToNextUpgrade(Number.NaN, 10)).toBe(0)
  })
})
