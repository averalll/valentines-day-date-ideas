import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9f1239',
          900: '#831843',
        },
        valentine: {
          deep: '#581111',
          'card-pink': '#fae6e3',
          'dark-red': '#9b1e1e',
          cream: '#F9F5EE',
          'selected-card': '#7B4A58',
          'match-tag': '#B85C6B',
          'result-bg': '#F5E6E8',
          'button-light': '#EBB7B7',
        },
      },
      fontFamily: {
        'beau-rivage': ['var(--font-beau-rivage)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
