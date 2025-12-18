# Contract Setup Instructions

## Step 1: Deploy Your Contract

If you haven't deployed the contract yet:

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `CeloClicker.sol`
3. Copy the contract code from `CeloClicker.sol` in this repo
4. Compile with Solidity 0.8.20
5. Deploy to Celo Mainnet (Chain ID: 42220) or Alfajores Testnet
6. **Copy the deployed contract address**

## Step 2: Update Environment Variables

1. Open `.env.local` file
2. Replace `0x...` with your actual contract address:

```env
NEXT_PUBLIC_CELOCLICKER_CONTRACT=0xYourActualContractAddressHere
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_CHAIN_ID=42220
```

**Important:** 
- The contract address must be exactly 42 characters (0x + 40 hex characters)
- Example: `0x1234567890123456789012345678901234567890`

## Step 3: Restart Dev Server

After updating `.env.local`, you MUST restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

Next.js only loads environment variables at startup, so changes won't take effect until you restart.

## Step 4: Verify

After restarting, the warning should disappear and you should be able to interact with the contract.

## Troubleshooting

- **Still seeing warning?** 
  - Make sure the address is exactly 42 characters
  - Make sure there are no extra spaces in `.env.local`
  - Restart the dev server
  - Clear browser cache and hard refresh (Cmd+Shift+R)

- **Contract not found?**
  - Verify the contract is deployed on the correct network
  - Check that `NEXT_PUBLIC_CHAIN_ID` matches your deployment network
  - Ensure you're connected to the same network in your wallet

