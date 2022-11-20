import './globals.css'

import { Montserrat } from '@next/font/google' 

const montserrat = Montserrat({ 
  fallback: ['system-ui'],
  subset: ['latin'],
  variable: '--montserrat-font',
  weight: ['300', '500'], 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}