export const GAME_VERSION = '1.0.0'

/**
 * Calculates the prestige bonus multiplier based on prestige count.
 * @param count - The number of times the player has prestiged.
 */
export function calcPrestigeBonus(count: number): number {
  if (count < 0) return 1
  return Math.pow(2, count)
}

/**
 * Checks if a combo is currently active based on the last click time and timeout.
 * @param lastClick - Timestamp of the last click in ms.
 * @param timeout - Combo timeout duration in ms.
 */
export function isComboActive(lastClick: number, timeout: number): boolean {
  if (lastClick <= 0) return false
  return Date.now() - lastClick < timeout
}

/**
 * Gets the current combo multiplier capped at a maximum value.
 * @param combo - The current combo count.
 * @param max - The maximum allowed multiplier.
 */
export function getComboMultiplier(combo: number, max: number): number {
  return Math.max(1, Math.min(combo, max))
}

/** Compute total clicks-per-second from a base rate and multiplier. */
export function calcTotalCps(base: number, multiplier: number): number {
  return base * multiplier
}

export function isAchievementUnlocked(clicks: number, threshold: number): boolean {
  return clicks >= threshold
}

/**
 * Formats prestige count with a display label.
 * @param n - Number of times prestiged.
 */
export function formatPrestigeCount(n: number): string {
  return `Prestige x${n}`
}

/**
 * Calculates offline click earnings based on CPS and elapsed time.
 * @param cps - Clicks per second.
 * @param seconds - Number of seconds offline.
 */
export function calcOfflineClicks(cps: number, seconds: number): number {
  if (cps < 0 || seconds < 0) return 0
  return Math.floor(cps * seconds)
}

/**
 * Checks if the current score beats the previous best.
 *  current - The current score.
 *  best - The best score to beat.
 */
export function isNewHighScore(current: number, best: number): boolean {
  return current > best
}

export function getUpgradeLabel(level: number): string {
  return `Level ${level}`
}

export function formatBonus(n: number): string {
  return `+${n}`
}

export function calcNextPrestigeThreshold(level: number, base: number): number {
  return base * Math.pow(2, level)
}

export function getClickValueWithMultiplier(base: number, mult: number): number {
  return Math.floor(base * mult)
}

export function isMaxUpgradeLevel(level: number, max: number): boolean {
  return level >= max
}

export function formatCps(cps: number): string {
  return `${cps.toFixed(1)} CPS`
}
