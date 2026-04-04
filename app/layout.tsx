import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { APP_NAME } from '@/lib/constants'

const DEFAULT_APP_URL = 'https://celoclicker.vercel.app'

function resolveAppOrigin() {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL)
  } catch {
    return new URL(DEFAULT_APP_URL)
  }
}

const appOrigin = resolveAppOrigin()
const logoUrl = new URL('/icon.png', appOrigin).toString()

export const metadata: Metadata = {
  metadataBase: appOrigin,
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
    url: '/',
    siteName: APP_NAME,
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
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
