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
    extend: {
      colors: {
        white: {
          A700: '#ffffff',
          A700_bf: '#ffffffbf',
          A700_d3: '#ffffffd3',
          A700_cc: '#ffffffcc',
          A700_5e: '#ffffff5e',
          A700_99: '#ffffff99',
          A700_a5: '#ffffffa5'
        },
        gray: {
          400: '#c0b2b2',
          500: '#aaabab',
          600: '#615f5d',
          700: '#615f5d',
          800: '#42464a',
          900: '#131517',
          '900_03': '#1c1e20',
          '800_01': '#3a3e43',
          '500_02': '#9f9f9f',
          '700_01': '#5c5c5c',
          '900_01': '#1f1d1b',
          '700_02': '#62605d',
          '700_19': '#62605d19',
          '400_02': '#b7b6b5',
          '500_01': '#919191',
          '500_7c': '#928d8d7c',
          '700_03': '#615f5f',
          '400_01': '#b8b9bb',
          '400_f7': '#b8b9bbf7'
        },
        blue_gray: {
          100: '#d2d3d4',
          400: '#848586',
          800: '#494d51',
          900: '#383534',
          '400_01': '#8e8f90',
          '100_04': '#d9d9d9',
          '900_05': '#282b2d',
          '900_03': '#383634',
          '100_02': '#d1d0d0',
          '900_02': '#2a2e33',
          '900_01': '#32363b',
          '100_03': '#cbcbcb',
          '900_04': '#2f302e',
          '100_01': '#d6d4cb',
          '100_06': '#dad7cf'
        },
        black: { 900: '#000000' },
        indigo: { '100_7f': '#b8c6e07f' },
        white_A700_7f: '#ffffff7f',
        gray_50_8e: '#fff7f78e',
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
      boxShadow: {
        xs: '0px 4px 30px 0px #0000007a',
        sm: '0px 4px 30px 0px #00000006',
        md: '0px 4px 30px 0px #0000003f',
        lg: '0px 4px 4px 0px #fffffff3f',
        xl: '0px 4px 4px 0px #242121e2'
      },
      fontFamily: {
        monterat: ['Montserrat', 'sans-serif'],
        euclid: ['Euclid Circular B', 'serif']
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
      backgroundImage: {
        gradient: 'linear-gradient(180deg, #301535cc, #2a131ccc, #131517',
        gradient1: 'linear-gradient(180deg, #fb7b0433,#ffffff33'
      },
      backgroundColor: {
        blue_night: '#2A2E33',
        black_night: '#131517'
      }
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
