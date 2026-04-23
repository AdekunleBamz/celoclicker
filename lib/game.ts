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
 * Determines whether a click combo is still active.
 *  lastClick - Timestamp of the last click.
 *  timeout - Combo timeout in milliseconds.
 */
export function isComboActive(lastClick: number, timeout: number): boolean {
  if (lastClick <= 0) return false
  return Date.now() - lastClick < timeout
}

/**
 * Returns the effective combo multiplier capped at a maximum.
 *  combo - Current combo count.
 *  max - Maximum allowed multiplier.
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
 * Calculates offline clicks earned while the player was away.
 *  cps - Clicks per second rate.
 *  seconds - Time offline in seconds.
 */
export function calcOfflineClicks(cps: number, seconds: number): number {
  if (!Number.isFinite(cps) || cps < 0 || seconds < 0) return 0
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

/** Returns true when level has reached the maximum allowed value. */
export function isMaxLevel(level: number, max: number): boolean {
  return level >= max
}

/**
 * Calculates the click multiplier for a given upgrade level.
 * Each level adds `step` to the base multiplier of 1.
 *
 * @param level - Current upgrade level.
 * @param step - How much each level increases the multiplier. Defaults to 0.1.
 * @returns The computed multiplier (always >= 1).
 */
export function calcClickMultiplier(level: number, step = 0.1): number {
  if (level <= 0) return 1
  return 1 + level * step
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
 * Checks if an upgrade has reached its maximum allowed level.
 *  level - Current upgrade level.
 *  max - Maximum allowed level.
 */
export function isMaxUpgradeLevel(level: number, max: number): boolean {
  return level >= max
}

/**
 * Formats a clicks-per-second value with one decimal place.
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
/**
 * Returns a tier label based on total click count milestones.
 *
 * @param totalClicks - The player's all-time click count.
 * @returns A string tier label: "Bronze", "Silver", "Gold", or "Legend".
 */
export function getAchievementTier(totalClicks: number): string {
  if (totalClicks >= 1_000_000) return 'Legend'
  if (totalClicks >= 100_000) return 'Gold'
  if (totalClicks >= 10_000) return 'Silver'
  return 'Bronze'
}
