import { Metadata } from 'next'
import { EducationalPageTemplate } from '@/components'
import { UX_PORTFOLIO_BEGINNERS_CONTENT } from '@/data/educational-content'

export const metadata: Metadata = {
  title: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.title,
  description: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.description,
  keywords: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.keywords,
  openGraph: {
    title: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.title,
    description: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.description,
    type: 'article',
    url: UX_PORTFOLIO_BEGINNERS_CONTENT.seo.canonicalUrl,
    images: UX_PORTFOLIO_BEGINNERS_CONTENT.seo.ogImage ? [UX_PORTFOLIO_BEGINNERS_CONTENT.seo.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.title,
    description: UX_PORTFOLIO_BEGINNERS_CONTENT.metadata.description,
  },
  alternates: {
    canonical: UX_PORTFOLIO_BEGINNERS_CONTENT.seo.canonicalUrl,
  },
}

export default function UXPortfolioBeginnersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EducationalPageTemplate data={UX_PORTFOLIO_BEGINNERS_CONTENT} />
    </main>
  )
} 