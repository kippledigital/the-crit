'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Users, Search, Filter, ArrowRight, BookOpen, Lightbulb, Palette, Layout, Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { EDUCATIONAL_CONTENT_CARDS } from '@/data/educational-content'
import { EducationalContentCard } from '@/types/educational-content'
import { ColorWheel, GoldenRatioCalculator, ContrastChecker } from '@/components'

const CATEGORIES = ['All', 'Fundamentals', 'Color Theory', 'Tutorials', 'Problem Solving', 'Education']
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced']
type SortOption = 'Newest' | 'Popular' | 'A-Z' | 'Reading time (short)' | 'Reading time (long)'

function RecentSearches({ items, onSelect, onClear }: { items: string[]; onSelect: (term: string) => void; onClear: () => void }) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex items-center gap-2 flex-wrap text-sm">
      <span className="text-neutral-500 font-ui">Recent:</span>
      {items.map((term) => (
        <button
          key={term}
          onClick={() => onSelect(term)}
          className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-ui"
        >
          {term}
        </button>
      ))}
      <button onClick={onClear} className="text-neutral-500 hover:text-neutral-700 underline font-ui">Clear</button>
    </div>
  )
}

function SearchBar({ searchTerm, onSearchChange, onSearchSubmit }: { searchTerm: string, onSearchChange: (term: string) => void, onSearchSubmit: (term: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search design topics..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && searchTerm.trim()) {
            onSearchSubmit(searchTerm.trim())
          }
        }}
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
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-700 mb-2 font-ui">Category</label>
        <div className="flex flex-wrap gap-2">
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
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-700 mb-2 font-ui">Difficulty</label>
        <div className="flex flex-wrap gap-2">
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
  const [sortBy, setSortBy] = useState<SortOption>('Newest')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'Guides' | 'Tools'>('Guides')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]') as string[]
      if (Array.isArray(saved)) setRecentSearches(saved.slice(0, 6))
    } catch {}
  }, [])

  const saveRecentSearch = (term: string) => {
    if (!term) return
    const next = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 6)
    setRecentSearches(next)
    try { localStorage.setItem('recentSearches', JSON.stringify(next)) } catch {}
  }

  const filteredCards = EDUCATIONAL_CONTENT_CARDS.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || card.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case 'Popular':
        return b.searchVolume - a.searchVolume
      case 'A-Z':
        return a.title.localeCompare(b.title)
      case 'Reading time (short)':
        return a.readingTime - b.readingTime
      case 'Reading time (long)':
        return b.readingTime - a.readingTime
      case 'Newest':
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    }
  })

  const trendingCards = [...EDUCATIONAL_CONTENT_CARDS]
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 3)

  const categoryCounts = CATEGORIES.filter(c => c !== 'All').map((category) => ({
    category,
    count: EDUCATIONAL_CONTENT_CARDS.filter(c => c.category === category).length
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/10">
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
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors font-ui font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Trending strip */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3 overflow-x-auto">
            <div className="inline-flex items-center gap-2 text-success-600 font-ui font-medium whitespace-nowrap">
              <TrendingUp className="w-4 h-4" /> Trending
            </div>
            <div className="h-5 w-px bg-neutral-200" />
            <div className="flex items-center gap-3">
              {trendingCards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/resources/${card.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 text-neutral-700 font-ui text-sm whitespace-nowrap"
                >
                  <Tag className="w-3 h-3" />
                  {card.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Search and Filters */}
      <section className="py-12 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2">
              {(['Guides', 'Tools'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-ui text-sm transition-all duration-200 border ${
                    activeTab === tab ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Guides' && (
              <>
                {/* Search */}
                <div className="max-w-2xl mx-auto">
                  <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm}
                    onSearchSubmit={(term) => saveRecentSearch(term)}
                  />
                  <div className="mt-3">
                    <RecentSearches
                      items={recentSearches}
                      onSelect={(term) => setSearchTerm(term)}
                      onClear={() => { setRecentSearches([]); try { localStorage.removeItem('recentSearches') } catch {} }}
                    />
                  </div>
                </div>

                {/* Filters */}
                <FilterBar
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  onCategoryChange={setSelectedCategory}
                  onDifficultyChange={setSelectedDifficulty}
                />

                {/* Collections (by category) */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-neutral-600 font-ui text-sm">Collections:</span>
                    {categoryCounts.map(({ category, count }) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition-all ${
                          selectedCategory === category
                            ? 'bg-primary-50 text-primary-700 border-primary-200'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-300'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {category}
                        <span className="text-neutral-500">({count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content Grid / Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'Guides' ? (
              <>
                {/* Results Info */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="font-ui text-neutral-600">
                    Showing {sortedCards.length} {sortedCards.length === 1 ? 'result' : 'results'}
                    {searchTerm && ` for "${searchTerm}"`}
                  </p>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="font-ui text-sm text-neutral-600">Sort by</label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="font-ui text-sm border border-neutral-300 rounded-md px-3 py-2 bg-white hover:border-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option>Newest</option>
                      <option>Popular</option>
                      <option>A-Z</option>
                      <option>Reading time (short)</option>
                      <option>Reading time (long)</option>
                    </select>
                  </div>
                </div>

                {/* Cards Grid */}
                {filteredCards.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedCards.map((card, index) => (
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
              </>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Interactive Color Wheel</h3>
                  <p className="font-ui text-neutral-600 mb-4">Explore color relationships and build harmonious palettes.</p>
                  <div className="flex justify-center"><ColorWheel size={220} onColorChange={() => {}} /></div>
                  <div className="mt-4 text-right">
                    <Link href="/resources/how-to-use-color-wheel" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-ui font-medium">
                      Learn color theory <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Golden Ratio Calculator</h3>
                  <p className="font-ui text-neutral-600 mb-4">Generate pleasing layout proportions instantly.</p>
                  <GoldenRatioCalculator className="w-full" />
                  <div className="mt-4 text-right">
                    <Link href="/resources/design-principles-for-beginners" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-ui font-medium">
                      Learn layout principles <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:col-span-2">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Contrast Checker</h3>
                  <p className="font-ui text-neutral-600 mb-4">Test color pairs for WCAG accessibility compliance.</p>
                  <ContrastChecker className="w-full" />
                  <div className="mt-4 text-right">
                    <Link href="/resources/design-mistakes" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-ui font-medium">
                      Avoid color mistakes <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Apply What You've Learned?
            </h2>
            <p className="font-ui text-lg mb-8 opacity-90">
              Get AI-powered feedback on your designs to see how well you're applying these principles.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-neutral-50 font-ui font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Free Design Feedback
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}