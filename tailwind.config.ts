import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        'muted-ink': 'var(--muted-ink)',
        wine: 'var(--wine)',
        sage: 'var(--sage)',
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
