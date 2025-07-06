'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

interface LoadingOverlayProps {
  isVisible: boolean
  isTransitioning?: boolean
  message?: string
  useLottie?: boolean
  lottieAnimation?: any
}

export default function LoadingOverlay({ 
  isVisible, 
  isTransitioning = false,
  message = 'Submitting your design...', 
  useLottie = true,
  lottieAnimation 
}: LoadingOverlayProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isVisible || !isMounted) return null

  return (
    <div className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
      isTransitioning ? 'bg-black/30 opacity-0' : 'bg-black/50 opacity-100'
    }`}>
      <div className={`bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center transition-all duration-300 ${
        isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {useLottie && lottieAnimation ? (
          <div className={`w-24 h-24 mx-auto mb-4 transition-all duration-300 ${
            isTransitioning ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
          }`}>
            <Lottie 
              animationData={lottieAnimation} 
              loop={true}
              autoplay={true}
            />
          </div>
        ) : (
          <div className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
            isTransitioning ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
          }`}>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
          </div>
        )}
        
        <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
          Processing...
        </h3>
        
        <p className={`font-ui text-neutral-600 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {message}
        </p>
      </div>
    </div>
  )
} 