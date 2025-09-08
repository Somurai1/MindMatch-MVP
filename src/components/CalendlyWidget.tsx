'use client'

import { useEffect, useRef } from 'react'

interface CalendlyWidgetProps {
  url: string
  prefill?: {
    name?: string
    email?: string
    customAnswers?: Record<string, string>
  }
  utm?: {
    utmCampaign?: string
    utmSource?: string
    utmMedium?: string
    utmContent?: string
    utmTerm?: string
  }
  style?: {
    minWidth?: string
    height?: string
  }
}

export default function CalendlyWidget({ 
  url, 
  prefill, 
  utm, 
  style = { minWidth: '320px', height: '700px' } 
}: CalendlyWidgetProps) {
  const calendlyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      const calendly = (window as any).Calendly
      
      if (calendlyRef.current) {
        calendly.initInlineWidget({
          url,
          parentElement: calendlyRef.current,
          prefill,
          utm,
        })
      }
    }
  }, [url, prefill, utm])

  return (
    <div 
      ref={calendlyRef}
      style={style}
      className="calendly-inline-widget"
    />
  )
}

// Popup widget component
export function CalendlyPopup({ 
  url, 
  prefill, 
  utm,
  text = "Schedule time with me"
}: CalendlyWidgetProps & { text?: string }) {
  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      const calendly = (window as any).Calendly
      calendly.initPopupWidget({
        url,
        prefill,
        utm,
      })
    }
  }

  return (
    <button
      onClick={openCalendly}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    >
      {text}
    </button>
  )
}
