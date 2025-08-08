'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Clock, Users, BookOpen, ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { EducationalPageTemplate as EducationalPageTemplateType } from '@/types/educational-content'
import { ColorWheel, GoldenRatioCalculator, ContrastChecker, EducationalImage, Breadcrumbs } from '@/components'

interface EducationalPageProps {
  data: EducationalPageTemplateType
}

function TableOfContents({ items }: { items: EducationalPageTemplateType['tableOfContents'] }) {
  const [activeSection, setActiveSection] = useState('')

  // Track active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element)

      // Find which section is currently in view
      const headerHeight = 120
      const scrollPosition = window.scrollY + headerHeight

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    // Set initial active section
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const offsetPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-24">
      <h3 className="font-ui font-semibold text-neutral-900 mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-ui text-sm ${
              activeSection === item.id
                ? 'bg-primary-50 text-primary-600 font-medium'
                : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
            }`}
            style={{ paddingLeft: `${12 + (item.level - 1) * 16}px` }}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  )
}

function InteractiveSection({ element }: { element: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100"
    >
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
          {element.title}
        </h3>
        <p className="font-ui text-neutral-600">
          {element.description}
        </p>
      </div>
      
      <div className="flex justify-center">
        {element.component === 'ColorWheel' && (
          <ColorWheel
            size={250}
            onColorChange={(color) => {
              console.log('Color selected:', color)
            }}
          />
        )}
        {element.component === 'GoldenRatioCalculator' && (
          <GoldenRatioCalculator className="w-full max-w-2xl" />
        )}
        {element.component === 'ContrastChecker' && (
          <ContrastChecker className="w-full max-w-3xl" />
        )}
      </div>
    </motion.div>
  )
}

function CTASection({ cta }: { cta: EducationalPageTemplateType['content']['callToAction'] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white text-center"
    >
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
        {cta.title}
      </h3>
      <p className="font-ui text-lg mb-8 opacity-90 max-w-2xl mx-auto">
        {cta.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {cta.primaryCTA.type === 'internal' ? (
            <Link
              href={cta.primaryCTA.href}
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-neutral-50 font-ui font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {cta.primaryCTA.text}
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <a
              href={cta.primaryCTA.href}
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-neutral-50 font-ui font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {cta.primaryCTA.text}
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </motion.div>
        
        {cta.secondaryCTA && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {cta.secondaryCTA.type === 'internal' ? (
              <Link
                href={cta.secondaryCTA.href}
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-ui font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                {cta.secondaryCTA.text}
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <a
                href={cta.secondaryCTA.href}
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-ui font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                {cta.secondaryCTA.text}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function RelatedContent({ articles }: { articles: EducationalPageTemplateType['content']['relatedContent'] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h3 className="font-display text-2xl font-bold text-neutral-900">
        Continue Learning
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              href={`/resources/${article.slug}`}
              className="block bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
            >
              <h4 className="font-ui font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                {article.title}
              </h4>
              <p className="font-ui text-neutral-600 text-sm mb-4 leading-relaxed">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingTime} min read</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function EducationalPageTemplate({ data }: EducationalPageProps) {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  // Build breadcrumb items from data
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    ...data.heroSection.breadcrumbs.slice(1).map((crumb, index, arr) => ({
      label: crumb,
      href: index === arr.length - 1 ? undefined : `/resources/${data.metadata.slug}`,
      active: index === arr.length - 1
    }))
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/20">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section ref={heroRef} className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-4 py-2 bg-primary-50 rounded-full border border-primary-200 mb-4"
            >
              <span className="text-primary-600 font-ui font-medium text-sm">{data.heroSection.subtitle}</span>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              {data.heroSection.title}
            </h1>
            
            <p className="font-ui text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              {data.heroSection.description}
            </p>

            {/* Article Meta */}
            <div className="flex items-center justify-center gap-6 text-sm text-neutral-500 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{data.metadata.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{data.metadata.targetAudience.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{data.metadata.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 lg:order-2">
              <TableOfContents items={data.tableOfContents} />
            </div>

            {/* Content */}
            <div className="lg:col-span-9 lg:order-1">
              <div className="max-w-none prose prose-lg">
                {/* Introduction */}
                <div id="introduction" className="mb-12">
                  <p className="font-ui text-lg text-neutral-700 leading-relaxed">
                    {data.content.introduction}
                  </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                  {data.content.sections.map((section, index) => (
                    <div key={section.id} id={section.id} className="scroll-mt-24">
                      <h2 className="font-display text-3xl font-bold text-neutral-900 mb-6">
                        {section.title}
                      </h2>
                      <div className="font-ui text-lg text-neutral-700 leading-relaxed mb-6">
                        {section.content}
                      </div>
                      
                      {/* Section Images */}
                      {section.images && section.images.length > 0 && (
                        <div className="space-y-8 mb-8">
                          {section.images.map((image, i) => (
                            <EducationalImage
                              key={i}
                              src={image.src}
                              alt={image.alt}
                              caption={image.caption}
                              width={image.width || 800}
                              height={image.height || 400}
                            />
                          ))}
                        </div>
                      )}
                      
                      {section.examples && section.examples.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {section.examples.map((example, i) => (
                            <div key={i} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                              <h4 className="font-ui font-semibold text-neutral-900 mb-2">
                                {example.title}
                              </h4>
                              <p className="font-ui text-neutral-600 text-sm mb-4">
                                {example.description}
                              </p>
                              
                              {/* Example Images */}
                              {(example.beforeImage || example.afterImage) && (
                                <div className="flex gap-3">
                                  {example.beforeImage && (
                                    <div className="flex-1">
                                      <EducationalImage
                                        src={example.beforeImage}
                                        alt={`${example.title} example`}
                                        width={600}
                                        height={400}
                                        className="mb-0"
                                      />
                                    </div>
                                  )}
                                  {example.afterImage && (
                                    <div className="flex-1">
                                      <EducationalImage
                                        src={example.afterImage}
                                        alt={`${example.title} improved example`}
                                        width={600}
                                        height={400}
                                        className="mb-0"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Elements */}
                {data.content.interactiveElements.length > 0 && (
                  <div className="space-y-12 my-16">
                    {data.content.interactiveElements.map((element) => (
                      <InteractiveSection key={element.id} element={element} />
                    ))}
                  </div>
                )}

                {/* Call to Action */}
                <div className="my-16">
                  <CTASection cta={data.content.callToAction} />
                </div>

                {/* Related Content */}
                {data.content.relatedContent.length > 0 && (
                  <div className="mt-16">
                    <RelatedContent articles={data.content.relatedContent} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}