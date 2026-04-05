import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { APP_NAME } from '@/lib/constants'
import { Orbitron, Press_Start_2P } from 'next-pixel-fonts-placeholder' // Wait, I should use real next/font/google

// Actually, I'll use next/font/google correctly
import { Orbitron, Press_Start_2P } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://celoclicker.vercel.app'
const appOrigin = new URL(APP_URL)
const logoUrl = new URL('/icon.png', appOrigin).toString()

export const metadata: Metadata = {
  metadataBase: appOrigin,
  title: {
    default: `${APP_NAME} | On-Chain Idle Game`,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Addictive on-chain clicker game on Celo Alfajores. Click, upgrade, and dominate the leaderboard in this premium GameFi experience.',
  keywords: ['Celo', 'Clicker', 'GameFi', 'Blockchain', 'Crypto', 'Web3', 'MiniPay'],
  authors: [{ name: 'AdekunleBamz' }],
  themeColor: '#35D07F',
  icons: {
    icon: [
      { url: '/logo-mark.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' },
    ],
    apple: [{ url: '/icon.png', sizes: '512x512', type: 'image/png' }],
  },
  openGraph: {
    title: `${APP_NAME} - Celo Clicker Game`,
    description: 'The premier on-chain idle game for the Celo ecosystem. Built for performance and fun.',
    url: '/',
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      { url: '/icon.png', width: 512, height: 512, alt: `${APP_NAME} logo` },
      { url: '/og-image.png', alt: `${APP_NAME} preview` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Addictive on-chain clicker game on Celo',
    images: ['/icon.png'],
    creator: '@AdekunleBamz',
  },
  other: {
    'og:logo': logoUrl,
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
        <link rel="image_src" href={logoUrl} />
        <meta itemProp="image" content={logoUrl} />
        <meta
          name="talentapp:project_verification"
          content="a0dba87e1bb6548dd476dd39b4b9be850d6227db14fd409a46b92f9830bec8ba765395dc51d1eb6ea22759804b6fc39a3d03f2156ffcc483547ae7197bb94aa5"
        />
      </head>
      <body className={`${orbitron.variable} ${pressStart2P.variable}`} suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
