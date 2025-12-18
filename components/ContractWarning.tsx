'use client'

import { useContractConfig } from '@/hooks/useContractConfig'

export function ContractWarning() {
  const { isValid } = useContractConfig()
  
  if (isValid) return null
  
  return (
    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <div>
          <div className="font-bold text-yellow-400">Contract Not Configured</div>
          <div className="text-sm text-yellow-300">
            Please set NEXT_PUBLIC_CELOCLICKER_CONTRACT in your environment variables
          </div>
        </div>
      </div>
    </div>
  )
}

