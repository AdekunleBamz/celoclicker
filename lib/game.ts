export const GAME_VERSION = '1.0.0'

export function calcPrestigeBonus(count: number): number {
  return Math.pow(2, count)
}

export function isComboActive(lastClick: number, timeout: number): boolean {
  return Date.now() - lastClick < timeout
}

export function getComboMultiplier(combo: number, max: number): number {
  return Math.min(combo, max)
}

export function calcTotalCps(base: number, multiplier: number): number {
  return base * multiplier
}
