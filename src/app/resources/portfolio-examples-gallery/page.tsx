import { Metadata } from 'next'
import { EducationalPageTemplate } from '@/components'
import { PORTFOLIO_EXAMPLES_GALLERY_CONTENT } from '@/data/educational-content'

export const metadata: Metadata = {
  title: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.title,
  description: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.description,
  keywords: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.keywords,
  openGraph: {
    title: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.title,
    description: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.description,
    type: 'article',
    url: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.seo.canonicalUrl,
    images: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.seo.ogImage ? [PORTFOLIO_EXAMPLES_GALLERY_CONTENT.seo.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.title,
    description: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.metadata.description,
  },
  alternates: {
    canonical: PORTFOLIO_EXAMPLES_GALLERY_CONTENT.seo.canonicalUrl,
  },
}

export default function PortfolioExamplesGalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EducationalPageTemplate data={PORTFOLIO_EXAMPLES_GALLERY_CONTENT} />
    </main>
  )
}