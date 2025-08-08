'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'

interface ColorWheelProps {
  size?: number
  onColorChange?: (color: { hue: number; saturation: number; lightness: number; hex: string }) => void
  className?: string
}

export default function ColorWheel({ size = 200, onColorChange, className = '' }: ColorWheelProps) {
  const [selectedColor, setSelectedColor] = useState({ hue: 0, saturation: 100, lightness: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  const hslToHex = useCallback((h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }, [])

  const updateColor = useCallback((clientX: number, clientY: number) => {
    if (!wheelRef.current) return

    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = clientX - centerX
    const y = clientY - centerY
    const distance = Math.sqrt(x * x + y * y)
    const radius = size / 2 - 10
    
    if (distance <= radius) {
      const angle = Math.atan2(y, x) * 180 / Math.PI
      const hue = (angle + 360) % 360
      const saturation = Math.min((distance / radius) * 100, 100)
      
      const newColor = { hue, saturation, lightness: 50 }
      const hex = hslToHex(hue, saturation, 50)
      
      setSelectedColor(newColor)
      onColorChange?.({ ...newColor, hex })
    }
  }, [size, hslToHex, onColorChange])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updateColor(e.clientX, e.clientY)
  }, [updateColor])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateColor(e.clientX, e.clientY)
    }
  }, [isDragging, updateColor])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const indicatorX = Math.cos(selectedColor.hue * Math.PI / 180) * (selectedColor.saturation / 100) * (size / 2 - 10)
  const indicatorY = Math.sin(selectedColor.hue * Math.PI / 180) * (selectedColor.saturation / 100) * (size / 2 - 10)

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={wheelRef}
        className="relative cursor-crosshair select-none"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(
            hsl(0, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(360, 100%, 50%)
          ), radial-gradient(circle at center, transparent 0%, white 100%)`,
          borderRadius: '50%',
          backgroundBlendMode: 'multiply'
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute w-4 h-4 bg-white border-2 border-neutral-800 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `calc(50% + ${indicatorX}px)`,
            top: `calc(50% + ${indicatorY}px)`,
          }}
        />
        
        <div
          ref={centerRef}
          className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: hslToHex(selectedColor.hue, selectedColor.saturation, selectedColor.lightness)
          }}
        />
      </div>
      
      <div className="mt-4 text-sm font-ui text-neutral-700">
        <div className="flex items-center justify-between">
          <span>HSL: {Math.round(selectedColor.hue)}, {Math.round(selectedColor.saturation)}%, {selectedColor.lightness}%</span>
          <span className="font-mono">{hslToHex(selectedColor.hue, selectedColor.saturation, selectedColor.lightness)}</span>
        </div>
      </div>
    </div>
  )
}