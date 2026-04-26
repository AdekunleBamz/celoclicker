'use client'

import { useContractConfig } from '@/hooks/useContractConfig'
import { CONTRACT_ADDRESS_ENV_KEY } from '@/lib/constants'
import { memo, useState } from 'react'

export const ContractWarning = memo(function ContractWarning() {
  const { isValid } = useContractConfig()
  const [dismissed, setDismissed] = useState(false)

  if (isValid || dismissed) return null

  return (
    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mb-4" role="alert">
      <div className="flex items-start gap-2">
        <span className="text-2xl mt-0.5" aria-hidden="true">⚠️</span>
        <div>
          <div className="font-bold text-yellow-400">Contract Not Configured</div>
          <div className="text-sm text-yellow-300">
            Please set a valid {CONTRACT_ADDRESS_ENV_KEY} value in your environment variables
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          type="button"
          aria-label="Dismiss contract configuration warning"
          className="focus-ring-game ml-auto shrink-0 text-yellow-300 hover:text-white text-sm px-2 py-1 rounded hover:bg-yellow-500/30 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
})

ContractWarning.displayName = 'ContractWarning'
