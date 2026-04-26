import { MetadataRoute } from 'next'

/**
 * Generates the web app manifest for CeloClicker.
 * Provides metadata used when the app is installed on mobile devices.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CeloClicker',
    short_name: 'CeloClicker',
    description: 'Addictive on-chain idle clicker game on Celo',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'browser'],
    orientation: 'portrait',
    background_color: '#2E3338',
    theme_color: '#35D07F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
