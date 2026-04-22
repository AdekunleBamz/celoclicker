import { afterEach, describe, expect, it } from 'vitest'
import {
  isEthAddress,
  isHexString,
  isInRange,
  isNonEmptyString,
  isNumberInRange,
  isPlaceholderAddress,
  isPositiveChainId,
  isPositiveClicks,
  isPositiveInt,
  isPurchasableUpgradeLevel,
  isValidChainId,
  isValidClickPower,
  isValidGamesCount,
  isValidMultiplierLevel,
  isValidPlayerAddress,
  isValidPoints,
  isValidScore,
  isValidUpgradeLevel,
  validateContractAddress,
  validateEnvironment,
} from '../lib/validation'

const originalContractAddress = process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
const originalWalletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

afterEach(() => {
  if (originalContractAddress === undefined) {
    delete process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
  } else {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = originalContractAddress
  }

  if (originalWalletConnectProjectId === undefined) {
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  } else {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = originalWalletConnectProjectId
  }
})

describe('lib/validation validateContractAddress', () => {
  it('rejects blank contract addresses', () => {
    expect(validateContractAddress('')).toBe(false)
  })

  it('rejects addresses with non-hex characters', () => {
    expect(validateContractAddress('0x123456789012345678901234567890123456789Z')).toBe(false)
  })

  it('accepts valid addresses with surrounding whitespace', () => {
    expect(validateContractAddress('  0x1234567890123456789012345678901234567890  ')).toBe(true)
  })

  it('rejects addresses that use an uppercase 0X prefix', () => {
    expect(validateContractAddress('0X1234567890123456789012345678901234567890')).toBe(false)
  })

  it('rejects the zero address', () => {
    expect(validateContractAddress('0x0000000000000000000000000000000000000000')).toBe(false)
  })

  it('rejects zero address values with surrounding whitespace', () => {
    expect(validateContractAddress('  0x0000000000000000000000000000000000000000  ')).toBe(false)
  })
})

describe('lib/validation validateEnvironment', () => {
  it('passes when required environment values are valid', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'abcdef1234567890'

    expect(validateEnvironment()).toEqual({
      isValid: true,
      errors: [],
    })
  })

  it('accepts valid wallet connect ids with surrounding whitespace', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = '  abcdef1234567890  '

    expect(validateEnvironment()).toEqual({
      isValid: true,
      errors: [],
    })
  })

  it('reports a missing contract address', () => {
    delete process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'wallet-connect-id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_CELOCLICKER_CONTRACT is not set'],
    })
  })

  it('collects contract and wallet errors together', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = 'not-an-address'
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: [
        'NEXT_PUBLIC_CELOCLICKER_CONTRACT is not a valid address',
        'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set',
      ],
    })
  })

  it('rejects malformed contract addresses', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = 'not-an-address'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'wallet-connect-id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_CELOCLICKER_CONTRACT is not a valid address'],
    })
  })

  it('requires a wallet connect project id', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set'],
    })
  })

  it('rejects wallet connect ids that are too short', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'short'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID appears too short to be valid'],
    })
  })

  it('rejects placeholder wallet connect ids', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'your_project_id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })

  it('rejects placeholder wallet connect ids regardless of case', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'YOUR_PROJECT_ID'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })

  it('rejects walletconnect_project_id placeholder variant', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = 'walletconnect_project_id'

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })

  it('rejects placeholder wallet connect ids with surrounding whitespace', () => {
    process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT = '0x1234567890123456789012345678901234567890'
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = '  your_project_id  '

    expect(validateEnvironment()).toEqual({
      isValid: false,
      errors: ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is still set to a placeholder value'],
    })
  })
})

describe('lib/validation isValidUpgradeLevel', () => {
  it('accepts the minimum upgrade level', () => {
    expect(isValidUpgradeLevel(0n)).toBe(true)
  })

  it('accepts the maximum upgrade level', () => {
    expect(isValidUpgradeLevel(100n)).toBe(true)
  })

  it('rejects negative upgrade levels', () => {
    expect(isValidUpgradeLevel(-1n)).toBe(false)
  })

  it('rejects upgrade levels above the cap', () => {
    expect(isValidUpgradeLevel(101n)).toBe(false)
  })
})

describe('lib/validation isValidPoints', () => {
  it('accepts zero point totals', () => {
    expect(isValidPoints(0n)).toBe(true)
  })

  it('rejects negative point totals', () => {
    expect(isValidPoints(-1n)).toBe(false)
  })
})

describe('lib/validation isValidChainId', () => {
  it('accepts Celo mainnet', () => {
    expect(isValidChainId(42220)).toBe(true)
  })

  it('accepts Alfajores testnet', () => {
    expect(isValidChainId(44787)).toBe(true)
  })

  it('rejects unsupported chain ids', () => {
    expect(isValidChainId(1)).toBe(false)
  })
})

describe('lib/validation isPlaceholderAddress', () => {
  it('detects placeholder token addresses', () => {
    expect(isPlaceholderAddress('0x0000000000000000000000000000000000000001')).toBe(true)
  })

  it('does not treat the zero address as a placeholder', () => {
    expect(isPlaceholderAddress('0x0000000000000000000000000000000000000000')).toBe(false)
  })
})

describe('lib/validation isInRange', () => {
  it('accepts values on inclusive range boundaries', () => {
    expect(isInRange(5n, 5n, 10n)).toBe(true)
  })

  it('rejects values below the range', () => {
    expect(isInRange(4n, 5n, 10n)).toBe(false)
  })
})

describe('lib/validation isPurchasableUpgradeLevel', () => {
  it('accepts the first purchasable level', () => {
    expect(isPurchasableUpgradeLevel(1n)).toBe(true)
  })

  it('rejects zero as a purchasable level', () => {
    expect(isPurchasableUpgradeLevel(0n)).toBe(false)
  })

  it('respects custom purchasable level caps', () => {
    expect(isPurchasableUpgradeLevel(6n, 5n)).toBe(false)
  })
})

describe('lib/validation isValidPlayerAddress', () => {
  it('accepts valid player addresses with whitespace', () => {
    expect(isValidPlayerAddress('  0x1234567890abcdef1234567890abcdef12345678  ')).toBe(true)
  })

  it('rejects the zero address for players', () => {
    expect(isValidPlayerAddress('0x0000000000000000000000000000000000000000')).toBe(false)
  })
})

describe('lib/validation isPositiveClicks', () => {
  it('accepts positive click counts', () => {
    expect(isPositiveClicks(1n)).toBe(true)
  })
})

describe('lib/validation isValidGamesCount', () => {
  it('accepts zero games played', () => {
    expect(isValidGamesCount(0n)).toBe(true)
  })
})

describe('lib/validation isValidClickPower', () => {
  it('rejects zero click power', () => {
    expect(isValidClickPower(0n)).toBe(false)
  })
})

describe('lib/validation isValidMultiplierLevel', () => {
  it('accepts custom multiplier caps', () => {
    expect(isValidMultiplierLevel(3n, 3n)).toBe(true)
  })
})
