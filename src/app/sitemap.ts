import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const resourceSlugs = [
    'design-principles-for-beginners',
    'design-mistakes',
    'how-to-use-color-wheel',
    'graphic-design-tutorial',
    'design-fundamentals-for-students',
  ]

  const resourceRoutes: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${SITE}/resources/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...resourceRoutes]
}

