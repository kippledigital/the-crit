import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Resources and Guides',
  description: 'Explore free, comprehensive design guides and interactive tools covering fundamentals, color theory, layout, and more.',
  alternates: { canonical: '/resources' },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}

