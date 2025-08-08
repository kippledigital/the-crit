import { Metadata } from 'next'
import { Breadcrumbs, PortfolioCritiqueChecklist } from '@/components'

export const metadata: Metadata = {
  title: 'Portfolio Critique Checklist - Complete Design Portfolio Evaluation | The Crit',
  description: 'Comprehensive checklist to evaluate and improve your design portfolio. Based on feedback from 10,000+ designers and hiring managers. Downloadable and interactive.',
  keywords: [
    'portfolio critique checklist',
    'design portfolio evaluation',
    'UX portfolio tips',
    'portfolio feedback',
    'design portfolio checklist',
    'portfolio improvement guide',
    'UX designer portfolio',
    'portfolio review checklist'
  ],
  openGraph: {
    title: 'Portfolio Critique Checklist - Complete Design Portfolio Evaluation',
    description: 'Comprehensive checklist to evaluate and improve your design portfolio. Based on feedback from 10,000+ designers and hiring managers.',
    type: 'website',
    url: 'https://thecrit.com/resources/portfolio-critique-checklist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Critique Checklist - Complete Design Portfolio Evaluation',
    description: 'Comprehensive checklist to evaluate and improve your design portfolio.',
  },
  alternates: {
    canonical: 'https://thecrit.com/resources/portfolio-critique-checklist',
  },
}

export default function PortfolioCritiqueChecklistPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'Portfolio Critique Checklist', href: '/resources/portfolio-critique-checklist' }
            ]} 
          />
          
          <PortfolioCritiqueChecklist />
        </div>
      </main>
    </>
  )
} 