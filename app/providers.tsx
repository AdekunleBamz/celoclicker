'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { APP_NAME, CELO_MAINNET_CHAIN_ID } from '@/lib/constants'
import { LoadingSpinner } from '@/components/LoadingSpinner'

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
          retry: 1,
        },
      },
    })
  }
  return queryClientInstance
}

/**
 * Root application providers including Wagmi, RainbowKit, and React Query.
 * Handles server-side rendering hydration and MiniPay auto-detection.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Initialize configurations only once
  const config = useMemo(() => getWagmiConfig(), [])
  const queryClient = useMemo(() => getQueryClient(), [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a loading screen until the app is mounted on the client
  if (!mounted || !config) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center flex flex-col items-center">
          <Image src="/logo-mark.svg" alt="CeloClicker logo" width={44} height={44} className="mb-4" />
          <div className="mb-4">
            <LoadingSpinner size="lg" label="Initializing wallet providers" />
          </div>
          <p className="text-gray-400 pixel-font text-sm">INITIALIZING WALLET LAYER...</p>
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
