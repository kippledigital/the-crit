'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Copy, Check, Info } from 'lucide-react'

interface GoldenRatioCalculatorProps {
  className?: string
}

const GOLDEN_RATIO = 1.618033988749

export default function GoldenRatioCalculator({ className = '' }: GoldenRatioCalculatorProps) {
  const [inputValue, setInputValue] = useState<string>('100')
  const [inputType, setInputType] = useState<'width' | 'height'>('width')
  const [unit, setUnit] = useState<'px' | 'em' | 'rem' | '%'>('px')
  const [copied, setCopied] = useState<string | null>(null)

  const numericValue = parseFloat(inputValue) || 0
  
  const calculations = useCallback(() => {
    if (inputType === 'width') {
      // If width is given, calculate height
      const height = numericValue / GOLDEN_RATIO
      const largerWidth = numericValue * GOLDEN_RATIO
      return {
        given: { label: 'Width', value: numericValue },
        calculated: { label: 'Height', value: height },
        larger: { label: 'Larger Width', value: largerWidth },
        ratio: `${numericValue.toFixed(2)}:${height.toFixed(2)}`
      }
    } else {
      // If height is given, calculate width
      const width = numericValue * GOLDEN_RATIO
      const largerHeight = numericValue * GOLDEN_RATIO
      return {
        given: { label: 'Height', value: numericValue },
        calculated: { label: 'Width', value: width },
        larger: { label: 'Larger Height', value: largerHeight },
        ratio: `${width.toFixed(2)}:${numericValue.toFixed(2)}`
      }
    }
  }, [numericValue, inputType])

  const results = calculations()

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const formatValue = (value: number) => {
    return `${value.toFixed(2)}${unit}`
  }

  return (
    <div className={`bg-white rounded-2xl border border-neutral-200 shadow-lg p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-900">
            Golden Ratio Calculator
          </h3>
        </div>
        <p className="font-ui text-neutral-600 text-sm leading-relaxed max-w-md mx-auto">
          Calculate proportions using the golden ratio (φ = 1.618) for harmonious designs
        </p>
      </div>

      {/* Input Controls */}
      <div className="space-y-6 mb-8">
        {/* Input Type Selection */}
        <div className="space-y-3">
          <label className="block font-ui font-medium text-neutral-700 text-sm">
            I have a:
          </label>
          <div className="flex gap-3">
            {[
              { value: 'width', label: 'Width' },
              { value: 'height', label: 'Height' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setInputType(option.value as 'width' | 'height')}
                className={`flex-1 px-4 py-3 rounded-lg font-ui font-medium transition-all duration-200 ${
                  inputType === option.value
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <div className="space-y-3">
          <label className="block font-ui font-medium text-neutral-700 text-sm">
            {inputType === 'width' ? 'Width' : 'Height'} value:
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
              step="0.01"
              min="0"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300 bg-white"
            >
              <option value="px">px</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
              <option value="%">%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {numericValue > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Main Result */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
            <h4 className="font-ui font-semibold text-neutral-900 mb-4 text-center">
              Golden Ratio Proportions
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 font-display mb-1">
                  {formatValue(results.given.value)}
                </div>
                <div className="text-sm font-ui text-neutral-600">
                  {results.given.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 font-display mb-1">
                  {formatValue(results.calculated.value)}
                </div>
                <div className="text-sm font-ui text-neutral-600">
                  {results.calculated.label}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary-200 text-center">
              <div className="text-lg font-semibold text-neutral-700 font-ui mb-1">
                Ratio: {results.ratio}
              </div>
              <div className="text-sm text-neutral-500 font-ui">
                ≈ 1.618:1 (Golden Ratio)
              </div>
            </div>
          </div>

          {/* Additional Calculations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CSS Values */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h5 className="font-ui font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary-500" />
                CSS Values
              </h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between group">
                  <span className="font-ui text-sm text-neutral-600">
                    {results.given.label.toLowerCase()}:
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
                      {formatValue(results.given.value)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(formatValue(results.given.value), 'given')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                      title="Copy to clipboard"
                    >
                      {copied === 'given' ? (
                        <Check className="w-3 h-3 text-success-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="font-ui text-sm text-neutral-600">
                    {results.calculated.label.toLowerCase()}:
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
                      {formatValue(results.calculated.value)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(formatValue(results.calculated.value), 'calculated')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                      title="Copy to clipboard"
                    >
                      {copied === 'calculated' ? (
                        <Check className="w-3 h-3 text-success-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Extended Sequence */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h5 className="font-ui font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-secondary-500" />
                Extended Size
              </h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-sm text-neutral-600">
                    {results.larger.label.toLowerCase()}:
                  </span>
                  <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {formatValue(results.larger.value)}
                  </code>
                </div>
                <div className="text-xs text-neutral-500 font-ui mt-2">
                  For creating a larger element in the same proportional system
                </div>
              </div>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="bg-info-50 rounded-xl p-4 border border-info-200">
            <h5 className="font-ui font-semibold text-info-900 mb-2">
              💡 Usage Tips
            </h5>
            <ul className="space-y-1 text-sm font-ui text-info-800">
              <li>• Use for layout proportions (sidebar width vs content width)</li>
              <li>• Apply to typography scales (heading size vs body text)</li>
              <li>• Great for image cropping and card dimensions</li>
              <li>• Creates naturally pleasing visual relationships</li>
            </ul>
          </div>
        </motion.div>
      )}

      {numericValue === 0 && (
        <div className="text-center py-8 text-neutral-400">
          <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-ui text-sm">
            Enter a value above to calculate golden ratio proportions
          </p>
        </div>
      )}
    </div>
  )
}