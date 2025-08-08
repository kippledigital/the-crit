import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { EducationalPageTemplate } from '@/components'
import { DESIGN_PRINCIPLES_CONTENT, DESIGN_MISTAKES_CONTENT, COLOR_WHEEL_CONTENT, GRAPHIC_DESIGN_TUTORIAL_CONTENT, DESIGN_FUNDAMENTALS_FOR_STUDENTS_CONTENT } from '@/data/educational-content'
import { EducationalPageTemplate as EducationalPageTemplateType } from '@/types/educational-content'

// This would be expanded to include all content pages
const CONTENT_MAP: Record<string, EducationalPageTemplateType> = {
  'design-principles-for-beginners': DESIGN_PRINCIPLES_CONTENT,
  'design-mistakes': DESIGN_MISTAKES_CONTENT,
  'how-to-use-color-wheel': COLOR_WHEEL_CONTENT,
  'graphic-design-tutorial': GRAPHIC_DESIGN_TUTORIAL_CONTENT,
  'design-fundamentals-for-students': DESIGN_FUNDAMENTALS_FOR_STUDENTS_CONTENT,
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return Object.keys(CONTENT_MAP).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const content = CONTENT_MAP[slug]
  
  if (!content) {
    return {
      title: 'Page Not Found | The Crit',
      description: 'The requested page could not be found.',
    }
  }

  const { metadata, seo } = content
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: seo.canonicalUrl,
      siteName: 'The Crit',
      type: 'article',
      publishedTime: metadata.publishedDate,
      modifiedTime: metadata.lastUpdated,
      authors: ['The Crit'],
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    other: {
      'article:author': 'The Crit',
      'article:published_time': metadata.publishedDate,
      'article:modified_time': metadata.lastUpdated,
      'article:section': metadata.category,
      'article:tag': metadata.keywords.join(', '),
    }
  }
}

export default function ResourcePage({ params }: PageProps) {
  const { slug } = params
  const content = CONTENT_MAP[slug]
  
  if (!content) {
    notFound()
  }

  return (
    <div>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...content.seo.schemaMarkup,
            url: content.seo.canonicalUrl,
            mainEntityOfPage: content.seo.canonicalUrl,
            wordCount: content.content.sections.reduce((acc, section) => acc + section.content.split(' ').length, 0),
            timeRequired: `PT${content.metadata.readingTime}M`,
          })
        }}
      />
      
      <EducationalPageTemplate data={content} />
    </div>
  )
}