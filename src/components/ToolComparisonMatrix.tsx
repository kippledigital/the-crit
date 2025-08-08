'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Star, ExternalLink, Download, Zap, Users, Palette, Code, Smartphone } from 'lucide-react'

interface ComparisonFeature {
  category: string
  features: {
    name: string
    figma: 'excellent' | 'good' | 'fair' | 'poor' | 'none'
    adobeXD: 'excellent' | 'good' | 'fair' | 'poor' | 'none'
    description: string
    importance: 'critical' | 'high' | 'medium' | 'low'
  }[]
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    category: 'Design & Prototyping',
    features: [
      {
        name: 'Vector Design Tools',
        figma: 'excellent',
        adobeXD: 'excellent',
        description: 'Core design tools for creating UI elements',
        importance: 'critical'
      },
      {
        name: 'Component System',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Reusable design components and symbols',
        importance: 'critical'
      },
      {
        name: 'Auto-Layout',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Responsive design with automatic spacing',
        importance: 'high'
      },
      {
        name: 'Interactive Prototyping',
        figma: 'excellent',
        adobeXD: 'excellent',
        description: 'Click-through prototypes with animations',
        importance: 'high'
      },
      {
        name: 'Advanced Animations',
        figma: 'good',
        adobeXD: 'excellent',
        description: 'Timeline-based animations and micro-interactions',
        importance: 'medium'
      }
    ]
  },
  {
    category: 'Collaboration & Sharing',
    features: [
      {
        name: 'Real-time Collaboration',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Multiple users editing simultaneously',
        importance: 'critical'
      },
      {
        name: 'Commenting System',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Contextual feedback and discussions',
        importance: 'high'
      },
      {
        name: 'Version History',
        figma: 'excellent',
        adobeXD: 'fair',
        description: 'Track changes and revert to previous versions',
        importance: 'high'
      },
      {
        name: 'Share & Present',
        figma: 'excellent',
        adobeXD: 'excellent',
        description: 'Share prototypes with stakeholders',
        importance: 'high'
      },
      {
        name: 'Developer Handoff',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'CSS code generation and asset export',
        importance: 'high'
      }
    ]
  },
  {
    category: 'Platform & Integration',
    features: [
      {
        name: 'Web-based Access',
        figma: 'excellent',
        adobeXD: 'none',
        description: 'Access from any browser without installation',
        importance: 'high'
      },
      {
        name: 'Desktop Performance',
        figma: 'good',
        adobeXD: 'excellent',
        description: 'Native desktop app performance',
        importance: 'medium'
      },
      {
        name: 'Plugin Ecosystem',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Third-party plugins and extensions',
        importance: 'medium'
      },
      {
        name: 'Creative Cloud Integration',
        figma: 'none',
        adobeXD: 'excellent',
        description: 'Integration with Adobe Creative Suite',
        importance: 'medium'
      },
      {
        name: 'File Import/Export',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Support for various file formats',
        importance: 'high'
      }
    ]
  },
  {
    category: 'Learning & Support',
    features: [
      {
        name: 'Learning Curve',
        figma: 'good',
        adobeXD: 'excellent',
        description: 'Ease of getting started for beginners',
        importance: 'high'
      },
      {
        name: 'Community Resources',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Tutorials, templates, and community support',
        importance: 'medium'
      },
      {
        name: 'Official Documentation',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Quality of official help and documentation',
        importance: 'medium'
      },
      {
        name: 'Template Library',
        figma: 'excellent',
        adobeXD: 'good',
        description: 'Pre-built templates and UI kits',
        importance: 'medium'
      }
    ]
  }
]

const FEATURE_ICONS = {
  'Design & Prototyping': <Palette className="w-5 h-5" />,
  'Collaboration & Sharing': <Users className="w-5 h-5" />,
  'Platform & Integration': <Code className="w-5 h-5" />,
  'Learning & Support': <Star className="w-5 h-5" />
}

const SCORE_CONFIG = {
  excellent: { color: 'text-green-600 bg-green-50 border-green-200', icon: <Check className="w-4 h-4" />, score: 5 },
  good: { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: <Check className="w-4 h-4" />, score: 4 },
  fair: { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: <Check className="w-4 h-4" />, score: 3 },
  poor: { color: 'text-orange-600 bg-orange-50 border-orange-200', icon: <X className="w-4 h-4" />, score: 2 },
  none: { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: <X className="w-4 h-4" />, score: 1 }
}

