import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--fg) / <alpha-value>)',
        paper: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-serif)', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.12)',
        lift: '0 18px 48px rgba(0, 0, 0, 0.16)'
      },
      letterSpacing: {
        tightest: '-0.05em'
      }
    }
  },
  plugins: []
};

export default config;
