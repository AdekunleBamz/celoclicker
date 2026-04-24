/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'celo-green': 'var(--celo-green)',
        'celo-gold': 'var(--celo-gold)',
        'celo-dark': 'var(--celo-dark)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'success': 'var(--success)',
        'error': 'var(--error)',
      },
      fontFamily: {
        'display': ['var(--font-orbitron)', 'JetBrains Mono', 'monospace'],
        'body': ['var(--font-orbitron)', 'Inter', 'sans-serif'],
        'pixel': ['var(--font-press-start-2p)', 'Press Start 2P', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    // No custom plugins needed for now
  ],
}
