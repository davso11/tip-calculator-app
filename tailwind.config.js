/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '3750px',
      sm: '576px',
      md: '992px',
      lg: '1440px',
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        input: 'hsl(var(--input))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
        },
        neutral: {
          DEFAULT: 'hsl(var(--neutral))',
          lighter: 'hsl(var(--neutral-lighter))',
          light: 'hsl(var(--neutral-light))',
          dark: 'hsl(var(--neutral-dark))',
        },
      },
      fontFamily: {
        body: ['Space Mono', 'monospace', ...defaultTheme.fontFamily.mono],
      },
      minHeight: {
        calculator: 'calc(100vh - (3rem + 2.5rem + 64px))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
