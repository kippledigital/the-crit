'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface SampleCritiqueModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SampleCritiqueModal({ isOpen, onClose }: SampleCritiqueModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="font-display text-2xl font-bold text-neutral-900">
                Sample Design Critique
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6 space-y-8">
                {/* Sample Design Image */}
                <div className="space-y-4">
                  <h3 className="font-ui font-semibold text-lg text-neutral-900">
                    Mobile App Onboarding Screen
                  </h3>
                  <div className="bg-neutral-100 rounded-xl p-6 flex items-center justify-center">
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4">
                      {/* Mock mobile app screen */}
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl mx-auto flex items-center justify-center">
                          <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <h4 className="font-ui font-bold text-lg text-neutral-900">
                          Welcome to AppName
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Get started in just a few steps. We'll help you set up your account and personalize your experience.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <button className="w-full bg-primary-500 text-white font-ui font-medium py-3 rounded-lg">
                          Get Started
                        </button>
                        <button className="w-full border border-neutral-300 text-neutral-700 font-ui font-medium py-3 rounded-lg">
                          Skip for Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critique Content */}
                <div className="space-y-8">
                  {/* What's Working Well */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <h3 className="font-ui font-semibold text-lg text-neutral-900">
                        What's Working Well
                      </h3>
                    </div>
                    <div className="space-y-4 pl-9">
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Clear Value Proposition
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          The headline "Welcome to AppName" immediately establishes context, and the subtitle clearly explains what users can expect. This reduces cognitive load and builds trust.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Strong Visual Hierarchy
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          The app icon, headline, and buttons create a natural flow that guides the user's eye from top to bottom. The primary CTA stands out appropriately.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Accessible Button Design
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          Both buttons have sufficient contrast ratios and clear, descriptive labels. The secondary action doesn't compete with the primary goal.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                      <h3 className="font-ui font-semibold text-lg text-neutral-900">
                        Areas for Improvement
                      </h3>
                    </div>
                    <div className="space-y-4 pl-9">
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Typography Scale Issues
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          The body text (14px) is too small for mobile screens. Consider increasing to 16px minimum for better readability and accessibility compliance.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Missing Progress Indicator
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          Users don't know how many steps are in the onboarding process. Add a progress bar or step indicator to set expectations and reduce abandonment.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Insufficient Touch Targets
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          The buttons should be at least 44px tall for comfortable thumb interaction. Current height may cause accidental taps or frustration.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Limited Personalization Preview
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          Users can't see what "personalize your experience" means. Consider adding a brief preview or example of what they'll be setting up.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Why This Matters */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Info className="w-6 h-6 text-blue-500" />
                      <h3 className="font-ui font-semibold text-lg text-neutral-900">
                        Why This Matters
                      </h3>
                    </div>
                    <div className="space-y-4 pl-9">
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          User Experience Impact
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          Onboarding screens have the highest abandonment rates. Small improvements in clarity and usability can increase completion rates by 20-30%.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Accessibility Compliance
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          WCAG guidelines require 16px minimum font size and 44px touch targets. Meeting these standards ensures your app works for everyone.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-ui font-medium text-neutral-900">
                          Business Metrics
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          Better onboarding directly impacts user retention and lifetime value. Users who complete onboarding are 3x more likely to become active users.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="border-t border-neutral-200 pt-6 mt-8">
                  <div className="text-center space-y-4">
                    <h3 className="font-ui font-semibold text-lg text-neutral-900">
                      Ready to get feedback on your design?
                    </h3>
                    <p className="text-base text-neutral-600">
                      Get detailed critiques like this in under 60 seconds
                    </p>
                    <button
                      onClick={() => {
                        onClose()
                        // Scroll to upload form after a brief delay to allow modal to close
                        setTimeout(() => {
                          document.getElementById('upload-section')?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          })
                        }, 300)
                      }}
                      className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Upload Your Design
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 