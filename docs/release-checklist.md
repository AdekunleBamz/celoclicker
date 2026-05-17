# CeloClicker Release Checklist

Use this checklist before promoting a Vercel deployment.

## Local Checks

- Run `npm run lint`.
- Run `npm run check:fast`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Confirm `.env.example` still lists every required public variable.
- Confirm the production build used the same contract address intended for release.
- Confirm package verification scripts match the commands documented in the README.

## Runtime Checks

- Load the app in a normal browser and confirm wallet connection still works.
- Load the app inside MiniPay and confirm the injected wallet path is preferred.
- Confirm the active fee mode is visible before sending a gameplay transaction.
- Complete one read-only leaderboard refresh on the target production domain.
- Complete one click transaction with a low-risk test wallet before public sharing.
- Attach one click or upgrade hash and preview URL to release notes.
