import { Fraunces } from 'next/font/google'
import localFont from 'next/font/local'

// Load Fraunces from Google Fonts for display text
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Load Satoshi locally for UI text
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ui',
  display: 'swap',
}) 