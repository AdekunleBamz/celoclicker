# Environment Reference

CeloClicker reads public runtime settings from `NEXT_PUBLIC_*` variables.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CELOCLICKER_CONTRACT` | Deployed clicker contract address. |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project id for non-MiniPay wallet flows. |
| `NEXT_PUBLIC_APP_URL` | Production or local app URL used by metadata routes. |
| `NEXT_PUBLIC_CHAIN_ID` | Celo chain id. Use `42220` for mainnet or `44787` for Alfajores. |
| `NEXT_PUBLIC_APP_VERSION` | Optional build/version label shown by helper code. When omitted the app uses its internal default. |

## Vercel Notes

Update public variables in Vercel before promoting a deployment. Browser bundles read these values at build time.

After changing public variables, trigger a fresh Vercel build before testing the URL.

Record the Vercel environment and reviewer whenever contract or fee variables change.
