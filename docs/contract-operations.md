# Contract Operations

- Read `getGlobalStats` before and after release smoke testing.
- Read `getLeaderboard` after a score-changing action.
- Confirm upgrade costs with `getUpgradeCosts` before testing purchase actions.
- Use `resetPlayer` only in controlled test wallets.
- Record one successful click transaction hash in release notes.
- Record one leaderboard read result when validating production RPC behavior.
- Compare player stats before and after an upgrade transaction during smoke testing.
- Record the player wallet, action, and transaction hash in the operation note.
