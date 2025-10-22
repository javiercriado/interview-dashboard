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
        primary: {
          DEFAULT: '#facc15',
          dark: '#eab308',
        },
        background: {
          DEFAULT: '#0D121C',
          secondary: '#1a202c',
        },
        foreground: {
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
        },
        border: '#334155',
        muted: '#1e293b',
      },
      fontFamily: {
        heading: ['"IBM Plex Mono"', 'monospace'],
        body: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
