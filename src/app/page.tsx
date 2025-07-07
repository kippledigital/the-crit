'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { FormData as FormDataType, ApiResponse } from '@/types/form'
import SuccessModal from '@/components/SuccessModal'
import SampleCritiqueModal from '@/components/SampleCritiqueModal'
import { loadAnimationData } from '@/lib/lottie-animations'
import { ANIMATION_CONFIG, SUCCESS_MODAL_CONFIG } from '@/lib/animation-config'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Tooltip from '@/components/Tooltip'
import { Users, FileText, Star, Zap, GraduationCap, BarChart3, Heart, Gift, Lock, Menu, X, ArrowRight } from 'lucide-react'


function getFileType(file: File) {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) return 'pdf'
  return 'other'
}

function FilePreview({ file }: { file: File }) {
  const type = getFileType(file)
  const url = useMemo(() => type === 'image' ? URL.createObjectURL(file) : null, [file, type])
  const [imgError, setImgError] = useState(false)
  useEffect(() => { return () => { if (url) URL.revokeObjectURL(url) } }, [url])

  // Consistent SVG icons (reverted to original design)
  const DocumentIcon = (
    <span className="w-8 h-8 flex items-center justify-center bg-neutral-100 text-neutral-400 rounded mr-2 border border-neutral-200">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
  const ImageIcon = (
    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-400 rounded mr-2 border border-neutral-200">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 18l5-5a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 0 2.8 0L20 16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  )

  if (type === 'image' && url && !imgError) {
    return <img src={url} alt={file.name} className="w-8 h-8 object-cover rounded mr-2 border border-neutral-200" onError={() => setImgError(true)} />
  }
  if (type === 'image') {
    return ImageIcon
  }
  if (type === 'pdf') {
    return DocumentIcon
  }
  return DocumentIcon
}

// Enhanced Count-up animation component with reduced motion support
function CountUp({ end, duration = 2.5, isVisible }: { end: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  useEffect(() => {
    if (!isVisible) return
    
    if (prefersReducedMotion) {
      setCount(end)
      return
    }
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Use easeOutQuart for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isVisible, prefersReducedMotion])
  
  return <span>{count.toLocaleString()}</span>
}

// Polished Trust Section Component with consistent design system
function TrustSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  
  const stats = [
    {
      id: 1,
      number: 2847,
      label: "Designers Helped",
      bgColor: "bg-info-500",
      hoverColor: "group-hover:bg-info-400",
      icon: <Users className="w-7 h-7 text-white" />
    },
    {
      id: 2,
      number: 15234,
      label: "Designs Improved",
      bgColor: "bg-success-500",
      hoverColor: "group-hover:bg-success-400",
      icon: <FileText className="w-7 h-7 text-white" />
    },
    {
      id: 3,
      number: 4.8,
      label: "Helpfulness Rating",
      suffix: "/5",
      bgColor: "bg-primary-500",
      hoverColor: "group-hover:bg-primary-400",
      icon: <Star className="w-7 h-7 text-white" />
    }
  ]
  
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-neutral-50 to-primary-50/20" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.04'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-primary-200 mb-6 shadow-sm"
            >
              <span className="text-primary-600 font-ui font-medium text-sm">✨ Proven Results</span>
            </motion.div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              Trusted by Designers{" "}
              <span className="text-secondary-500">
                Worldwide
              </span>
            </h2>
            <p className="font-ui text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands of designers who have transformed their work with AI-powered feedback
            </p>
          </motion.div>
          
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                className="group"
              >
                <motion.div 
                  className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    y: -4,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex flex-col items-center space-y-6">
                    {/* Diversified brand color icon containers */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + 0.3,
                        type: "spring",
                        bounce: 0.3
                      }}
                      className={`w-14 h-14 rounded-xl ${stat.bgColor} ${stat.hoverColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      {stat.icon}
                    </motion.div>
                    
                    {/* Number with count-up animation */}
                    <div className="text-center space-y-2">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-neutral-900 font-display"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.number === 4.8 ? (
                          <span>{stat.number}{stat.suffix}</span>
                        ) : (
                          <span>
                            <CountUp end={stat.number} isVisible={isInView} duration={2.5} />
                          </span>
                        )}
                      </motion.div>
                      <div className="text-neutral-600 font-ui font-medium text-base">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Polished Features Section Component with consistent design system
function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  
  const features = [
    {
      id: 1,
      title: "60-Second Critiques",
      description: "Get professional-level feedback faster than waiting for a colleague's response. No more delays in your creative process.",
      badge: "⚡ Lightning Fast",
      bgColor: "bg-primary-500",
      hoverColor: "group-hover:bg-primary-400",
      icon: <Zap className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: "Learn Design Principles",
      description: "Understand typography, color theory, and UX principles through real examples from your own work.",
      badge: "📚 Educational",
      bgColor: "bg-info-500",
      hoverColor: "group-hover:bg-info-400",
      icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: "Complete Design Analysis",
      description: "AI agents analyze layout, accessibility, brand consistency, and user experience in one comprehensive review.",
      badge: "🎯 Comprehensive",
      bgColor: "bg-success-500",
      hoverColor: "group-hover:bg-success-400",
      icon: <BarChart3 className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: "Encouraging Mentorship",
      description: "Supportive, constructive feedback that builds confidence and skills, not criticism that discourages.",
      badge: "💝 Supportive",
      bgColor: "bg-secondary-400",
      hoverColor: "group-hover:bg-secondary-300",
      icon: <Heart className="w-6 h-6 text-white" />
    },
    {
      id: 5,
      title: "Try It Free",
      description: "Start immediately with no payment required. Experience professional-quality critiques before making any commitment.",
      badge: "🆓 No Cost",
      bgColor: "bg-success-600",
      hoverColor: "group-hover:bg-success-500",
      icon: <Gift className="w-6 h-6 text-white" />
    },
    {
      id: 6,
      title: "Private & Secure",
      description: "Your designs are processed with enterprise-grade security and never stored or shared. Complete confidentiality guaranteed.",
      badge: "🔒 Secure",
      bgColor: "bg-info-600",
      hoverColor: "group-hover:bg-info-500",
      icon: <Lock className="w-6 h-6 text-white" />
    }
  ]
  
  return (
    <section className="py-24 bg-neutral-50" ref={ref} id="features-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary-50 rounded-full border border-primary-200 mb-6 shadow-sm"
          >
            <span className="text-primary-600 font-ui font-medium text-sm">🎨 Why Choose Us</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Why Designers Choose{" "}
            <span className="text-secondary-500">
              The Crit
            </span>
          </h2>
          <p className="font-ui text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Professional feedback that accelerates your growth and elevates your design career
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group h-full"
            >
              <motion.div 
                className="relative bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                whileHover={{ 
                  y: -4,
                  scale: 1.02
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="absolute -top-3 left-4 px-3 py-1 bg-white rounded-full border border-neutral-200 text-xs font-ui font-medium text-neutral-600 shadow-sm"
                >
                  {feature.badge}
                </motion.div>
                
                <div className="pt-4 flex flex-col h-full">
                  {/* Diversified brand color icon containers */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      bounce: 0.3
                    }}
                    className={`w-14 h-14 rounded-xl ${feature.bgColor} ${feature.hoverColor} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-all duration-300`}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <motion.h3 
                      className="font-ui font-bold text-xl text-neutral-900 group-hover:text-primary-600 transition-colors duration-300 leading-tight"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <p className="font-ui text-neutral-600 leading-relaxed text-base">
                      {feature.description}
                    </p>
                    
                    {/* Subtle arrow indicator */}
                    <motion.div 
                      className="flex items-center text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-ui font-medium mr-2">Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Polished Testimonials Section Component
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      company: "Spotify",
      avatar: "S",
      quote: "The Crit helped me identify issues in my portfolio that I never noticed. I landed my dream job within 2 months!",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Freelance Designer",
      company: "Independent",
      avatar: "M",
      quote: "Instant feedback on my client work has been a game-changer. My clients are happier and I'm charging more.",
      rating: 5
    },
    {
      id: 3,
      name: "Alex Thompson",
      role: "Student Designer",
      company: "Design School",
      avatar: "A",
      quote: "As a student, I can't afford expensive mentors. The Crit gives me professional-level feedback for free.",
      rating: 5
    }
  ]
  
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50/10" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-primary-200 mb-6 shadow-sm"
          >
            <span className="text-primary-600 font-ui font-medium text-sm">💬 Testimonials</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            What Designers Are{" "}
            <span className="text-secondary-500">
              Saying
            </span>
          </h2>
          <p className="font-ui text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Real feedback from real designers who improved their craft
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className="group"
            >
              <motion.div 
                className={`bg-white rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full ${
                  index === 0 ? 'border-primary-200 hover:border-primary-400' :
                  index === 1 ? 'border-secondary-200 hover:border-secondary-400' :
                  'border-primary-300 hover:border-primary-500'
                }`}
                whileHover={{ 
                  y: -4,
                  scale: 1.02
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Quote */}
                <div className="mb-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-ui text-neutral-700 leading-relaxed italic text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                {/* Author */}
                <div className="flex items-center">
                  {/* Diversified brand color avatar containers */}
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-ui font-semibold mr-4 shadow-lg ${
                      index === 0 ? 'bg-primary-500 group-hover:bg-primary-400' :
                      index === 1 ? 'bg-secondary-500 group-hover:bg-secondary-400' :
                      'bg-primary-600 group-hover:bg-primary-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <div className="font-ui font-semibold text-neutral-900 text-base">
                      {testimonial.name}
                    </div>
                    <div className="font-ui text-sm text-neutral-600">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced CTA Section Component
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  
  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-3xl p-12 md:p-16 text-white overflow-hidden shadow-2xl"
        >
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform Your{" "}
                <span className="text-white/90">Designs?</span>
              </h2>
              <p className="font-ui text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of designers who are improving their craft with AI-powered feedback
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary-600 hover:bg-neutral-50 font-ui font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Get Free Feedback Now
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-ui font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                See How It Works
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Professional Header Component
function Header({ 
  setShowSampleCritique 
}: { 
  setShowSampleCritique: (show: boolean) => void 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // h-20 = 80px
      const offsetPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const scrollToUpload = () => {
    const element = document.getElementById('upload-section')
    if (element) {
      const headerHeight = 80
      const offsetPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features-section')}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => setShowSampleCritique(true)}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Examples
            </button>
            <button
              onClick={() => {/* Future pricing section */}}
              className="text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200"
            >
              Pricing
            </button>
            <motion.button
              onClick={scrollToUpload}
              className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Get Free Feedback
            </motion.button>
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
                  onClick={() => scrollToSection('features-section')}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  How It Works
                </button>
                <button
                  onClick={() => {
                    setShowSampleCritique(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  Examples
                </button>
                <button
                  onClick={() => {/* Future pricing section */}}
                  className="text-left text-neutral-600 hover:text-neutral-900 font-ui font-medium transition-colors duration-200 py-2"
                >
                  Pricing
                </button>
                <motion.button
                  onClick={scrollToUpload}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Free Feedback
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Newsletter Signup Section Component
function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrorMessage('Email address is required')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('loading')
    setErrorMessage('')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="py-16 bg-primary-50 border-t border-primary-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              Level Up Your{" "}
              <span className="text-primary-500">Design Skills</span>
            </h2>
            <p className="font-ui text-lg md:text-xl text-neutral-600 leading-relaxed">
              Join 2,800+ designers getting weekly design tips, critiques, and industry insights
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300 disabled:opacity-50 bg-white"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading' || !email}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 text-white font-ui font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px]"
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Get Design Tips'
                )}
              </motion.button>
            </div>

            <div className="min-h-[20px]">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-success-600 font-ui text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Successfully subscribed! Check your email for confirmation.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-600 font-ui text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-500 font-ui text-sm"
            >
              No spam. Unsubscribe anytime.
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

// Comprehensive Footer Component
function Footer({ 
  setShowSampleCritique 
}: { 
  setShowSampleCritique: (show: boolean) => void 
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // h-20 = 80px
      const offsetPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterStatus('loading')
    
    // Simulate API call for newsletter signup
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setNewsletterStatus('success')
      setNewsletterEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    } catch (error) {
      setNewsletterStatus('error')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }
  }

  const quickLinks = [
    { label: 'How It Works', onClick: () => scrollToSection('features-section') },
    { label: 'Sample Critique', onClick: () => setShowSampleCritique(true) },
    { label: 'Privacy Policy', onClick: () => {/* Future implementation */} },
    { label: 'Terms of Service', onClick: () => {/* Future implementation */} },
    { label: 'Contact', onClick: () => {/* Future implementation */} }
  ]

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Left Column - Brand */}
          <div className="space-y-6">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold font-display">
                <span className="text-neutral-900">The</span>{" "}
                <span className="text-primary-500">Crit</span>
              </h2>
            </motion.div>
            
            <p className="text-neutral-600 font-ui leading-relaxed max-w-sm">
              AI-powered design feedback that actually helps you improve. Get professional insights in seconds, not days.
            </p>
            
            {/* Future: Social media links can be added here */}
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold font-ui text-neutral-900">
              Quick Links
            </h3>
            
            <nav className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={link.onClick}
                  className="block text-neutral-600 hover:text-primary-500 font-ui transition-colors duration-200 text-left"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Right Column - Newsletter Signup */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold font-ui text-neutral-900 mb-2">
                Design Tips Newsletter
              </h3>
              <p className="text-neutral-600 font-ui text-sm leading-relaxed">
                Get weekly design insights and tips delivered to your inbox
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={newsletterStatus === 'loading'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={newsletterStatus === 'loading' || !newsletterEmail}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 text-white font-ui font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: newsletterStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: newsletterStatus === 'loading' ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {newsletterStatus === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
              
              {/* Status Messages */}
              <AnimatePresence>
                {newsletterStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-success-600 font-ui text-sm"
                  >
                    ✓ Successfully subscribed! Check your email.
                  </motion.p>
                )}
                {newsletterStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-600 font-ui text-sm"
                  >
                    ✗ Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-neutral-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 font-ui text-sm">
              © 2024 The Crit. All rights reserved.
            </p>
            
            {/* Future: Additional footer links can be added here */}
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <button 
                onClick={() => {/* Future privacy policy */}}
                className="hover:text-neutral-700 transition-colors duration-200"
              >
                Privacy
              </button>
              <button 
                onClick={() => {/* Future terms */}}
                className="hover:text-neutral-700 transition-colors duration-200"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({
    designerName: '',
    email: '',
    projectTitle: '',
    projectDescription: '',
    designLinks: '',
    files: []
  })
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [showSampleCritique, setShowSampleCritique] = useState(false)
  const [loadingAnimation, setLoadingAnimation] = useState<any>(null)
  const [successAnimation, setSuccessAnimation] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  // File validation constants
  const MAX_FILES = 5
  const MAX_SIZE_MB = 10
  const ALLOWED_TYPES = [
    'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf', 'application/octet-stream'
  ]

  // Load Lottie animations on component mount
  useEffect(() => {
    const loadAnimations = async () => {
      const [loadingData, successData] = await Promise.all([
        loadAnimationData(ANIMATION_CONFIG.LOADING),
        loadAnimationData(ANIMATION_CONFIG.SUCCESS)
      ])
      setLoadingAnimation(loadingData)
      setSuccessAnimation(successData)
    }
    
    loadAnimations()
  }, [])

  const resetForm = () => {
    setFormData({
      designerName: '',
      email: '',
      projectTitle: '',
      projectDescription: '',
      designLinks: '',
      files: []
    })
    setSubmitStatus('idle')
    setSubmitMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    addFiles(files)
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }

  function addFiles(newFiles: File[]) {
    setFileError(null)
    let currentFiles = [...formData.files]
    for (const file of newFiles) {
      if (currentFiles.length >= MAX_FILES) {
        setFileError(`You can upload up to ${MAX_FILES} files.`)
        break
      }
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.endsWith('.fig')) {
        setFileError('Unsupported file type.')
        continue
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setFileError(`Each file must be under ${MAX_SIZE_MB}MB.`)
        continue
      }
      if (currentFiles.some(f => f.name === file.name && f.size === file.size)) {
        setFileError('Duplicate file detected.')
        continue
      }
      currentFiles.push(file)
    }
    setFormData(prev => ({ ...prev, files: currentFiles }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    setIsDragActive(false)
    handleFileDrop(e)
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.designerName || !formData.email || !formData.projectTitle || !formData.projectDescription) {
      setSubmitStatus('error')
      setSubmitMessage('Please fill in all required fields')
      return
    }

    if (formData.files.length === 0 && !formData.designLinks) {
      setSubmitStatus('error')
      setSubmitMessage('Please provide either design files or links')
      return
    }

    setShowModal(true)
    setIsModalLoading(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      
      // Append text fields
      formDataToSend.append('designerName', formData.designerName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('projectTitle', formData.projectTitle)
      formDataToSend.append('projectDescription', formData.projectDescription)
      formDataToSend.append('designLinks', formData.designLinks)
      
      // Append files
      formData.files.forEach((file) => {
        formDataToSend.append('files', file)
      })

      const response = await fetch('/api/submit-crit', {
        method: 'POST',
        body: formDataToSend,
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message)
        // Switch to success state
        setIsModalLoading(false)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Failed to submit. Please try again.')
    } finally {
      // Keep modal open if there was an error, but stop loading
      if (submitStatus === 'error') {
        setIsModalLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <Header setShowSampleCritique={setShowSampleCritique} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-2 text-primary-600 font-ui text-sm"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span>AI-Powered Design Feedback</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight"
              >
                Design Feedback That{' '}
                <span className="relative inline-block">
                  Actually
                  <motion.img 
                    src="/underline.svg" 
                    alt="" 
                    className="absolute -bottom-2 left-0 w-full h-auto"
                    style={{ zIndex: -1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  />
                </span>
                <span className="text-primary-500 block">Improves Your Work</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-ui text-xl text-neutral-600 leading-relaxed"
              >
                Get instant, intelligent critiques that help you understand what works, what doesn't, 
                and how to make it better.
              </motion.p>
            </div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-4 text-sm text-neutral-500"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[
                    { src: '/april_lin.svg', name: 'April Lin' },
                    { src: '/adriano_alfaro.svg', name: 'Adriano Alfaro' },
                    { src: '/eric_sherman.svg', name: 'Eric Sherman' },
                    { src: '/han_noguchi.svg', name: 'Han Noguchi' },
                    { src: '/kris_rollins.svg', name: 'Kris Rollins' },
                    { src: null, name: '5+' }
                  ].map((person, i) => (
                    <div key={i} className="relative">
                      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        {person.src ? (
                          <img 
                            src={person.src} 
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : i === 5 ? (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                            <span className="text-xs font-ui font-medium text-white">5+</span>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full"></div>
                        )}
                      </div>
                      {i === 5 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </div>
                <span>Join 2,500+ designers improving their craft</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-500 hover:bg-primary-600 text-white font-ui font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Free Feedback
              </button>
              <button 
                onClick={() => setShowSampleCritique(true)}
                className="border border-neutral-300 hover:border-primary-500 text-neutral-700 hover:text-primary-600 font-ui font-medium px-8 py-4 rounded-lg transition-colors duration-200"
              >
                See Sample Critique
              </button>
            </motion.div>
          </div>

          {/* Right Column - Upload Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="upload-section"
            className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  Submit Your Design
                </h2>
                <p className="font-ui text-neutral-600">
                  Share your design files and details for AI-powered feedback
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-ui text-red-800">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700">Designer Name *</span>
                    <input
                      type="text"
                      name="designerName"
                      value={formData.designerName}
                      onChange={handleInputChange}
                      placeholder="Sarah Chen"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
                    />
                  </label>

                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700 flex items-center gap-1">
                      Email *
                      <Tooltip content="We'll only use your email to send your critique. It won't be shared.">
                        <svg className="w-4 h-4 text-orange-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Email info">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                        </svg>
                      </Tooltip>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sarah@example.com"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
                    />
                  </label>

                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700">Project Title *</span>
                    <span className="text-xs text-neutral-400 float-right mt-1">100/100</span>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      placeholder="Coffee shop mobile app"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
                    />
                  </label>

                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700 flex items-center gap-1">
                      Project Description *
                      <Tooltip content="Describe your project and what kind of feedback you want.">
                        <svg className="w-4 h-4 text-orange-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Description info">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                        </svg>
                      </Tooltip>
                    </span>
                    <span className="text-xs text-neutral-400 float-right mt-1">300/300</span>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Looking for feedback on the checkout flow and visual hierarchy..."
                      required
                      rows={3}
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
                    />
                  </label>

                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700">Design Links (Optional)</span>
                    <input
                      type="text"
                      name="designLinks"
                      value={formData.designLinks}
                      onChange={handleInputChange}
                      placeholder="https://figma.com/your-design-link"
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-neutral-400 transition-all duration-300"
                    />
                  </label>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-neutral-500 font-ui">and/or</span>
                    </div>
                  </div>

                  <motion.div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`w-full px-4 py-6 border-2 border-dashed rounded-lg font-ui text-neutral-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400
                      ${isDragActive ? 'border-primary-400 shadow-[0_0_0_4px_rgba(255,115,0,0.15)] bg-primary-50/30 text-primary-600' : 'border-neutral-300'}`}
                    tabIndex={0}
                    role="button"
                    aria-label="File upload dropzone. Drag and drop files here, or click to browse."
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={!isDragActive ? {
                      borderColor: '#ff7300',
                      color: '#ff7300',
                      scale: 1.02,
                      transition: { duration: 0.3, ease: 'easeOut' }
                    } : {}}
                    animate={isDragActive ? {
                      borderColor: ['#ff7300', '#ff9545', '#ff7300'],
                      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    } : {
                      borderColor: '#d4d4d4',
                      scale: 1
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <motion.svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Upload files"
                        animate={isDragActive ? { y: [0, -6, 0] } : { y: 0 }}
                        transition={{ duration: 0.5, repeat: isDragActive ? Infinity : 0, repeatType: 'loop' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </motion.svg>
                      <span className="font-ui font-medium">Drop your design here, or click to browse</span>
                      <span className="text-sm">Images, PDFs, Figma exports (max 5 files, 10MB each)</span>
                    </div>
                  </motion.div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.fig"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* File List */}
                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-ui font-medium text-neutral-700">Selected Files:</h4>
                      <AnimatePresence initial={false}>
                        {formData.files.map((file, index) => (
                          <motion.div
                            key={file.name + file.size}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center justify-between p-2 bg-neutral-50 rounded shadow-sm"
                          >
                            <div className="flex items-center min-w-0 flex-1">
                              <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.25 }}
                              >
                                <FilePreview file={file} />
                              </motion.div>
                              <span className="font-ui text-sm text-neutral-600 truncate" title={file.name}>{file.name}</span>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove file ${file.name}`}
                              tabIndex={0}
                              onClick={() => removeFile(index)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') removeFile(index)
                              }}
                              className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                  {fileError && (
                    <div className="text-red-500 text-sm mt-1">{fileError}</div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-ui font-semibold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isModalLoading ? 'Submitting...' : 'Submit for Analysis'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <TrustSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Polished Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Signup Section */}
      <NewsletterSection />

      {/* Enhanced CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer setShowSampleCritique={setShowSampleCritique} />

      {/* Unified Modal */}
      <SuccessModal
        isVisible={showModal}
        isLoading={isModalLoading}
        onClose={() => setShowModal(false)}
        onResetForm={resetForm}
        loadingAnimation={loadingAnimation}
        successAnimation={successAnimation}
        title={SUCCESS_MODAL_CONFIG.title}
        message={SUCCESS_MODAL_CONFIG.message}
        loadingTitle="Processing..."
        loadingMessage={SUCCESS_MODAL_CONFIG.loadingMessage}
      />

      {/* Sample Critique Modal */}
      <SampleCritiqueModal
        isOpen={showSampleCritique}
        onClose={() => setShowSampleCritique(false)}
      />
    </div>
  )
} 