'use client'

export function DebugEnv() {
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg text-xs font-mono z-50 max-w-md">
      <div className="text-yellow-400 mb-2">Environment Debug:</div>
      <div className="text-gray-300">
        <div>Contract: {process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT || 'NOT SET'}</div>
        <div>Length: {process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT?.length || 0}</div>
        <div>Valid: {process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT && /^0x[a-fA-F0-9]{40}$/.test(process.env.NEXT_PUBLIC_CELOCLICKER_CONTRACT) ? 'YES' : 'NO'}</div>
      </div>
    </div>
  )
}

