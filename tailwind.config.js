const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      blue: '#0317fc',
      purple: '#8003fc',
      red: '#fc0303',
      orange: '#fc5203',
      green: '#2bcf02',
      yellow: '#e6c302',
      darkgray: '#273444',
      gray: '#8492a6',
      lightgray: '#d3dce6',
      blueLight: '#42464A',
      blueDark: '#32363B',
      nav_color: '#9F9F9F',
      black_light: '#1C1E20',
      black_supper_light: '#62605D',
      navbar_theme: {
        start: 'rgb(49, 21, 53)',
        mid: 'rgba(49, 21, 53, 0.8044467787114846)',
        end: 'rgba(42, 19, 28, 0.7988445378151261)',
        final: 'rgba(19, 21, 23, 1)'
      }
    },

    fontFamily: {
      monterat: ['Montserrat', 'sans-serif'],
      euclid: ['Euclid Circular B', 'sans-serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '1.5rem'
      }
    },

    backgroundColor: {
      blue_night: '#2A2E33',
      black_night: '#131517'
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '1440px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
