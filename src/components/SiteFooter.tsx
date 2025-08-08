'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Mail, ExternalLink } from 'lucide-react'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-4">
              <h3 className="text-2xl font-bold font-display">
                <span className="text-neutral-900">The</span>{" "}
                <span className="text-primary-500">Crit</span>
              </h3>
            </Link>
            <p className="font-ui text-neutral-600 leading-relaxed mb-4">
              AI-powered design feedback to help you create better work. Professional critique in minutes, not days.
            </p>
            <div className="flex items-center gap-2 text-sm font-ui text-neutral-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for designers</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-ui font-semibold text-neutral-900 mb-4">Product</h4>
            <nav className="space-y-3 font-ui text-sm">
              <Link href="/" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Get Feedback
              </Link>
              <Link href="/#features-section" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                How It Works
              </Link>
              <Link href="/#examples" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Examples
              </Link>
              <Link href="/#pricing" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-ui font-semibold text-neutral-900 mb-4">Learn</h4>
            <nav className="space-y-3 font-ui text-sm">
              <Link href="/resources" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Design Education
              </Link>
              <Link href="/resources/portfolio-critique-checklist" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Portfolio Checklist
              </Link>
              <Link href="/resources/figma-vs-adobe-xd" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Tool Comparisons
              </Link>
              <Link href="/resources/portfolio-examples-gallery" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Portfolio Examples
              </Link>
              <Link href="/tools" className="block text-neutral-600 hover:text-primary-600 transition-colors">
                Free Tools
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-ui font-semibold text-neutral-900 mb-4">Stay in the loop</h4>
            <p className="font-ui text-sm text-neutral-600 mb-4">
              Get practical design tips and new tool updates. No spam, unsubscribe anytime.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@design.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-900 font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold transition"
                onClick={() => window.open('mailto:hello@thecrit.co?subject=Newsletter Signup', '_blank')}
              >
                Subscribe
              </button>
            </div>

            <div className="mt-6 space-y-3 font-ui text-sm">
              <a
                href="mailto:hello@thecrit.co"
                className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@thecrit.co
              </a>
              <button
                onClick={() => window.open('mailto:hello@thecrit.co?subject=Tool Suggestion', '_blank')}
                className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Suggest Tools
              </button>
              <div className="pt-2 space-y-2 font-ui text-xs text-neutral-500">
                <button className="hover:text-neutral-700 transition-colors">Privacy Policy</button>
                <div>
                  <button className="hover:text-neutral-700 transition-colors">Terms of Service</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-ui text-sm text-neutral-500">
              © {currentYear} The Crit. All rights reserved.
            </p>
            <div className="flex items-center gap-6 font-ui text-sm text-neutral-500">
              <Link href="/resources" className="hover:text-neutral-700 transition-colors">
                Resources
              </Link>
              <Link href="/tools" className="hover:text-neutral-700 transition-colors">
                Tools
              </Link>
              <a 
                href="mailto:hello@thecrit.co" 
                className="hover:text-neutral-700 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}