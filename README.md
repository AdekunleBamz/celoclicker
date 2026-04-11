# CeloClicker

Addictive on-chain idle clicker game on Celo. Click, upgrade, and dominate the leaderboard!

## Features

- 🎮 Addictive clicker gameplay with on-chain state
- ⚡ Real-time stat tracking and leaderboards
- 🚀 Multiple upgrade paths (Click Power, Auto-Clicker, Multiplier)
- 💎 Transparent on-chain game mechanics
- 🏆 Global leaderboard competition
- 📱 MiniPay-ready wallet flow with injected-wallet support
- 💱 Switch transaction fees between CELO and USDCm
- ✨ Beautiful animated UI with particles and effects

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Web3**: Wagmi, Viem, RainbowKit
- **Blockchain**: Celo (Mainnet)
- **Smart Contract**: Solidity 0.8.20

## Game Mechanics

### Click System
- Each click generates points based on your Click Power
- Points are multiplied by your Multiplier level
- All clicks are recorded on-chain

### Upgrades
1. **Click Power**: Increases points per click
   - Base cost: 10 points
   - Scales 1.5x per level

2. **Auto-Clicker**: Generates points automatically every 5 minutes
   - Base cost: 50 points
   - Each level adds 1 point per interval
   - Affected by multiplier

3. **Multiplier**: Multiplies all point generation
   - Base cost: 100 points
   - Each level adds +1x to multiplier

### Leaderboard
- Top 10 players by total points
- Real-time updates
- Compete globally

## Deployment Guide

### Step 1: Deploy Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `CeloClicker.sol`
3. Copy the contract code from `CeloClicker.sol`
4. Compile with Solidity 0.8.20
5. Deploy to Celo Mainnet or Alfajores:
   - Mainnet: Chain ID 42220, RPC https://forno.celo.org
   - Alfajores: Chain ID 44787
6. **Save the deployed contract address!**

The contract is ready to use immediately after deployment - no initialization needed!

### Step 2: Configure Environment

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local`:
```env
NEXT_PUBLIC_CELOCLICKER_CONTRACT=0x... # Your deployed contract address

# Get WalletConnect Project ID from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Update with your domain
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Use 42220 for mainnet or 44787 for Alfajores
NEXT_PUBLIC_CHAIN_ID=42220
```

MiniPay works best with an injected wallet flow on mobile. This app now auto-detects MiniPay and prefers the in-app wallet when available, while still keeping the generic wallet modal as a fallback outside MiniPay.

The app also supports Celo fee abstraction:
- **MiniPay default:** USDCm mode
- **Web default:** CELO mode
- **Manual override:** users can switch between CELO and USDCm in the UI

### Step 3: Install & Run

```bash
# Install dependencies
npm ci

# Run development server
npm run dev

# Build for production
npm run build

# Run full test suite
npm run test

# Run focused utility + validation tests
npm run test:utils

# Run fast local verification (lint + focused tests)
npm run check:fast

# Start production server
npm start
```

### Step 4: Deploy to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Step 5: Optional Farcaster Configuration

1. Update `public/farcaster.json` with your domain
2. Update `public/.well-known/farcaster.json` with:
   - Your FID
   - Proper account association
   - Webhook URL
   - Real production values instead of the placeholder example strings committed in this repo

## How to Play

1. **Connect Wallet**: Click "Connect Wallet" to start playing
2. **Click the Star**: Each click generates points!
3. **Buy Upgrades**: Spend points to increase your power
4. **Claim Auto Points**: If you have auto-clickers, claim periodic rewards
5. **Compete**: Check the leaderboard and climb to the top!

## Contract Functions

### Player Functions
- `click()` - Click to earn points
- `upgradeClickPower()` - Increase click power
- `upgradeAutoClicker()` - Buy auto-clicker level
- `upgradeMultiplier()` - Increase point multiplier
- `claimAutoClicker()` - Claim auto-generated points
- `resetPlayer()` - Reset your progress (for testing)

### View Functions
- `getPlayer(address)` - Get player stats
- `getUpgradeCosts(address)` - Get upgrade costs
- `getPendingAutoClicker(address)` - Check claimable auto points
- `getLeaderboard()` - Get top 10 players
- `getGlobalStats()` - Get game-wide statistics

## Meaningful On-Chain Gameplay

CeloClicker works best as a lightweight on-chain game with clear player intent:

1. **Clicks** progress your session and score
2. **Upgrades** change how quickly you can advance
3. **Claims** turn idle progress into visible on-chain state

For Proof of Ship or other ecosystem programs, focus on real retention, repeat play, and mobile UX rather than raw transaction volume.

## Strategy Guide

### Early Game (0-100 points)
- Focus on Click Power upgrades
- Click frequently
- Don't save points - upgrade immediately

### Mid Game (100-1000 points)
- Get first Auto-Clicker level
- Balance between Click Power and Multiplier
- Claim auto points every 5 minutes

### Late Game (1000+ points)
- Max out Multiplier
- Invest heavily in Auto-Clickers
- Maintain high click frequency

## MiniPay Experience

Play CeloClicker inside MiniPay for the smoothest flow:
- MiniPay is auto-detected in supported browsers
- The app prefers the injected wallet when MiniPay is available
- Outside MiniPay, the app falls back to the normal wallet modal
- Gas fees can be paid in CELO or USDCm, depending on the selected mode

## Fee Currency Switching

This app uses **Celo fee abstraction** for contract writes:
- Leaving `feeCurrency` unset uses **CELO**
- Setting `feeCurrency` to the official Celo **USDC adapter** uses **USDCm** for gas
- Gameplay still uses in-app points, so the token switch only affects transaction fees

## Technical Details

### On-Chain Data
- All game state stored on Celo blockchain
- Transparent and verifiable
- No centralized backend
- Permanent record of achievements

### Gas Efficiency
- Optimized contract design
- Minimal storage usage
- Batch operations where possible
- Typical transaction cost: < $0.001

## Troubleshooting

**"Insufficient points" error**
- You need more points to buy that upgrade
- Keep clicking to earn more!

**Auto-clicker not generating points**
- Wait at least 5 minutes between claims
- Check "Claim Auto Points" button appears

**Transaction failing**
- Ensure you have enough balance in the currently selected gas mode (CELO or USDCm)
- Check you're connected to the same Celo network configured for the app
- Try increasing gas limit slightly

## Support

- GitHub: [@AdekunleBamz](https://github.com/AdekunleBamz)
- Farcaster: [@Bamzzz](https://warpcast.com/bamzzz)
- Twitter: [@hrh_mckay](https://twitter.com/hrh_mckay)

## License

MIT License - Built for Celo Ecosystem

---

**Built with ❤️ for Celo Proof of Ship**

*Click your way to the top! 🌟*
