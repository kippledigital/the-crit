import { Metadata } from 'next'
import { EducationalPageTemplate } from '@/components'
import { UX_CAREER_TRANSITION_FRAMEWORK_CONTENT } from '@/data/educational-content'

export const metadata: Metadata = {
  title: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.title,
  description: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.description,
  keywords: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.keywords,
  openGraph: {
    title: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.title,
    description: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.description,
    type: 'article',
    url: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.seo.canonicalUrl,
    images: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.seo.ogImage ? [UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.seo.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.title,
    description: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.metadata.description,
  },
  alternates: {
    canonical: UX_CAREER_TRANSITION_FRAMEWORK_CONTENT.seo.canonicalUrl,
  },
}

export default function UXCareerTransitionFrameworkPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EducationalPageTemplate data={UX_CAREER_TRANSITION_FRAMEWORK_CONTENT} />
    </main>
  )
}