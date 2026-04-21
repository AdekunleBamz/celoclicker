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

export function isAchievementUnlocked(clicks: number, threshold: number): boolean {
  return clicks >= threshold
}

export function formatPrestigeCount(n: number): string {
  return `Prestige x${n}`
}

export function calcOfflineClicks(cps: number, seconds: number): number {
  return Math.floor(cps * seconds)
}

export function isNewHighScore(current: number, best: number): boolean {
  return current > best
}

export function getUpgradeLabel(level: number): string {
  return `Level ${level}`
}

export function formatBonus(n: number): string {
  return `+${n}`
}
