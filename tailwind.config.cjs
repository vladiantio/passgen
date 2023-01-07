const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.neutral.800'),
            hr: {
              borderColor: theme('colors.neutral.100'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            'h1, h2, h3': {
              letterSpacing: '-0.025em',
            },
            h2: {
              marginBottom: `${16 / 24}em`,
            },
            h3: {
              marginTop: '2.4em',
              lineHeight: '1.4',
            },
            h4: {
              marginTop: '2em',
              fontSize: '1.125em',
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.blue.400')}`,
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
            strong: {
              color: theme('colors.neutral.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.neutral.300'),
            'h2, h3, h4': {
              color: theme('colors.neutral.200'),
            },
            hr: {
              borderColor: theme('colors.neutral.200'),
              opacity: '0.05',
            },
            a: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.neutral.200'),
            },
          },
        },
      }),
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
};
