# CeloClicker Release Checklist

Use this checklist before promoting a Vercel deployment.

## Local Checks

- Run `npm run lint`.
- Run `npm run check:fast`.
- Run `npm run build`.
- Confirm `.env.example` still lists every required public variable.

## Runtime Checks

- Load the app in a normal browser and confirm wallet connection still works.
- Load the app inside MiniPay and confirm the injected wallet path is preferred.
- Complete one read-only leaderboard refresh on the target production domain.
