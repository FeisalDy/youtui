import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
import { nextui } from '@nextui-org/react'
// const { nextui } = require('@nextui-org/react')

const config: Config = {
  important: true,
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   apple: {
    //     '50': '#f1fcf3',
    //     '100': '#dff9e3',
    //     '200': '#c1f1c9',
    //     '300': '#91e4a0',
    //     '400': '#5ace6f',
    //     '500': '#32ae49',
    //     '600': '#25943a',
    //     '700': '#217431',
    //     '800': '#1f5c2b',
    //     '900': '#1b4c25',
    //     '950': '#092a11'
    //   },
    //   blue: {
    //     50: '#e6f1fe',
    //     100: '#cce3fd',
    //     200: '#99c7fb',
    //     300: '#66aaf9',
    //     400: '#338ef7',
    //     500: '#006FEE',
    //     600: '#005bc4',
    //     700: '#004493',
    //     800: '#002e62',
    //     900: '#001731'
    //   }
    // },
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch'
          }
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['group-hover'],
      textColor: ['group-hover']
    }
  },
  plugins: [
    nextui({
      addCommonColors: true,
      //   layout: {}
      themes: {
        dark: {
          //   colors: {
          //     // primary: {
          //     //   DEFAULT: '#32ae49',
          //     //   foreground: '#000000'
          //     // },
          //     // focus: '#BEF264'
          //   }
        }
      }
    }),
    require('@tailwindcss/typography'),
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.after-hover': {
          position: 'relative'
        },
        '.after-hover::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '2px',
          backgroundColor: '#006FEE',
          bottom: '-2px',
          left: '0',
          transform: 'scaleX(0)',
          transition: 'transform 0.3s ease-in-out'
        },
        '.after-hover:hover::after': {
          transform: 'scaleX(1)'
        }
      })
    }
  ]
}
export default config
