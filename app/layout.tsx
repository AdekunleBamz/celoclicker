import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${APP_NAME} | On-Chain Idle Game`,
  description: 'Addictive on-chain clicker game. Click, upgrade, dominate the leaderboard!',
  icons: {
    icon: [
      { url: '/logo-mark.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' },
    ],
    apple: [{ url: '/icon.png', sizes: '512x512', type: 'image/png' }],
  },
  openGraph: {
    title: APP_NAME,
    description: 'Addictive on-chain clicker game on Celo',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
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
        <link rel="icon" href="/logo-mark.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
