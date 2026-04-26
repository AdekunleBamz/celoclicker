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
 * Returns a short description for a prestige count.
 * @param count - Number of prestiges earned.
 */
export function getPrestigeDescription(count: number): string {
  if (count <= 0) return 'No prestige yet'
  if (count === 1) return 'First prestige achieved'
  return `${count} prestiges earned`
}

/**
 * Calculates offline click earnings based on CPS and elapsed time.
 * @param cps - Clicks per second.
 * @param seconds - Number of seconds offline.
 * @returns Total offline clicks earned.
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

/**
 * Returns the combined click value after applying prestige and combo multipliers.
 *
 * @param base - Base click value.
 * @param prestigeMultiplier - Multiplier from prestige level.
 * @param comboMultiplier - Multiplier from the current combo chain.
 */
export function calcCombinedClickValue(
  base: number,
  prestigeMultiplier: number,
  comboMultiplier: number,
): number {
  return base * prestigeMultiplier * comboMultiplier
}

/**
 * Calculates the income earned by the auto-clicker over a given period.
 *
 * @param cps - Clicks per second from auto-clicker upgrades.
 * @param elapsedMs - Elapsed time in milliseconds.
 * @returns Total clicks earned during the period, floored to a whole number.
 */
export function calcAutoClickerIncome(cps: number, elapsedMs: number): number {
  if (cps <= 0 || elapsedMs <= 0) return 0
  return Math.floor((cps * elapsedMs) / 1000)
}

/**
 * Returns the click threshold required to reach the next prestige level.
 * Each prestige level doubles the threshold from a base of 1,000,000.
 *
 * @param currentPrestige - The player's current prestige count.
 */
export function getNextPrestigeThreshold(currentPrestige: number): number {
  const base = 1_000_000
  if (currentPrestige <= 0) return base
  return base * Math.pow(2, currentPrestige)
}

/**
 * Returns a human-readable label for a given upgrade type key.
 *
 * @param upgradeKey - The upgrade key (e.g. "CLICK_POWER", "AUTO_CLICKER").
 * @returns A display label string.
 */
export function getUpgradeLabel(upgradeKey: string): string {
  const labels: Record<string, string> = {
    CLICK_POWER: 'Click Power',
    AUTO_CLICKER: 'Auto Clicker',
    MULTIPLIER: 'Score Multiplier',
  }
  return labels[upgradeKey] ?? upgradeKey
}

/**
 * Formats a bonus value as a signed string for display in upgrade cards.
 * Positive bonuses show as "+X", negative as "-X".
 *
 * @param bonus - The numeric bonus value.
 * @returns Formatted bonus string e.g. "+5", "-2", "+0".
 */
export function formatBonus(bonus: number): string {
  if (!Number.isFinite(bonus)) return '+0'
  const rounded = Math.round(bonus)
  return rounded >= 0 ? `+${rounded}` : `${rounded}`
}

/**
 * Returns true when the player has enough points to afford an upgrade.
 *
 * @param playerPoints - The player's current click/point balance.
 * @param upgradeCost - The cost of the upgrade.
 */
export function canAffordUpgrade(playerPoints: number, upgradeCost: number): boolean {
  return playerPoints >= upgradeCost
}

/**
 * Returns the combo timeout duration in milliseconds, scaling down slightly per prestige.
 * Higher prestige gives a shorter but still fair combo window.
 *
 * @param baseTimeoutMs - The base combo timeout in milliseconds.
 * @param prestige - The player's current prestige count.
 */
export function calcComboTimeout(baseTimeoutMs: number, prestige: number): number {
  const minMs = 500
  const reduction = Math.min(prestige * 50, baseTimeoutMs - minMs)
  return Math.max(minMs, baseTimeoutMs - reduction)
}

/**
 * Returns true when a random roll falls within the bonus click probability.
 * Uses the provided random value to allow deterministic testing.
 *
 * @param chance - Probability of a bonus click (0-1). Default is 0.05 (5%).
 * @param roll - A random number between 0 and 1. Defaults to Math.random().
 */
export function isBonusClick(chance = 0.05, roll = Math.random()): boolean {
  if (chance <= 0) return false
  if (chance >= 1) return true
  return roll < chance
}
