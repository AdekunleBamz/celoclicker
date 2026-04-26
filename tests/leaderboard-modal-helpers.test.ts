import { describe, expect, it } from 'vitest'
import { getLeaderboardCloseLabel, getLeaderboardRankLabel, getLeaderboardRowClass, hasLeaderboardEntries, isCurrentLeaderboardPlayer } from '../components/LeaderboardModal'

describe('leaderboard modal helpers: getLeaderboardRankLabel', () => {
  it('returns medal labels for top three ranks', () => {
    expect(getLeaderboardRankLabel(0)).toBe('🥇')
    expect(getLeaderboardRankLabel(1)).toBe('🥈')
    expect(getLeaderboardRankLabel(2)).toBe('🥉')
  })

  it('returns #N format for non-podium ranks', () => {
    expect(getLeaderboardRankLabel(3)).toBe('#4')
  })
})

describe('leaderboard modal helpers: isCurrentLeaderboardPlayer', () => {
  it('matches addresses case-insensitively', () => {
    expect(
      isCurrentLeaderboardPlayer(
        '0xAbCdEf1234567890abcdef1234567890ABCDEF12',
        '0xabcdef1234567890ABCDEF1234567890abcdef12'
      )
    ).toBe(true)
  })

  it('returns false when player address is missing', () => {
    expect(isCurrentLeaderboardPlayer('0xabcdef1234567890abcdef1234567890abcdef12')).toBe(false)
  })
})

describe('leaderboard modal helpers: hasLeaderboardEntries', () => {
  it('returns false when all addresses are zero-address placeholders', () => {
    expect(
      hasLeaderboardEntries([
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ])
    ).toBe(false)
  })

  it('returns true when at least one real address exists', () => {
    expect(
      hasLeaderboardEntries([
        '0x0000000000000000000000000000000000000000',
        '0x1234567890abcdef1234567890abcdef12345678',
      ])
    ).toBe(true)
  })
})

describe('leaderboard modal helpers: getLeaderboardRowClass', () => {
  it('returns highlighted classes for the current player', () => {
    expect(getLeaderboardRowClass(true)).toContain('bg-purple-500/30')
  })

  it('returns neutral classes for non-current rows', () => {
    expect(getLeaderboardRowClass(false)).toContain('bg-black/20')
  })
})

describe('leaderboard modal helpers: getLeaderboardCloseLabel', () => {
  it('returns loading-aware close label', () => {
    expect(getLeaderboardCloseLabel(true)).toBe('Close leaderboard while loading')
  })

  it('returns default close label when not loading', () => {
    expect(getLeaderboardCloseLabel(false)).toBe('Close leaderboard')
  })
})
