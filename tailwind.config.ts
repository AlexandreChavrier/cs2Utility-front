import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ECEBFA',
          200: '#D0CFF3',
          300: '#ABA9EA',
          400: '#8480E0',
          500: '#5F5AD7',
          600: '#3C36CE',
          700: '#332EAF',
          800: '#2B2692',
          900: '#221F75',
          1000: '#080F28',
          DEFAULT: '#3C36CE',
        },
        secondary: {
          100: '#F1EBFA',
          200: '#DECFF3',
          300: '#C4A9EA',
          400: '#A880E0',
          500: '#8E5AD7',
          600: '#7536CE',
          700: '#632EAF',
          800: '#532692',
          900: '#431F75',
          1000: '#35185D',
          DEFAULT: '#7536CE',
        },
        neutral: {
          100: '#ECEDEF',
          200: '#D2D3D9',
          300: '#AEB1BB',
          400: '#898C9B',
          500: '#656A7D',
          600: '#434961',
          700: '#393E52',
          800: '#303445',
          900: '#262A37',
          1000: '#1E212C',
          black: '#000000',
          white: 'rgba(255, 255, 255, 1)',
          overlay: 'rgba(8, 15, 40, 0.5)',
        },
      },
      borderRadius: {
        none: '0rem',
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        round: '7.5rem',
      },
      borderWidth: {
        none: '0rem',
        sm: '0.0625rem',
        md: '0.125rem',
        lg: '0.25rem',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        'body-xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-md': ['1rem', { lineHeight: '1.5rem' }],
        'body-lg': ['1.25rem', { lineHeight: '2rem' }],
        'heading-h6': ['1.25rem', { lineHeight: '1.75rem' }],
        'heading-h5': ['1.5rem', { lineHeight: '2.25rem' }],
        'heading-h4': ['2rem', { lineHeight: '3rem' }],
        'heading-h3': ['2.5rem', { lineHeight: '3.5rem' }],
        'heading-h2': ['3rem', { lineHeight: '4rem' }],
        'heading-h1': ['3.75rem', { lineHeight: '5rem' }],
      },
    },
  },
  plugins: [],
};

export default config;

