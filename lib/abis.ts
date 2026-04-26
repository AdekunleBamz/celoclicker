/**
 * ABI for the CeloClicker smart contract.
 * Includes events and functions for clicking, upgrades, and stats.
 */
export const celoClickerABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'points', type: 'uint256' },
    ],
    name: 'AutoClickerClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'points', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalPoints', type: 'uint256' },
    ],
    name: 'Clicked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
    ],
    name: 'NewPlayer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: false, internalType: 'string', name: 'upgradeType', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'level', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'cost', type: 'uint256' },
    ],
    name: 'UpgradePurchased',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AUTOCLICKER_BASE_COST',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AUTOCLICKER_INTERVAL',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AUTOCLICKER_POINTS_PER_LEVEL',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'CLICK_POWER_BASE_COST',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'COST_DENOMINATOR',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'COST_MULTIPLIER',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MULTIPLIER_BASE_COST',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'baseCost', type: 'uint256' },
      { internalType: 'uint256', name: 'currentLevel', type: 'uint256' },
    ],
    name: 'calculateUpgradeCost',
    outputs: [{ internalType: 'uint256', name: 'cost', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimAutoClicker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'click',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGlobalStats',
    outputs: [
      { internalType: 'uint256', name: '_totalClicks', type: 'uint256' },
      { internalType: 'uint256', name: '_totalPlayers', type: 'uint256' },
      { internalType: 'uint256', name: '_totalPoints', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLeaderboard',
    outputs: [
      { internalType: 'address[10]', name: 'addresses', type: 'address[10]' },
      { internalType: 'uint256[10]', name: 'points', type: 'uint256[10]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'playerAddress', type: 'address' }],
    name: 'getPendingAutoClicker',
    outputs: [{ internalType: 'uint256', name: 'points', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'playerAddress', type: 'address' }],
    name: 'getPlayer',
    outputs: [
      { internalType: 'uint256', name: 'points', type: 'uint256' },
      { internalType: 'uint256', name: 'clickPower', type: 'uint256' },
      { internalType: 'uint256', name: 'autoClickerLevel', type: 'uint256' },
      { internalType: 'uint256', name: 'multiplierLevel', type: 'uint256' },
      { internalType: 'uint256', name: 'totalClicks', type: 'uint256' },
      { internalType: 'uint256', name: 'gamesPlayed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'playerAddress', type: 'address' }],
    name: 'getUpgradeCosts',
    outputs: [
      { internalType: 'uint256', name: 'clickPowerCost', type: 'uint256' },
      { internalType: 'uint256', name: 'autoClickerCost', type: 'uint256' },
      { internalType: 'uint256', name: 'multiplierCost', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'hasPlayed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'playerList',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'players',
    outputs: [
      { internalType: 'uint256', name: 'points', type: 'uint256' },
      { internalType: 'uint256', name: 'clickPower', type: 'uint256' },
      { internalType: 'uint256', name: 'autoClickerLevel', type: 'uint256' },
      { internalType: 'uint256', name: 'multiplierLevel', type: 'uint256' },
      { internalType: 'uint256', name: 'lastClaimTime', type: 'uint256' },
      { internalType: 'uint256', name: 'totalClicks', type: 'uint256' },
      { internalType: 'uint256', name: 'gamesPlayed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'resetPlayer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalClicks',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalPlayers',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalPoints',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'upgradeAutoClicker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'upgradeClickPower',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'upgradeMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

/**
 * Extracts all event names from the ABI.
 * Useful for filtering events or building event type maps.
 */
export function getABIEventNames(abi: typeof celoClickerABI): string[] {
  return abi
    .filter((item) => item.type === 'event')
    .map((item) => item.name)
    .filter((name) => name !== undefined) as string[]
}

/**
 * Counts the total number of function definitions in the ABI.
 */
export function countABIFunctions(abi: typeof celoClickerABI): number {
  return abi.filter((item) => item.type === "function").length
}

/**
 * Checks if the ABI includes a specific event by name.
 */
export function hasABIEvent(abi: typeof celoClickerABI, eventName: string): boolean {
  return abi.some((item) => item.type === "event" && item.name === eventName)
}

/**
 * Checks if the ABI includes a specific function by name.
 */
export function hasABIFunction(abi: typeof celoClickerABI, functionName: string): boolean {
  return abi.some((item) => item.type === "function" && item.name === functionName)
}

/**
 * Extracts the input parameter names from a function definition.
 */
export function getABIFunctionInputs(abi: typeof celoClickerABI, functionName: string): string[] {
  const fn = abi.find((item) => item.type === "function" && item.name === functionName)
  if (!fn || fn.type !== "function") return []
  return (fn.inputs || []).map((input: any) => input.name).filter(Boolean)
}

/**
 * Returns the total number of read-only functions in the ABI.
 */
export function countReadOnlyFunctions(abi: typeof celoClickerABI): number {
  return abi.filter((item) => item.type === "function" && (item.stateMutability === "view" || item.stateMutability === "pure")).length
}

/**
 * Returns a map of event names to their indexed parameter count.
 */
export function getABIEventIndexMap(abi: typeof celoClickerABI): Record<string, number> {
  const map: Record<string, number> = {}
  abi.filter((item) => item.type === "event").forEach((event: any) => {
    const indexed = (event.inputs || []).filter((inp: any) => inp.indexed).length
    if (event.name) map[event.name] = indexed
  })
  return map
}

/**
 * Returns the state mutability of a function (view, pure, nonpayable, payable).
 */
export function getABIFunctionMutability(abi: typeof celoClickerABI, functionName: string): string | undefined {
  const fn = abi.find((item) => item.type === "function" && item.name === functionName)
  return fn && fn.type === "function" ? fn.stateMutability : undefined
}

/**
 * Counts payable functions (those that accept ETH/CELO transfers).
 */
export function countPayableFunctions(abi: typeof celoClickerABI): number {
  return abi.filter((item) => item.type === "function" && item.stateMutability === "payable").length
}
