import { describe, expect, it } from 'vitest'
import { getLeaderboardRankLabel, isCurrentLeaderboardPlayer } from '../components/LeaderboardModal'

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
