import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)'
        },
        accent: {
          orange: 'rgb(var(--accent-orange) / <alpha-value>)',
          blue: 'rgb(var(--accent-blue) / <alpha-value>)',
          green: 'rgb(var(--accent-green) / <alpha-value>)'
        }
      },
      boxShadow: {
        card: '0 18px 48px rgba(0, 0, 0, 0.18)',
        glow: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 20px 60px rgba(15, 23, 42, 0.22)'
      },
      borderRadius: {
        card: '24px'
      }
    }
  },
  plugins: []
};

export default config;
