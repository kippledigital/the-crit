import { Metadata } from 'next'
import { Breadcrumbs, ToolComparisonMatrix } from '@/components'

export const metadata: Metadata = {
  title: 'Figma vs Adobe XD: Complete Comparison Guide 2025 | The Crit',
  description: 'Comprehensive feature-by-feature comparison of Figma vs Adobe XD. Find out which design tool is best for your portfolio and workflow in 2025.',
  keywords: [
    'figma vs adobe xd',
    'figma adobe xd comparison',
    'best design tool 2025',
    'figma or adobe xd',
    'design tool comparison',
    'UX design tools',
    'figma vs xd features',
    'design software comparison'
  ],
  openGraph: {
    title: 'Figma vs Adobe XD: Complete Comparison Guide 2025',
    description: 'Comprehensive feature-by-feature comparison of Figma vs Adobe XD. Find out which design tool is best for your portfolio and workflow.',
    type: 'article',
    url: 'https://thecrit.com/resources/figma-vs-adobe-xd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Figma vs Adobe XD: Complete Comparison Guide 2025',
    description: 'Comprehensive feature-by-feature comparison of Figma vs Adobe XD.',
  },
  alternates: {
    canonical: 'https://thecrit.com/resources/figma-vs-adobe-xd',
  },
}

export default function FigmaVsAdobeXDPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'Figma vs Adobe XD', href: '/resources/figma-vs-adobe-xd' }
            ]}
          />

          <ToolComparisonMatrix />
        </div>
      </main>
    </>
  )
}