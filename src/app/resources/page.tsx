'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Users, Search, Filter, ArrowRight, BookOpen, Lightbulb, Palette, Layout, Tag, TrendingUp, FileText, Settings, MessageSquare, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { EDUCATIONAL_CONTENT_CARDS } from '@/data/educational-content'
import { EducationalContentCard } from '@/types/educational-content'
import { Breadcrumbs } from '@/components'

const CATEGORIES = ['All', 'Portfolio Development', 'Tool Comparison', 'Feedback & Community', 'Career & Jobs', 'Fundamentals', 'Color Theory', 'Tutorials', 'Problem Solving', 'Education']
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced']

function SearchBar({ searchTerm, onSearchChange }: { searchTerm: string, onSearchChange: (term: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search design topics..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300 bg-white"
      />
    </div>
  )
}

function FilterBar({ 
  selectedCategory, 
  selectedDifficulty, 
  onCategoryChange, 
  onDifficultyChange 
}: {
  selectedCategory: string
  selectedDifficulty: string
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
}) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full max-w-5xl">
        <label className="block text-sm font-medium text-neutral-700 mb-2 font-ui text-center">Category</label>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg font-ui text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-300 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-5xl">
        <label className="block text-sm font-medium text-neutral-700 mb-2 font-ui text-center">Difficulty</label>
        <div className="flex flex-wrap justify-center gap-2">
          {DIFFICULTIES.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`px-4 py-2 rounded-lg font-ui text-sm transition-all duration-200 ${
                selectedDifficulty === difficulty
                  ? 'bg-secondary-500 text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-300 hover:border-secondary-400 hover:text-secondary-600'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContentCard({ card, index }: { card: EducationalContentCard, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Portfolio Development': return <FileText className="w-5 h-5" />
      case 'Tool Comparison': return <Settings className="w-5 h-5" />
      case 'Feedback & Community': return <MessageSquare className="w-5 h-5" />
      case 'Career & Jobs': return <Briefcase className="w-5 h-5" />
      case 'Fundamentals': return <BookOpen className="w-5 h-5" />
      case 'Color Theory': return <Palette className="w-5 h-5" />
      case 'Tutorials': return <Layout className="w-5 h-5" />
      case 'Problem Solving': return <Lightbulb className="w-5 h-5" />
      case 'Education': return <Users className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success-600 bg-success-50 border-success-200'
      case 'Intermediate': return 'text-primary-600 bg-primary-50 border-primary-200'
      case 'Advanced': return 'text-secondary-600 bg-secondary-50 border-secondary-200'
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/resources/${card.slug}`} className="block h-full">
        <motion.div 
          className="bg-white rounded-2xl border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Card Header */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Category & Difficulty */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary-600">
                {getCategoryIcon(card.category)}
                <span className="font-ui text-sm font-medium">{card.category}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-ui font-medium border ${getDifficultyColor(card.difficulty)}`}>
                {card.difficulty}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 mb-3 leading-tight">
              {card.title}
            </h3>

            {/* Description */}
            <p className="font-ui text-neutral-600 text-sm leading-relaxed mb-6 flex-1">
              {card.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {card.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-ui">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {card.tags.length > 3 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-ui">
                  +{card.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-neutral-500 border-t border-neutral-100 pt-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{card.readingTime} min read</span>
              </div>
              
              <div className="flex items-center gap-1 text-primary-500 group-hover:gap-2 transition-all duration-200">
                <span className="font-ui font-medium">Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-primary-200 shadow-sm"
          >
            <span className="text-primary-600 font-ui font-medium">🎨 Design Education Hub</span>
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
            Learn Design That{' '}
            <span className="text-primary-500">Actually Works</span>
          </h1>
          
          <p className="font-ui text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Free, comprehensive guides covering everything from design principles to advanced techniques. 
            Learn from real examples and interactive tools.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8 text-sm text-neutral-600 pt-4"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              <span>{EDUCATIONAL_CONTENT_CARDS.length} Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary-500" />
              <span>25,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success-500" />
              <span>Free Forever</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', active: true }
  ]

  const filteredCards = EDUCATIONAL_CONTENT_CARDS.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || card.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/10">
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* JSON-LD: ItemList for resources index */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: EDUCATIONAL_CONTENT_CARDS.map((card, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `/resources/${card.slug}`,
              name: card.title,
              description: card.description,
            })),
          }),
        }}
      />
      {/* JSON-LD: BreadcrumbList for resources index */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Resources',
                item: '/resources',
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Search and Filters */}
      <section className="py-12 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>

            {/* Filters */}
            <FilterBar
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
            />
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Info */}
            <div className="mb-8">
              <p className="font-ui text-neutral-600">
                Showing {filteredCards.length} {filteredCards.length === 1 ? 'result' : 'results'}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Cards Grid */}
            {filteredCards.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCards.map((card, index) => (
                  <ContentCard key={card.slug} card={card} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <Search className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                    No results found
                  </h3>
                  <p className="font-ui text-neutral-600 mb-8">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('All')
                      setSelectedDifficulty('All')
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Apply What You've Learned?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get AI-powered feedback on your designs to see how well you're applying these principles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-neutral-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Free Design Feedback
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Try Design Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-neutral-50 to-primary-50/30 rounded-2xl p-8 border border-neutral-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Stay Updated with Design Education
              </h3>
              <p className="text-neutral-600 mb-6">
                Get notified when we publish new design guides, tutorials, and educational content. No spam, just valuable design insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}