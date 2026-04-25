export const GAME_VERSION = '1.0.0'

/**
 * Calculates the prestige bonus multiplier based on prestige count.
 * @param count - The number of times the player has prestiged.
 * @returns The prestige multiplier.
 */
export function calcPrestigeBonus(count: number): number {
  if (count < 0) return 1
  return Math.pow(2, count)
}

/**
 * Checks if a combo is currently active based on the last click time and timeout.
 * @param lastClick - Timestamp of the last click in ms.
 * @param timeout - Combo timeout duration in ms.
 * @returns True when the combo is still active.
 */
export function isComboActive(lastClick: number, timeout: number): boolean {
  if (lastClick <= 0) return false
  return Date.now() - lastClick < timeout
}

/**
 * Gets the current combo multiplier capped at a maximum value.
 * @param combo - The current combo count.
 * @param max - The maximum allowed multiplier.
 * @returns The capped combo multiplier.
 */
export function getComboMultiplier(combo: number, max: number): number {
  return Math.max(1, Math.min(combo, max))
}

/** Compute total clicks-per-second from a base rate and multiplier.
 * @param base - Base clicks per second.
 * @param multiplier - Multiplier to apply.
 * @returns Total CPS after multiplier.
 */
export function calcTotalCps(base: number, multiplier: number): number {
  return base * multiplier
}

/**
 * Checks if an achievement is unlocked based on the current click count.
 * @param clicks - The player's current click count.
 * @param threshold - The threshold required to unlock the achievement.
 * @returns True when the achievement is unlocked.
 */
export function isAchievementUnlocked(clicks: number, threshold: number): boolean {
  return clicks >= threshold
}

/**
 * Calculates the next achievement threshold based on the current threshold.
 * @param currentThreshold - The current achievement threshold.
 * @returns The next threshold value.
 */
export function calcNextAchievementThreshold(currentThreshold: number): number {
  if (currentThreshold <= 0) return 100
  return currentThreshold * 10
}

/**
 * Formats prestige count with a display label.
 * @param n - Number of times prestiged.
 * @returns Formatted prestige string.
 */
export function formatPrestigeCount(n: number): string {
  return `Prestige x${n}`
}

/**
 * Calculates offline click earnings based on CPS and elapsed time.
 * @param cps - Clicks per second.
 * @param seconds - Number of seconds offline.
 * @returns Total offline clicks earned.
 */
export function calcOfflineClicks(cps: number, seconds: number): number {
  if (cps < 0 || seconds < 0) return 0
  return Math.floor(cps * seconds)
}

/**
 * Checks if a new high score has been achieved.
 * @param current - The current score.
 * @param best - The previous best score.
 * @returns True when current exceeds best.
 */
export function isNewHighScore(current: number, best: number): boolean {
  return current > best
}

/**
 * Returns a label for a given upgrade level.
 * @param level - The upgrade level.
 * @returns Formatted level string.
 */
export function getUpgradeLabel(level: number): string {
  return `Level ${level}`
}

/**
 * Formats a bonus value for display.
 * @param n - The bonus amount.
 * @returns Formatted bonus string.
 */
export function formatBonus(n: number): string {
  return `+${n}`
}

/**
 * Calculates the click threshold for the next prestige level.
 * @param level - Current prestige level.
 * @param base - Base threshold value.
 * @returns The next prestige threshold.
 */
export function calcNextPrestigeThreshold(level: number, base: number): number {
  return base * Math.pow(2, level)
}

/**
 * Calculates the effective click value after applying a multiplier.
 * @param base - Base click value.
 * @param mult - Multiplier to apply.
 * @returns Effective click value.
 */
export function getClickValueWithMultiplier(base: number, mult: number): number {
  return Math.floor(base * mult)
}

/**
 * Checks if an upgrade has reached its maximum level.
 * @param level - Current upgrade level.
 * @param max - Maximum allowed level.
 * @returns True when the level is at or above max.
 */
export function isMaxUpgradeLevel(level: number, max: number): boolean {
  return level >= max
}

/**
 * Formats CPS (clicks per second) for display.
 * @param cps - Clicks per second value.
 * @returns Formatted CPS string.
 */
export function formatCps(cps: number): string {
  return `${cps.toFixed(1)} CPS`
}

/**
 * Calculates how many points are needed to afford the next upgrade.
 * @param cost - The upgrade cost.
 * @param points - Current player points.
 * @returns Points still needed, or 0 if affordable.
 */
export function pointsToNextUpgrade(cost: number, points: number): number {
  return Math.max(0, cost - points)
}
