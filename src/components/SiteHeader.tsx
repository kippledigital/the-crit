'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface SiteHeaderProps {
  showCTA?: boolean
  onCTAClick?: () => void
  ctaText?: string
}

export default function SiteHeader({ 
  showCTA = true, 
  onCTAClick,
  ctaText = "Get Free Feedback"
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      // For homepage sections, navigate to home first then scroll
      if (pathname !== '/') {
        router.push('/' + path)
      } else {
        // Already on homepage, just scroll
        const element = document.getElementById(path.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // Regular navigation
      router.push(path)
    }
    setIsMenuOpen(false)
  }

  const handleCTA = () => {
    if (onCTAClick) {
      onCTAClick()
    } else {
      // Default: scroll to form or navigate to homepage
      if (pathname === '/') {
        const element = document.getElementById('upload-section')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push('/#upload-section')
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="block">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-2xl font-bold font-display">
                <span className="text-neutral-900">The</span>{" "}
                <span className="text-primary-500">Crit</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('#features-section')}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigation('#examples')}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Examples
            </button>
            <Link
              href="/resources"
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Resources
            </Link>
            <Link
              href="/tools"
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Tools
            </Link>
            <button
              onClick={() => handleNavigation('#pricing')}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Pricing
            </button>
            {showCTA && (
              <motion.button
                onClick={handleCTA}
                className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {ctaText}
              </motion.button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-neutral-200 py-4"
            >
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => handleNavigation('#features-section')}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavigation('#examples')}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  Examples
                </button>
                <Link
                  href="/resources"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2 block"
                >
                  Resources
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2 block"
                >
                  Tools
                </Link>
                <button
                  onClick={() => handleNavigation('#pricing')}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  Pricing
                </button>
                {showCTA && (
                  <button
                    onClick={handleCTA}
                    className="text-left bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-4"
                  >
                    {ctaText}
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}