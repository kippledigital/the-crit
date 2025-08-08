'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <div className={`bg-white border-b border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm font-ui" aria-label="Breadcrumb">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              )}
              {item.href && !item.active ? (
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={
                    item.active 
                      ? "text-primary-600 font-medium" 
                      : "text-neutral-600"
                  }
                >
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}