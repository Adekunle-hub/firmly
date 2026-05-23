

import {Inter, Instrument_Serif} from "next/font/google"

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans', 
  display: 'swap',
});

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
});