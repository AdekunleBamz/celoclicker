export const GAME_VERSION = '1.0.0'

export function calcPrestigeBonus(count: number): number {
  return Math.pow(2, count)
}

export function isComboActive(lastClick: number, timeout: number): boolean {
  return Date.now() - lastClick < timeout
}
