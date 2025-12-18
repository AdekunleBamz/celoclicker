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
        'celo-green': '#35D07F',
        'celo-gold': '#FBCC5C',
        'celo-dark': '#2E3338',
      },
      fontFamily: {
        'display': ['JetBrains Mono', 'monospace'],
        'body': ['Inter', 'sans-serif'],
        'pixel': ['Press Start 2P', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
