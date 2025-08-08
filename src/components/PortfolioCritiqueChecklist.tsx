'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Download, Share2, Eye, FileText, Star, Users, TrendingUp } from 'lucide-react'

interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  importance: 'critical' | 'high' | 'medium'
  completed: boolean
}

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const CATEGORIES: Category[] = [
  {
    id: 'structure',
    title: 'Portfolio Structure',
    description: 'Organization and presentation',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Project storytelling and process',
    icon: <Eye className="w-5 h-5" />
  },
  {
    id: 'visual-design',
    title: 'Visual Design',
    description: 'Aesthetics and presentation quality',
    icon: <Star className="w-5 h-5" />
  },
  {
    id: 'user-experience',
    title: 'User Experience',
    description: 'Navigation and accessibility',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'career-readiness',
    title: 'Career Readiness',
    description: 'Professional presentation and goals',
    icon: <TrendingUp className="w-5 h-5" />
  }
]

const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Portfolio Structure
  {
    id: 'clear-navigation',
    category: 'structure',
    title: 'Clear Navigation',
    description: 'Easy-to-follow menu structure with logical flow',
    importance: 'critical',
    completed: false
  },
  {
    id: 'consistent-layout',
    category: 'structure',
    title: 'Consistent Layout',
    description: 'Uniform spacing, typography, and visual hierarchy',
    importance: 'high',
    completed: false
  },
  {
    id: 'mobile-responsive',
    category: 'structure',
    title: 'Mobile Responsive',
    description: 'Works perfectly on all device sizes',
    importance: 'critical',
    completed: false
  },
  {
    id: 'fast-loading',
    category: 'structure',
    title: 'Fast Loading',
    description: 'Optimized images and efficient code',
    importance: 'high',
    completed: false
  },

  // Case Studies
  {
    id: 'problem-statement',
    category: 'case-studies',
    title: 'Clear Problem Statement',
    description: 'Well-defined challenge or opportunity',
    importance: 'critical',
    completed: false
  },
  {
    id: 'process-documentation',
    category: 'case-studies',
    title: 'Process Documentation',
    description: 'Shows your thinking and decision-making',
    importance: 'high',
    completed: false
  },
  {
    id: 'before-after',
    category: 'case-studies',
    title: 'Before/After Examples',
    description: 'Demonstrates improvement and impact',
    importance: 'high',
    completed: false
  },
  {
    id: 'results-metrics',
    category: 'case-studies',
    title: 'Results & Metrics',
    description: 'Quantifiable outcomes and success measures',
    importance: 'medium',
    completed: false
  },

  // Visual Design
  {
    id: 'color-harmony',
    category: 'visual-design',
    title: 'Color Harmony',
    description: 'Cohesive color palette with proper contrast',
    importance: 'high',
    completed: false
  },
  {
    id: 'typography-hierarchy',
    category: 'visual-design',
    title: 'Typography Hierarchy',
    description: 'Clear text hierarchy and readable fonts',
    importance: 'high',
    completed: false
  },
  {
    id: 'visual-consistency',
    category: 'visual-design',
    title: 'Visual Consistency',
    description: 'Consistent design language across all projects',
    importance: 'critical',
    completed: false
  },
  {
    id: 'image-quality',
    category: 'visual-design',
    title: 'High-Quality Images',
    description: 'Sharp, professional project screenshots',
    importance: 'high',
    completed: false
  },

  // User Experience
  {
    id: 'intuitive-navigation',
    category: 'user-experience',
    title: 'Intuitive Navigation',
    description: 'Users can easily find what they need',
    importance: 'critical',
    completed: false
  },
  {
    id: 'clear-call-to-action',
    category: 'user-experience',
    title: 'Clear Call-to-Action',
    description: 'Obvious next steps for visitors',
    importance: 'high',
    completed: false
  },
  {
    id: 'accessibility-compliance',
    category: 'user-experience',
    title: 'Accessibility Compliance',
    description: 'WCAG guidelines and screen reader support',
    importance: 'medium',
    completed: false
  },
  {
    id: 'loading-states',
    category: 'user-experience',
    title: 'Loading States',
    description: 'Clear feedback during interactions',
    importance: 'medium',
    completed: false
  },

  // Career Readiness
  {
    id: 'about-section',
    category: 'career-readiness',
    title: 'About Section',
    description: 'Clear personal brand and value proposition',
    importance: 'high',
    completed: false
  },
  {
    id: 'contact-information',
    category: 'career-readiness',
    title: 'Contact Information',
    description: 'Easy ways to reach you professionally',
    importance: 'critical',
    completed: false
  },
  {
    id: 'resume-link',
    category: 'career-readiness',
    title: 'Resume Link',
    description: 'Downloadable or linked resume',
    importance: 'high',
    completed: false
  },
  {
    id: 'professional-photo',
    category: 'career-readiness',
    title: 'Professional Photo',
    description: 'High-quality headshot or professional image',
    importance: 'medium',
    completed: false
  }
]

export default function PortfolioCritiqueChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  const toggleItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getImportanceText = (importance: string) => {
    switch (importance) {
      case 'critical': return 'Critical'
      case 'high': return 'High'
      case 'medium': return 'Medium'
      default: return 'Low'
    }
  }

  const filteredChecklist = checklist.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const completionMatch = showCompleted || !item.completed
    return categoryMatch && completionMatch
  })

  const completedCount = checklist.filter(item => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const exportChecklist = () => {
    const completedItems = checklist.filter(item => item.completed)
    const incompleteItems = checklist.filter(item => !item.completed)
    
    const exportText = `Portfolio Critique Checklist - ${new Date().toLocaleDateString()}

COMPLETED ITEMS (${completedItems.length}/${totalCount}):
${completedItems.map(item => `✅ ${item.title}`).join('\n')}

REMAINING ITEMS (${incompleteItems.length}/${totalCount}):
${incompleteItems.map(item => `⭕ ${item.title} (${item.importance})`).join('\n')}

Progress: ${progressPercentage}% complete
Generated by The Crit Portfolio Tools`

    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-critique-checklist.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Portfolio Critique Checklist
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive checklist to evaluate and improve your design portfolio. 
          Based on feedback from 10,000+ designers and hiring managers.
        </p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {completedCount}/{totalCount} items
            </span>
            <span className="text-sm font-medium text-gray-700">
              {progressPercentage}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={exportChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Checklist
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showCompleted 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-secondary-500 text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            {showCompleted ? 'Hide Completed' : 'Show Completed'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {filteredChecklist.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border rounded-lg transition-all duration-200 ${
              item.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex-shrink-0 mt-1"
              >
                {item.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`font-medium ${
                    item.completed ? 'text-green-700 line-through' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    getImportanceColor(item.importance)
                  }`}>
                    {getImportanceText(item.importance)}
                  </span>
                </div>
                <p className={`text-sm ${
                  item.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          This checklist is based on feedback from design professionals and hiring managers.
        </p>
        <div className="flex justify-center gap-4">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Get AI-Powered Portfolio Feedback
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
            View Portfolio Examples
          </button>
        </div>
      </div>
    </div>
  )
} 