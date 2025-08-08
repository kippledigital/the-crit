import { Metadata } from 'next'
import { EducationalPageTemplate } from '@/components'
import { DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT } from '@/data/educational-content'

export const metadata: Metadata = {
  title: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.title,
  description: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.description,
  keywords: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.keywords,
  openGraph: {
    title: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.title,
    description: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.description,
    type: 'article',
    url: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.seo.canonicalUrl,
    images: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.seo.ogImage ? [DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.seo.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.title,
    description: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.metadata.description,
  },
  alternates: {
    canonical: DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT.seo.canonicalUrl,
  },
}

export default function DesignFeedbackBestPracticesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EducationalPageTemplate data={DESIGN_FEEDBACK_BEST_PRACTICES_CONTENT} />
    </main>
  )
}