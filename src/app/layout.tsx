import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { fraunces, satoshi } from '@/lib/fonts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Crit - AI-Powered Design Critique Platform',
  description: 'Get instant, intelligent feedback on your designs with our AI-powered critique platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${satoshi.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 