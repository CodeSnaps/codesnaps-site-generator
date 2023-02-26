const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['serif'],
        heading: [
          'var(--font-family-heading)',
          'Inter',
          'SF Pro Text',
          'system-ui',
        ],
        sans: ['var(--font-family-sans)'],
        monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
      },
      colors: {
        primary: {
          ...colors.indigo,
          contrast: '#fff',
        },
        black: {
          50: '#525252',
          100: '#424242',
          200: '#363636',
          300: '#282828',
          400: '#222',
          500: '#141414',
          600: '#0a0a0a',
          700: '#000',
        },
      },
    },
  },
};
