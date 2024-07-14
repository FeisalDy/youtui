import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
import { nextui } from '@nextui-org/react'
// const { nextui } = require('@nextui-org/react')

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
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
      addCommonColors: true
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
          height: '2px', // Adjust the height to your preference
          backgroundColor: '#27ff00', // Change to the color you want
          bottom: '-2px', // Adjust the position to place it right below the text
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
