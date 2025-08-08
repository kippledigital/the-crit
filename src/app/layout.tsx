import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { fraunces, satoshi } from '@/lib/fonts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'The Crit - AI-Powered Design Critique Platform',
    template: '%s | The Crit',
  },
  description: 'Get instant, intelligent feedback on your designs with our AI-powered critique platform.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'The Crit',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'The Crit - AI-Powered Design Critique Platform',
    description: 'Get instant, intelligent feedback on your designs with our AI-powered critique platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Crit - AI-Powered Design Critique Platform',
    description: 'Get instant, intelligent feedback on your designs with our AI-powered critique platform.',
  },
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