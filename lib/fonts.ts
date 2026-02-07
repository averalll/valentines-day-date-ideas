import { Beau_Rivage, Cormorant } from 'next/font/google'

export const beauRivage = Beau_Rivage({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-beau-rivage',
  display: 'swap',
})

export const cormorant = Cormorant({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})
