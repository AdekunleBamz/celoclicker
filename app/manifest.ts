import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CeloClicker',
    short_name: 'CeloClicker',
    description: 'Addictive on-chain idle clicker game on Celo',
    start_url: '/',
    display: 'standalone',
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
    ],
  }
}
