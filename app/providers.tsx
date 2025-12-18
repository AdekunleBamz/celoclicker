'use client'

import { useEffect, useState, useMemo } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

let wagmiConfig: ReturnType<typeof getDefaultConfig> | null = null
let queryClientInstance: QueryClient | null = null

function getWagmiConfig() {
  if (typeof window === 'undefined') return null
  
  if (!wagmiConfig) {
    wagmiConfig = getDefaultConfig({
      appName: process.env.NEXT_PUBLIC_APP_NAME || 'CeloClicker',
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
      chains: [
        process.env.NEXT_PUBLIC_CHAIN_ID === '42220' ? celo : celoAlfajores,
      ],
      ssr: true,
    })
  }
  
  return wagmiConfig
}

function getQueryClient() {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  }
  return queryClientInstance
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const config = useMemo(() => getWagmiConfig(), [])
  const queryClient = useMemo(() => getQueryClient(), [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 pixel-font text-sm">LOADING...</p>
        </div>
      </div>
    )
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
