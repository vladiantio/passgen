import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector'],
  theme: {
    extend: {
			colors: {
				body: 'hsla(var(--color-body), <alpha-value>)',
				background: 'hsla(var(--color-background), <alpha-value>)',
				soft: 'hsla(var(--color-soft), <alpha-value>)',
				field: 'hsla(var(--color-field), <alpha-value>)',
				muted: 'hsla(var(--color-muted), <alpha-value>)',
				primary: 'hsla(var(--color-primary), <alpha-value>)',
				secondary: 'hsla(var(--color-secondary), <alpha-value>)',
				accent: 'hsla(var(--color-accent), <alpha-value>)',
				danger: 'hsla(var(--color-danger), <alpha-value>)',
				warning: 'hsla(var(--color-warning), <alpha-value>)',
				success: 'hsla(var(--color-success), <alpha-value>)',
			},
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [forms({ strategy: 'class' })],
};
