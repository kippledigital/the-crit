import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Resources & Educational Content | The Crit',
  description: 'Free design resources, tutorials, and educational content. Learn design principles, color theory, typography, and more with interactive tools and comprehensive guides.',
  keywords: 'design resources, design education, design tutorials, color theory, typography, design principles, graphic design, UI/UX design',
  openGraph: {
    title: 'Design Resources & Educational Content | The Crit',
    description: 'Free design resources, tutorials, and educational content. Learn design principles, color theory, typography, and more with interactive tools and comprehensive guides.',
    type: 'website',
    url: '/resources',
  },
  twitter: {
    title: 'Design Resources & Educational Content | The Crit',
    description: 'Free design resources, tutorials, and educational content. Learn design principles, color theory, typography, and more with interactive tools and comprehensive guides.',
  },
  alternates: {
    canonical: '/resources',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

