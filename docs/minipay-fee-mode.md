# MiniPay Fee Mode Notes

CeloClicker supports Celo fee abstraction for contract writes.

## Defaults

- MiniPay sessions default to USDCm gas mode when available on Celo mainnet.
- Normal web sessions default to CELO gas mode.
- Users can switch modes from the UI when both modes are available.

## Review Checks

- Confirm USDCm mode is disabled outside supported Celo mainnet contexts.
- Confirm MiniPay sessions default to the injected wallet before opening a generic wallet modal.
- Confirm a failed USDCm balance check falls back to a readable user message.
- Confirm the selected fee mode only affects gas payment, not clicker points or upgrade costs.
