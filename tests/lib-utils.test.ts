import { describe, expect, it } from 'vitest'
import {
  celoToWei,
  clampBigInt,
  formatElapsedTime,
  formatAddress,
  formatNumber,
  formatTokenAmount,
  isSameAddress,
  isValidAddress,
  isZeroAddress,
  safeParseInt,
  weiToCelo,
} from '../lib/utils'

describe('lib/utils formatNumber', () => {
  it('abbreviates thousands with a K suffix', () => {
    expect(formatNumber(1500)).toBe('1.50K')
  })

  it('abbreviates billion-scale values with a B suffix', () => {
    expect(formatNumber(2_450_000_000)).toBe('2.45B')
  })

  it('preserves sign when abbreviating negative numbers', () => {
    expect(formatNumber(-2500)).toBe('-2.50K')
  })

  it('handles bigint values in the millions', () => {
    expect(formatNumber(2500000n)).toBe('2.50M')
  })

  it('handles negative bigint values with suffixes', () => {
    expect(formatNumber(-2500000n)).toBe('-2.50M')
  })

  it('returns zero for non-finite values', () => {
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('0')
  })

  it('uses locale grouping for non-abbreviated values', () => {
    expect(formatNumber(999.5)).toBe('999.5')
  })

  it('keeps non-abbreviated negative values readable', () => {
    expect(formatNumber(-500)).toBe('-500')
  })
})

describe('lib/utils formatAddress', () => {
  it('leaves short addresses unchanged', () => {
    expect(formatAddress('0x1234')).toBe('0x1234')
  })

  it('keeps 10-character addresses unchanged', () => {
    expect(formatAddress('0x12345678')).toBe('0x12345678')
  })

  it('truncates long addresses for display', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234...5678')
  })

  it('trims surrounding whitespace before formatting', () => {
    expect(formatAddress('  0x1234567890abcdef1234567890abcdef12345678  ')).toBe('0x1234...5678')
  })

  it('returns an empty string for whitespace-only addresses', () => {
    expect(formatAddress('   ')).toBe('')
  })
})

describe('lib/utils formatTokenAmount', () => {
  it('returns zero when the amount is blank', () => {
    expect(formatTokenAmount(undefined, 'CELO')).toBe('0 CELO')
  })

  it('returns zero without trailing space when symbol is missing', () => {
    expect(formatTokenAmount(undefined)).toBe('0')
  })

  it('falls back to zero for invalid numeric input', () => {
    expect(formatTokenAmount('not-a-number', 'CELO')).toBe('0 CELO')
  })

  it('clamps negative token amounts to zero', () => {
    expect(formatTokenAmount('-5', 'CELO')).toBe('0 CELO')
  })

  it('keeps two decimals for large token balances', () => {
    expect(formatTokenAmount('123.4567', 'USDC')).toBe('123.46 USDC')
  })

  it('handles whole-number token balances without decimals', () => {
    expect(formatTokenAmount('200', 'USDC')).toBe('200 USDC')
  })

  it('parses comma-formatted token balances', () => {
    expect(formatTokenAmount('1,234.567', 'USDC')).toBe('1234.57 USDC')
  })

  it('parses comma-formatted balances with surrounding whitespace', () => {
    expect(formatTokenAmount('  1,234.567  ', 'USDC')).toBe('1234.57 USDC')
  })

  it('keeps three decimals for medium-sized token balances', () => {
    expect(formatTokenAmount('12.34567', 'CELO')).toBe('12.346 CELO')
  })

  it('trims whitespace around token amount strings', () => {
    expect(formatTokenAmount('  2.5  ', 'CELO')).toBe('2.5 CELO')
  })

  it('keeps four decimals for small token balances', () => {
    expect(formatTokenAmount('0.123456', 'CELO')).toBe('0.1235 CELO')
  })

  it('rounds tiny token balances to four decimal places', () => {
    expect(formatTokenAmount('0.00009', 'CELO')).toBe('0.0001 CELO')
  })
})

