module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      dark: '#555B6E', // dark
      white: '#FAF9F9', // white
      primary: '#89B0AE', // dark green
      supplementary: '#BEE3DB', // light green
      secondary: '#FFD6BA', // orange
    },
    fontFamily: {
      oxygen: ['oxygen', 'sans-serif'],
    },
    extend: {
      minHeight: {
        page: '70vh',
      },
      minWidth: {
        page: '55vw',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      },
      screens: {
        '3xl': '1750px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FAF9F9', // white
            h1: {
              color: '#BEE3DB', // light green
            },
            h2: {
              color: '#BEE3DB', // light green
            },
            a: {
              color: '#FFD6BA',
              'text-decoration': 'none',
              '&:hover': {
                'text-decoration': 'underline',
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
