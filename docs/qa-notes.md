# QA Notes

## Pre-Smoke-Test

- Run `npm run typecheck` before smoke testing a new build.
- Run `npm run check:fast` to verify lint and unit tests pass locally.
- Confirm `NEXT_PUBLIC_CELOCLICKER_CONTRACT` is set before opening the app.

## Gameplay

- Connect a wallet on the configured Celo network.
- Click enough times to buy a Click Power upgrade.
- Confirm upgrade costs refresh after purchase.
- Confirm leaderboard refresh still works without a write transaction.
- Confirm auto-clicker claim text stays clear before the interval has elapsed.

## Wallets

- Test a normal browser wallet flow.
- Test MiniPay injected wallet flow.
- Confirm fee mode selection remains visible before writes.
- Confirm disconnecting and reconnecting refreshes player stats.
- Save the wallet type and contract address used for each smoke test.
