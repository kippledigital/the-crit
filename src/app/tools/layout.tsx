import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Design Tools & Calculators | The Crit',
  description: 'Free professional design tools including color wheel, contrast checker, golden ratio calculator, and more. Interactive tools for designers.',
  keywords: 'design tools, color wheel, contrast checker, golden ratio calculator, design calculators, free design tools, color theory tools',
  openGraph: {
    title: 'Free Design Tools & Calculators | The Crit',
    description: 'Free professional design tools including color wheel, contrast checker, golden ratio calculator, and more. Interactive tools for designers.',
    type: 'website',
    url: '/tools',
  },
  twitter: {
    title: 'Free Design Tools & Calculators | The Crit',
    description: 'Free professional design tools including color wheel, contrast checker, golden ratio calculator, and more. Interactive tools for designers.',
  },
  alternates: {
    canonical: '/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}