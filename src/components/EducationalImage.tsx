'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, ZoomIn } from 'lucide-react'

interface EducationalImageProps {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  className?: string
}

export default function EducationalImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  className = '' 
}: EducationalImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`my-8 ${className}`}
    >
      <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="w-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex flex-col items-center justify-center text-neutral-500"
            style={{ aspectRatio: `${width}/${height}` }}
          >
            <ImageIcon className="w-16 h-16 mb-4 text-neutral-400" />
            <div className="text-center px-4">
              <div className="font-ui font-semibold text-neutral-700 mb-2">
                Visual Coming Soon
              </div>
              <div className="font-ui text-sm text-neutral-600 leading-relaxed">
                {alt}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div 
            className="absolute inset-0 bg-neutral-100 animate-pulse flex items-center justify-center"
          >
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Zoom indicator for loaded images */}
        {imageLoaded && !imageError && (
          <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/50 text-white p-2 rounded-lg">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div className="mt-4 text-center">
          <p className="font-ui text-sm text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  )
}