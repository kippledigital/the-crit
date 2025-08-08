'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Calculator, Eye, ArrowRight, Users, TrendingUp, Clock, Zap, Target, Tag } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components'

export default function ToolsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', active: true }
  ]

  const availableTools = [
    {
      id: 'color-wheel',
      name: 'Interactive Color Wheel',
      description: 'Master color theory with our interactive color wheel. Generate harmonies and test combinations.',
      icon: Palette,
      gradient: 'from-pink-500 to-orange-500',
      popular: true,
      tags: ['color theory', 'harmony', 'interactive'],
      category: 'Color Tools',
      difficulty: 'Beginner'
    },
    {
      id: 'contrast-checker', 
      name: 'WCAG Contrast Checker',
      description: 'Ensure your designs meet accessibility standards. Test color contrast ratios.',
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-500',
      trending: true,
      tags: ['accessibility', 'WCAG', 'contrast'],
      category: 'Accessibility',
      difficulty: 'Intermediate'
    },
    {
      id: 'golden-ratio',
      name: 'Golden Ratio Calculator', 
      description: 'Create perfectly proportioned designs using the golden ratio (1.618).',
      icon: Calculator,
      gradient: 'from-purple-500 to-pink-500',
      tags: ['proportions', 'mathematics', 'layout'],
      category: 'Layout Tools',
      difficulty: 'Advanced'
    }
  ]

  const upcomingTools = [
    {
      id: 'typography-scale',
      name: 'Typography Scale Generator',
      description: 'Generate harmonious typography scales for consistent text hierarchy.',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      eta: 'Coming Soon',
      tags: ['typography', 'scales', 'hierarchy'],
      category: 'Typography'
    },
    {
      id: 'layout-grid',
      name: 'Grid System Builder',
      description: 'Create custom grid systems for web and print layouts.',
      icon: Calculator,
      gradient: 'from-indigo-500 to-purple-500',
      eta: 'In Development',
      tags: ['grids', 'layout', 'systems'],
      category: 'Layout Tools'
    },
    {
      id: 'color-palette',
      name: 'Brand Color Palette Generator',
      description: 'Generate complete brand color palettes with accessibility compliance.',
      icon: Palette,
      gradient: 'from-red-500 to-pink-500',
      eta: 'Coming Soon',
      tags: ['branding', 'palettes', 'accessibility'],
      category: 'Color Tools'
    }
  ]

  function ToolCard({ tool, index, isUpcoming = false }: { tool: any, index: number, isUpcoming?: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const Icon = tool.icon

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Beginner': return 'text-success-600 bg-success-50 border-success-200'
        case 'Intermediate': return 'text-purple-600 bg-purple-50 border-purple-200'
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
        <div className="block h-full">
          <motion.div 
            className={`rounded-2xl border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
              isUpcoming ? 'bg-neutral-50' : 'bg-white'
            }`}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card Header */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <div className={`w-8 h-8 bg-gradient-to-br ${tool.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-ui text-sm font-medium">{tool.category}</span>
                </div>
                {!isUpcoming && tool.difficulty && (
                  <span className={`px-3 py-1 rounded-full text-xs font-ui font-medium border ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                )}
                {isUpcoming && (
                  <span className="bg-neutral-100 text-neutral-600 text-xs font-semibold px-3 py-1 rounded-full border border-neutral-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tool.eta}
                  </span>
                )}
              </div>

              {/* Badges */}
              {!isUpcoming && (
                <div className="flex items-center gap-2 mb-4">
                  {tool.popular && (
                    <span className="bg-purple-50 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full border border-purple-200">
                      Most Popular
                    </span>
                  )}
                  {tool.trending && (
                    <span className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full border border-green-200 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-purple-600 transition-colors duration-200 mb-3 leading-tight">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="font-ui text-neutral-600 text-sm leading-relaxed mb-6 flex-1">
                {tool.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-ui">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 3 && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-ui">
                    +{tool.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-neutral-500 border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-1">
                  <Calculator className="w-4 h-4" />
                  <span>{isUpcoming ? 'Coming soon' : 'Try tool'}</span>
                </div>
                
                <div className="flex items-center gap-1 text-purple-500 group-hover:gap-2 transition-all duration-200">
                  <span className="font-ui font-medium">
                    {isUpcoming ? 'Notify when ready' : 'Try Tool'}
                  </span>
                  {isUpcoming ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/10">
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section - Updated to match resources page */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-secondary-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm"
            >
              <span className="text-purple-600 font-ui font-medium">🛠️ Professional Design Tools</span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
              Design Tools That{' '}
              <span className="text-purple-500">Actually Work</span>
            </h1>
            
            <p className="font-ui text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Free, professional-grade tools to master design fundamentals. 
              Interactive calculators and generators for real design work.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-8 text-sm text-neutral-600 pt-4"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-purple-500" />
                <span>3 Active Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary-500" />
                <span>26k+ monthly users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success-500" />
                <span>100% Free</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Available Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Available Now
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Professional design tools ready to use. Free forever, no signup required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools in Progress */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Tools in Progress
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We're constantly building new tools to help designers work better. Here's what's coming next.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} isUpcoming={true} />
            ))}
          </div>

          {/* Newsletter Signup for Tool Updates */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-neutral-50 to-purple-50/30 rounded-2xl p-8 border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Get Early Access to New Tools
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Be the first to know when new design tools are ready. No spam, just updates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-purple-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready for Professional Feedback?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Use our tools to refine your designs, then get expert AI-powered feedback to take your work to the next level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-neutral-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Design Feedback
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Learn Design Fundamentals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}