describe('lib/utils isZeroAddress', () => {
  it('matches zero address values with surrounding whitespace', () => {
    expect(isZeroAddress('  0x0000000000000000000000000000000000000000  ')).toBe(true)
  })

  it('matches uppercase zero-address values', () => {
    expect(isZeroAddress('0X0000000000000000000000000000000000000000')).toBe(true)
  })

  it('returns false for blank input', () => {
    expect(isZeroAddress('')).toBe(false)
  })
})

describe('lib/utils isValidAddress', () => {
  it('accepts valid lowercase hexadecimal addresses', () => {
    expect(isValidAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe(true)
  })

  it('accepts valid addresses with surrounding whitespace', () => {
    expect(isValidAddress('  0x1234567890abcdef1234567890abcdef12345678  ')).toBe(true)
  })

  it('rejects addresses with invalid length', () => {
    expect(isValidAddress('0x1234')).toBe(false)
  })

  it('rejects addresses containing non-hex characters', () => {
    expect(isValidAddress('0x123456789012345678901234567890123456789Z')).toBe(false)
  })
})

describe('lib/utils isSameAddress', () => {
  it('matches addresses regardless of letter casing', () => {
    expect(
      isSameAddress(
        '0x1234567890abcdef1234567890abcdef12345678',
        '0x1234567890ABCDEF1234567890ABCDEF12345678',
      ),
    ).toBe(true)
  })

  it('trims whitespace before comparing addresses', () => {
    expect(
      isSameAddress(
        '  0x1234567890abcdef1234567890abcdef12345678',
        '0x1234567890abcdef1234567890abcdef12345678  ',
      ),
    ).toBe(true)
  })

  it('returns false when either address is blank', () => {
    expect(isSameAddress('', '0x1234567890abcdef1234567890abcdef12345678')).toBe(false)
  })
})

describe('lib/utils clampBigInt', () => {
  it('raises values below the minimum bound', () => {
    expect(clampBigInt(-5n, 0n, 10n)).toBe(0n)
  })

  it('lowers values above the maximum bound', () => {
    expect(clampBigInt(15n, 0n, 10n)).toBe(10n)
  })

  it('keeps values already inside the bound', () => {
    expect(clampBigInt(7n, 0n, 10n)).toBe(7n)
  })
})

describe('lib/utils formatElapsedTime', () => {
  it('returns zero seconds for invalid durations', () => {
    expect(formatElapsedTime(Number.NaN)).toBe('0s')
  })

  it('formats sub-minute durations as seconds', () => {
    expect(formatElapsedTime(45)).toBe('45s')
  })

  it('formats minute durations with remaining seconds', () => {
    expect(formatElapsedTime(125)).toBe('2m 5s')
  })

  it('formats hour durations with remaining minutes', () => {
    expect(formatElapsedTime(7500)).toBe('2h 5m')
  })
})

describe('lib/utils safeParseInt', () => {
  it('parses decimal strings as base ten integers', () => {
    expect(safeParseInt('42')).toBe(42)
  })

  it('returns the fallback for invalid integer input', () => {
    expect(safeParseInt('not-a-number', 9)).toBe(9)
  })

  it('keeps the default fallback at zero', () => {
    expect(safeParseInt('')).toBe(0)
  })
})

describe('lib/utils celoToWei', () => {
  it('converts one CELO to wei', () => {
    expect(celoToWei(1)).toBe(1_000_000_000_000_000_000n)
  })

  it('converts fractional CELO values to wei', () => {
    expect(celoToWei(1.5)).toBe(1_500_000_000_000_000_000n)
  })
})

describe('lib/utils weiToCelo', () => {
  it('converts wei back to whole CELO values', () => {
    expect(weiToCelo(2_000_000_000_000_000_000n)).toBe(2)
  })

  it('converts fractional wei balances to CELO', () => {
    expect(weiToCelo(1_250_000_000_000_000_000n)).toBe(1.25)
  })
})
