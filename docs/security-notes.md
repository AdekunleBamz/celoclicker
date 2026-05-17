# Security Notes

- Keep wallet keys out of repository files and screenshots.
- Do not publish real WalletConnect project ids in support logs.
- Verify the deployed contract address before sharing a production URL.
- Treat reset-player actions as testing-only behavior.
- Confirm fee currency changes only affect gas payment.
- Use low-value test wallets for production smoke clicks.
- Confirm contract and fee currency settings before each production release.
- Cross-check the on-chain contract address against the value in `NEXT_PUBLIC_CELOCLICKER_CONTRACT` before any production release.
- Review shared screenshots so wallet prompts do not expose private account details.
