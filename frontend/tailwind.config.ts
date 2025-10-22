import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // KeySingularity Brand Colors (from https://www.keysingularity.com/casi.php)
        primary: {
          DEFAULT: 'hsl(var(--primary))', // #facc15 - true yellow
          foreground: 'hsl(var(--primary-foreground))', // #000000 - black text on yellow
        },
        background: 'hsl(var(--background))', // #0D121C - main dark
        foreground: 'hsl(var(--foreground))', // #ffffff - white text
        muted: {
          DEFAULT: 'hsl(var(--muted))', // #1a202c - secondary dark
          foreground: 'hsl(var(--muted-foreground))', // #9ca3af - gray-400
        },
        border: 'hsl(var(--border))', // #374151 - gray-700
        card: {
          DEFAULT: 'hsl(var(--card))', // rgba(30, 30, 30, 0.9)
          foreground: 'hsl(var(--card-foreground))', // #ffffff
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // #1a202c
          foreground: 'hsl(var(--secondary-foreground))', // #d1d5db
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // #f59e0b - hover state
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        heading: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'page-title-mobile': [
          '2.5rem',
          { lineHeight: '3.5rem', letterSpacing: '-0.05rem', fontWeight: '600' },
        ],
        'page-title-desktop': [
          '3.5rem',
          { lineHeight: '4.5rem', letterSpacing: '-0.07rem', fontWeight: '600' },
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial-light': 'radial-gradient(ellipse at top, #e5e7eb 0%, #f7f7f7 50%)',
        'gradient-radial-dark': 'radial-gradient(ellipse at top, #1a202c 0%, #0D121C 50%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
