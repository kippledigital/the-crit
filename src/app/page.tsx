'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import type { FormData as FormDataType, ApiResponse } from '@/types/form'
import SuccessModal from '@/components/SuccessModal'
import { loadAnimationData } from '@/lib/lottie-animations'
import { ANIMATION_CONFIG, SUCCESS_MODAL_CONFIG } from '@/lib/animation-config'
import { AnimatePresence, motion } from 'framer-motion'
import Tooltip from '@/components/Tooltip'

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

  // Consistent SVG icons
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
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
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
                Transform Your Designs
                <span className="text-primary-500 block">From Good to Great</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-ui text-xl text-neutral-600 leading-relaxed"
              >
                Get instant, intelligent feedback on your designs. Upload your work and receive 
                actionable critiques that help you improve your craft and land better clients.
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
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="relative">
                      <div className="w-8 h-8 bg-neutral-300 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                        {i === 6 ? (
                          <span className="text-xs font-ui font-medium text-neutral-600">5+</span>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full"></div>
                        )}
                      </div>
                      {i === 6 && (
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
              <button className="border border-neutral-300 hover:border-primary-500 text-neutral-700 hover:text-primary-600 font-ui font-medium px-8 py-4 rounded-lg transition-colors duration-200">
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
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                      required
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                      required
                      rows={3}
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="font-ui font-medium text-neutral-700">Design Links (Optional)</span>
                    <input
                      type="text"
                      name="designLinks"
                      value={formData.designLinks}
                      onChange={handleInputChange}
                      placeholder="Figma, Behance, or other design links..."
                      className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-lg font-ui focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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

                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`w-full px-4 py-6 border-2 border-dashed rounded-lg font-ui text-neutral-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400
                      ${isDragActive ? 'border-primary-400 shadow-[0_0_0_4px_rgba(255,115,0,0.15)] bg-primary-50/30 text-primary-600' : 'border-neutral-300 hover:border-primary-400 hover:text-primary-600'}`}
                    tabIndex={0}
                    role="button"
                    aria-label="File upload dropzone. Drag and drop files here, or click to browse."
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <motion.svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Upload files"
                        animate={isDragActive ? { y: [0, -6, 0], color: '#ff7300' } : { y: 0, color: '#737373' }}
                        transition={{ duration: 0.5, repeat: isDragActive ? Infinity : 0, repeatType: 'loop' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </motion.svg>
                      <span className="font-ui font-medium">Drag & drop files here, or click to browse</span>
                      <span className="text-sm">Images, PDFs, Figma exports (max 5 files, 10MB each)</span>
                    </div>
                  </div>

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

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-ui font-medium px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isModalLoading ? 'Submitting...' : 'Submit for Analysis'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="font-display text-3xl font-bold text-neutral-900">
              Trusted by Designers Worldwide
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">2,500+</div>
                <div className="text-neutral-600">Designers Improved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">15,000+</div>
                <div className="text-neutral-600">Designs Critiqued</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">4.9/5</div>
                <div className="text-neutral-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
              Why Designers Choose The Crit
            </h2>
            <p className="font-ui text-xl text-neutral-600 max-w-2xl mx-auto">
              Get the feedback you need to improve your designs and advance your career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Instant Feedback</h3>
              <p className="font-ui text-neutral-600">Get detailed critiques in seconds, not hours or days. No more waiting for feedback.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Educational Insights</h3>
              <p className="font-ui text-neutral-600">Learn why changes work, not just what to change. Understand design principles.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Multi-Discipline Analysis</h3>
              <p className="font-ui text-neutral-600">Get feedback on visual design, UX, accessibility, and more from specialized AI agents.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Supportive Feedback</h3>
              <p className="font-ui text-neutral-600">Encouraging, constructive critiques that help you grow, not tear you down.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Free to Start</h3>
              <p className="font-ui text-neutral-600">Try our service completely free. No credit card required, no strings attached.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-ui font-semibold text-neutral-900 mb-2">Secure & Private</h3>
              <p className="font-ui text-neutral-600">Your designs are processed securely and never shared. Your privacy is protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
              What Designers Are Saying
            </h2>
            <p className="font-ui text-xl text-neutral-600">
              Real feedback from real designers who improved their craft
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-ui font-semibold text-primary-600">S</span>
                </div>
                <div>
                  <div className="font-ui font-semibold text-neutral-900">Sarah Chen</div>
                  <div className="font-ui text-sm text-neutral-600">UI/UX Designer</div>
                </div>
              </div>
              <p className="font-ui text-neutral-700 italic">
                "The Crit helped me identify issues in my portfolio that I never noticed. I landed my dream job within 2 months!"
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-ui font-semibold text-primary-600">M</span>
                </div>
                <div>
                  <div className="font-ui font-semibold text-neutral-900">Marcus Rodriguez</div>
                  <div className="font-ui text-sm text-neutral-600">Freelance Designer</div>
                </div>
              </div>
              <p className="font-ui text-neutral-700 italic">
                "Instant feedback on my client work has been a game-changer. My clients are happier and I'm charging more."
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-ui font-semibold text-primary-600">A</span>
                </div>
                <div>
                  <div className="font-ui font-semibold text-neutral-900">Alex Thompson</div>
                  <div className="font-ui text-sm text-neutral-600">Student Designer</div>
                </div>
              </div>
              <p className="font-ui text-neutral-700 italic">
                "As a student, I can't afford expensive mentors. The Crit gives me professional-level feedback for free."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-12 text-white">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to Transform Your Designs?
            </h2>
            <p className="font-ui text-xl mb-8 opacity-90">
              Join thousands of designers who are improving their craft with AI-powered feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary-600 hover:bg-neutral-100 font-ui font-medium px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Get Free Feedback Now
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-600 font-ui font-medium px-8 py-4 rounded-lg transition-colors duration-200">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  )
} 