const IMPORTANCE_CONFIG = {
  critical: { color: 'text-red-600 bg-red-50', label: 'Critical' },
  high: { color: 'text-orange-600 bg-orange-50', label: 'High' },
  medium: { color: 'text-blue-600 bg-blue-50', label: 'Medium' },
  low: { color: 'text-gray-600 bg-gray-50', label: 'Low' }
}

export default function ToolComparisonMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showScores, setShowScores] = useState(false)

  // Calculate overall scores
  const calculateScore = (tool: 'figma' | 'adobeXD') => {
    let totalScore = 0
    let totalWeight = 0
    
    COMPARISON_DATA.forEach(category => {
      category.features.forEach(feature => {
        const weight = feature.importance === 'critical' ? 3 : 
                      feature.importance === 'high' ? 2 : 
                      feature.importance === 'medium' ? 1.5 : 1
        totalScore += SCORE_CONFIG[feature[tool]].score * weight
        totalWeight += weight
      })
    })
    
    return Math.round((totalScore / totalWeight) * 20) // Convert to percentage
  }

  const figmaScore = calculateScore('figma')
  const adobeXDScore = calculateScore('adobeXD')

  const filteredData = selectedCategory === 'all' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter(category => category.category === selectedCategory)

  const ScoreIndicator = ({ score, label }: { score: 'excellent' | 'good' | 'fair' | 'poor' | 'none', label: string }) => {
    const config = SCORE_CONFIG[score]
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${config.color}`}>
        {config.icon}
        {showScores ? `${config.score}/5` : label}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Figma vs Adobe XD: Complete Comparison
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive feature-by-feature comparison to help you choose the right design tool for your portfolio and workflow.
        </p>

        {/* Overall Scores */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <h3 className="text-lg font-semibold">Figma</h3>
            </div>
            <div className="text-3xl font-bold text-primary-600">{figmaScore}%</div>
            <p className="text-sm text-gray-500">Overall Score</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">XD</span>
              </div>
              <h3 className="text-lg font-semibold">Adobe XD</h3>
            </div>
            <div className="text-3xl font-bold text-secondary-600">{adobeXDScore}%</div>
            <p className="text-sm text-gray-500">Overall Score</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={() => setShowScores(!showScores)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showScores 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showScores ? 'Show Labels' : 'Show Scores'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {COMPARISON_DATA.map(category => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {FEATURE_ICONS[category.category as keyof typeof FEATURE_ICONS]}
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="space-y-8">
        {filteredData.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {FEATURE_ICONS[category.category as keyof typeof FEATURE_ICONS]}
                <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
              </div>
            </div>

            {/* Features Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-900">Importance</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-900">Figma</th>
                    <th className="text-center py-4 px-4 font-medium text-gray-900">Adobe XD</th>
                  </tr>
                </thead>
                <tbody>
                  {category.features.map((feature, index) => (
                    <tr key={feature.name} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{feature.name}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${IMPORTANCE_CONFIG[feature.importance].color}`}>
                          {IMPORTANCE_CONFIG[feature.importance].label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <ScoreIndicator score={feature.figma} label="Figma" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <ScoreIndicator score={feature.adobeXD} label="Adobe XD" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
          <h3 className="text-xl font-bold text-primary-900 mb-4">Choose Figma If:</h3>
          <ul className="space-y-2 text-primary-800">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <span>You prioritize real-time collaboration and team workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <span>You want web-based access from any device</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <span>You need advanced component systems and auto-layout</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <span>You value a strong plugin ecosystem</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200">
          <h3 className="text-xl font-bold text-secondary-900 mb-4">Choose Adobe XD If:</h3>
          <ul className="space-y-2 text-secondary-800">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <span>You're already using Adobe Creative Cloud</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <span>You prioritize advanced animation and micro-interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <span>You prefer native desktop app performance</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <span>You want an easier learning curve for beginners</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          This comparison is based on current features and community feedback as of January 2025.
        </p>
        <div className="flex justify-center gap-4">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Get AI-Powered Design Feedback
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