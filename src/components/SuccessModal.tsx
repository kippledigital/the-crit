'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

interface SuccessModalProps {
  isVisible: boolean
  isLoading?: boolean
  onClose: () => void
  onResetForm: () => void
  loadingAnimation?: any
  successAnimation?: any
  title?: string
  message?: string
  loadingTitle?: string
  loadingMessage?: string
}

export default function SuccessModal({ 
  isVisible, 
  isLoading = false,
  onClose, 
  onResetForm,
  loadingAnimation,
  successAnimation,
  title = "Thanks for your submission!",
  message = "Watch your email for your critique. We'll analyze your design and send you detailed feedback within 24 hours.",
  loadingTitle = "Processing...",
  loadingMessage = "Analyzing your design..."
}: SuccessModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true)
      // Trigger animation after mount with a slight delay for smooth transition
      setTimeout(() => setIsAnimating(true), 50)
    } else {
      setIsAnimating(false)
      // Delay unmount to allow exit animation
      setTimeout(() => setIsMounted(false), 300)
    }
  }, [isVisible])

  if (!isMounted) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleResetAndClose = () => {
    onResetForm()
    onClose()
  }

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center transition-all duration-300 ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {isLoading ? (
          <>
            {loadingAnimation && (
              <div className="w-32 h-32 mx-auto mb-6">
                <Lottie 
                  animationData={loadingAnimation} 
                  loop={true}
                  autoplay={true}
                />
              </div>
            )}
            
            <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
              {loadingTitle}
            </h3>
            
            <p className="font-ui text-neutral-600 mb-8 leading-relaxed">
              {loadingMessage}
            </p>
          </>
        ) : (
          <>
            {successAnimation && (
              <div className="w-32 h-32 mx-auto mb-6">
                <Lottie 
                  animationData={successAnimation} 
                  loop={false}
                  autoplay={true}
                />
              </div>
            )}
            
            <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
              {title}
            </h3>
            
            <p className="font-ui text-neutral-600 mb-8 leading-relaxed">
              {message}
            </p>
          </>
        )}
        
        {!isLoading && (
          <div className="space-y-3">
            <button
              onClick={handleResetAndClose}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-ui font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Submit Another Project
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-ui font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 