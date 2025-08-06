'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface LessonLayoutProps {
  backHref: string
  backText: string
  title: string
  subtitle: string
  children: ReactNode
}

export default function LessonLayout({ 
  backHref, 
  backText, 
  title, 
  subtitle, 
  children 
}: LessonLayoutProps) {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href={backHref} 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
        >
          <span>&larr; {backText}</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-400">{subtitle}</p>
        </div>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}