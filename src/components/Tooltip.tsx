import React, { useState, useRef } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setVisible(true)
  }
  const hide = () => {
    timeout.current = setTimeout(() => setVisible(false), 100)
  }

  return (
    <span className="relative inline-block" tabIndex={0}
      onMouseEnter={show} onFocus={show}
      onMouseLeave={hide} onBlur={hide}
      aria-describedby="tooltip"
    >
      {children}
      {visible && (
        <span
          id="tooltip"
          role="tooltip"
          className={`z-50 absolute whitespace-nowrap px-2 py-1 rounded bg-neutral-900 text-white text-xs shadow-lg ${
            side === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
            side === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
            side === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' :
            'left-full top-1/2 -translate-y-1/2 ml-2'
          }`}
        >
          {content}
        </span>
      )}
    </span>
  )
} 