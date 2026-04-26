import { describe, expect, it } from 'vitest'
import { getLeaderboardRankLabel } from '../components/LeaderboardModal'

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
