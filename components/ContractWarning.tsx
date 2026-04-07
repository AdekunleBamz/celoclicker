'use client'

import { useContractConfig } from '@/hooks/useContractConfig'
import { CONTRACT_ADDRESS_ENV_KEY } from '@/lib/constants'

export const ContractWarning = () => {
  const { isValid } = useContractConfig()
  
  if (isValid) return null
  
  return (
    <div role="alert" aria-live="assertive" className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">⚠️</span>
        <div>
          <div className="font-bold text-yellow-400">Contract Not Configured</div>
          <div className="text-sm text-yellow-300">
            Please set a valid {CONTRACT_ADDRESS_ENV_KEY} value in your environment variables
          </div>
        </div>
      </div>
    </div>
  )
}

ContractWarning.displayName = 'ContractWarning'
