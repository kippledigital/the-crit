export interface EducationalContentMetadata {
  title: string
  description: string
  keywords: string[]
  searchVolume: number
  difficulty: number
  slug: string
  category: string
  targetAudience: string[]
  readingTime: number
  publishedDate: string
  lastUpdated: string
}

export interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'image' | 'interactive' | 'video' | 'code'
  images?: ImageContent[]
  examples?: ExampleContent[]
  exercises?: ExerciseContent[]
  keywords?: string[]
}

export interface ImageContent {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface ExampleContent {
  title: string
  description: string
  beforeImage?: string
  afterImage?: string
  codeSnippet?: string
}

export interface ExerciseContent {
  title: string
  instructions: string
  type: 'checklist' | 'interactive' | 'practice'
  questions?: string[]
  interactiveComponent?: string
}

export interface InteractiveElement {
  id: string
  type: 'color_wheel' | 'golden_ratio' | 'typography_scale' | 'contrast_checker'
  title: string
  description: string
  component: string
}

export interface CTASection {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
    type: 'internal' | 'external'
  }
  secondaryCTA?: {
    text: string
    href: string
    type: 'internal' | 'external'
  }
}

export interface EducationalPageTemplate {
  metadata: EducationalContentMetadata
  heroSection: {
    title: string
    subtitle: string
    description: string
    heroImage?: string
    breadcrumbs: string[]
  }
  tableOfContents: {
    id: string
    title: string
    level: number
  }[]
  content: {
    introduction: string
    sections: ContentSection[]
    interactiveElements: InteractiveElement[]
    callToAction: CTASection
    relatedContent: {
      title: string
      slug: string
      description: string
      readingTime: number
    }[]
  }
  seo: {
    canonicalUrl: string
    ogImage?: string
    schemaMarkup: any
    internalLinks: {
      text: string
      href: string
    }[]
  }
}

export interface EducationalContentCard {
  title: string
  description: string
  slug: string
  category: string
  searchVolume: number
  readingTime: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  featuredImage?: string
  publishedDate: string
}