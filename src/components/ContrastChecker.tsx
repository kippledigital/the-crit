'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Palette, Check, X, Eye, AlertCircle } from 'lucide-react'

interface ContrastCheckerProps {
  className?: string
}

export default function ContrastChecker({ className = '' }: ContrastCheckerProps) {
  const [foreground, setForeground] = useState('#000000')
  const [background, setBackground] = useState('#ffffff')

  // Calculate contrast ratio using WCAG formula
  const getLuminance = useCallback((hex: string) => {
    const rgb = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    if (!rgb) return 0
    
    const [r, g, b] = [
      parseInt(rgb[1], 16) / 255,
      parseInt(rgb[2], 16) / 255,
      parseInt(rgb[3], 16) / 255
    ]
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }, [])

  const getContrastRatio = useCallback((color1: string, color2: string) => {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const lighter = Math.max(lum1, lum2)
    const darker = Math.min(lum1, lum2)
    return (lighter + 0.05) / (darker + 0.05)
  }, [getLuminance])

  const contrastRatio = getContrastRatio(foreground, background)

  const getContrastGrade = (ratio: number) => {
    if (ratio >= 7) return { grade: 'AAA', level: 'Enhanced', color: 'success' }
    if (ratio >= 4.5) return { grade: 'AA', level: 'Standard', color: 'success' }
    if (ratio >= 3) return { grade: 'AA Large', level: 'Large Text Only', color: 'warning' }
    return { grade: 'Fail', level: 'Insufficient', color: 'error' }
  }

  const grade = getContrastGrade(contrastRatio)

  const presetCombinations = [
    { name: 'Black on White', fg: '#000000', bg: '#ffffff' },
    { name: 'White on Black', fg: '#ffffff', bg: '#000000' },
    { name: 'Dark Gray on Light', fg: '#333333', bg: '#f8f9fa' },
    { name: 'Primary Brand', fg: '#ffffff', bg: '#ff6d0c' },
    { name: 'Secondary Brand', fg: '#ffffff', bg: '#db1af1' },
    { name: 'Error State', fg: '#ffffff', bg: '#dc2626' },
  ]

  const getGradeColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'text-success-600 bg-success-50 border-success-200'
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200'
    }
  }

  return (
    <div className={`bg-white rounded-2xl border border-neutral-200 shadow-lg p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-info-100 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-info-600" />
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-900">
            Contrast Checker
          </h3>
        </div>
        <p className="font-ui text-neutral-600 text-sm leading-relaxed max-w-md mx-auto">
          Test your color combinations for WCAG accessibility compliance
        </p>
      </div>

      {/* Color Input Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Foreground Color */}
        <div className="space-y-3">
          <label className="block font-ui font-medium text-neutral-700 text-sm">
            Foreground (Text) Color
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="w-16 h-12 rounded-lg border border-neutral-300 cursor-pointer"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <label className="block font-ui font-medium text-neutral-700 text-sm">
            Background Color
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-16 h-12 rounded-lg border border-neutral-300 cursor-pointer"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h4 className="font-ui font-semibold text-neutral-900 mb-4">Preview</h4>
        <div 
          className="rounded-xl border border-neutral-200 p-8 text-center"
          style={{ backgroundColor: background, color: foreground }}
        >
          <h5 className="font-display text-2xl font-bold mb-2">Sample Headline</h5>
          <p className="font-ui text-lg mb-4">This is regular body text to test readability.</p>
          <p className="font-ui text-sm">This is smaller text that might be used for captions or metadata.</p>
          <button 
            className="mt-4 px-6 py-2 border-2 rounded-lg font-ui font-medium transition-opacity hover:opacity-80"
            style={{ borderColor: foreground, color: foreground }}
          >
            Sample Button
          </button>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Main Result */}
        <div className="bg-gradient-to-br from-info-50 to-primary-50 rounded-xl p-6 border border-info-100">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-neutral-900 font-display mb-2">
              {contrastRatio.toFixed(2)}:1
            </div>
            <div className="text-sm font-ui text-neutral-600">Contrast Ratio</div>
          </div>
          
          <div className="flex justify-center mb-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-ui font-medium ${getGradeColor(grade.color)}`}>
              {grade.color === 'success' ? <Check className="w-4 h-4" /> : 
               grade.color === 'warning' ? <AlertCircle className="w-4 h-4" /> :
               <X className="w-4 h-4" />}
              {grade.grade} - {grade.level}
            </span>
          </div>
        </div>

        {/* Compliance Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-center">
            <div className="flex items-center justify-center mb-2">
              {contrastRatio >= 3 ? (
                <Check className="w-5 h-5 text-success-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="font-ui text-sm font-medium text-neutral-900 mb-1">Large Text</div>
            <div className="font-ui text-xs text-neutral-600">18px+ or 14px+ bold</div>
            <div className="font-ui text-xs text-neutral-500 mt-1">Min 3:1 ratio</div>
          </div>

          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-center">
            <div className="flex items-center justify-center mb-2">
              {contrastRatio >= 4.5 ? (
                <Check className="w-5 h-5 text-success-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="font-ui text-sm font-medium text-neutral-900 mb-1">Normal Text</div>
            <div className="font-ui text-xs text-neutral-600">Regular body text</div>
            <div className="font-ui text-xs text-neutral-500 mt-1">Min 4.5:1 ratio</div>
          </div>

          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-center">
            <div className="flex items-center justify-center mb-2">
              {contrastRatio >= 7 ? (
                <Check className="w-5 h-5 text-success-500" />
              ) : (
                <X className="w-5 h-5 text-neutral-400" />
              )}
            </div>
            <div className="font-ui text-sm font-medium text-neutral-900 mb-1">Enhanced</div>
            <div className="font-ui text-xs text-neutral-600">AAA Level</div>
            <div className="font-ui text-xs text-neutral-500 mt-1">Min 7:1 ratio</div>
          </div>
        </div>

        {/* Preset Combinations */}
        <div>
          <h4 className="font-ui font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-neutral-600" />
            Quick Tests
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presetCombinations.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setForeground(preset.fg)
                  setBackground(preset.bg)
                }}
                className="p-3 rounded-lg border border-neutral-200 hover:border-primary-300 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded border border-neutral-300"
                    style={{ backgroundColor: preset.fg }}
                  />
                  <div 
                    className="w-4 h-4 rounded border border-neutral-300"
                    style={{ backgroundColor: preset.bg }}
                  />
                </div>
                <div className="font-ui text-xs text-neutral-700 group-hover:text-primary-600">
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-info-50 rounded-xl p-4 border border-info-200">
          <h5 className="font-ui font-semibold text-info-900 mb-2">
            💡 Accessibility Tips
          </h5>
          <ul className="space-y-1 text-sm font-ui text-info-800">
            <li>• AA compliance (4.5:1) is the legal minimum in many countries</li>
            <li>• AAA compliance (7:1) provides better accessibility for everyone</li>
            <li>• Test with color blindness simulators for full accessibility</li>
            <li>• Don't rely on color alone to convey important information</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}