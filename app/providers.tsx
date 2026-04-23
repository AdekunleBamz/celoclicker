'use client'

import { useEffect, useState, useMemo } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { APP_NAME, CELO_MAINNET_CHAIN_ID } from '@/lib/constants'
import { isMiniPayBrowser } from '@/hooks/useMiniPay'

let wagmiConfig: ReturnType<typeof getDefaultConfig> | null = null
let queryClientInstance: QueryClient | null = null

/**
 * Initialize wagmi configuration (singleton pattern)
 */
function getWagmiConfig() {
  if (typeof window === 'undefined') return null
  
  if (!wagmiConfig) {
    wagmiConfig = getDefaultConfig({
      appName: process.env.NEXT_PUBLIC_APP_NAME || APP_NAME,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() || '',
      chains: [
        Number(process.env.NEXT_PUBLIC_CHAIN_ID) === CELO_MAINNET_CHAIN_ID ? celo : celoAlfajores,
      ],
      ssr: true,
    })
  }
  
  return wagmiConfig
}

/**
 * Get or create React Query client (singleton pattern)
 */
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
  const [isMiniPay, setIsMiniPay] = useState(false)
  const config = useMemo(() => getWagmiConfig(), [])
  const queryClient = useMemo(() => getQueryClient(), [])

  useEffect(() => {
    setMounted(true)
    // Poll for MiniPay provider (may be injected asynchronously)
    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      if (isMiniPayBrowser()) {
        clearInterval(timer)
        setIsMiniPay(true)
      } else if (attempts >= 20) {
        clearInterval(timer)
      }
    }, 250)
    return () => clearInterval(timer)
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
        {/* Skip RainbowKit inside MiniPay — it provides its own injected wallet */}
        {isMiniPay ? (
          children
        ) : (
          <RainbowKitProvider>{children}</RainbowKitProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
