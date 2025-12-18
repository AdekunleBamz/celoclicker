import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'CeloClicker | On-Chain Idle Game',
  description: 'Addictive on-chain clicker game. Click, upgrade, dominate the leaderboard!',
  openGraph: {
    title: 'CeloClicker',
    description: 'Addictive on-chain clicker game on Celo',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CeloClicker',
    description: 'Addictive on-chain clicker game on Celo',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
