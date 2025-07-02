'use client'

import { useState, useRef } from 'react'
import type { FormData as FormDataType, ApiResponse } from '@/types/form'

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({
    designerName: '',
    email: '',
    projectTitle: '',
    projectDescription: '',
    designLinks: '',
    files: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }))
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
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

    setIsSubmitting(true)
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
        // Reset form on success
        setFormData({
          designerName: '',
          email: '',
          projectTitle: '',
          projectDescription: '',
          designLinks: '',
          files: []
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Get Instant
                <span className="text-primary-500 block">Design Feedback</span>
              </h1>
              
              <p className="font-ui text-xl text-neutral-600 leading-relaxed">
                Upload your designs and receive intelligent, actionable feedback powered by AI. 
                Transform your creative process with instant critiques.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-ui font-semibold text-neutral-900">Instant Analysis</h3>
                  <p className="font-ui text-neutral-600">Get detailed feedback in seconds, not hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-ui font-semibold text-neutral-900">Actionable Insights</h3>
                  <p className="font-ui text-neutral-600">Specific recommendations to improve your designs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-ui font-semibold text-neutral-900">Learn & Grow</h3>
                  <p className="font-ui text-neutral-600">Understand design principles and best practices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
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
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-ui text-green-800">{submitMessage}</p>
                </div>
              )}

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
                    <span className="font-ui font-medium text-neutral-700">Email *</span>
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
                    <span className="font-ui font-medium text-neutral-700">Project Description *</span>
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
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    className="w-full px-4 py-6 border-2 border-dashed border-neutral-300 rounded-lg font-ui text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="font-ui font-medium">Drop files here or click to upload</span>
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
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                          <span className="font-ui text-sm text-neutral-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-ui font-medium px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Analysis'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 