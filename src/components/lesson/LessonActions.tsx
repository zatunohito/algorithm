'use client'

import Link from 'next/link'

interface LessonActionsProps {
  user: { id: string } | null
  isCompleted: boolean
  onComplete: () => void
  nextHref?: string
  nextText?: string
}

export default function LessonActions({ 
  user, 
  isCompleted, 
  onComplete, 
  nextHref, 
  nextText 
}: LessonActionsProps) {
  return (
    <div className="mt-12 text-center space-y-4">
      {user && (
        <button
          onClick={onComplete}
          className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
            isCompleted 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}
        >
          {isCompleted ? '✓ 完了済み（クリックで解除）' : 'レッスンを完了する'}
        </button>
      )}
      {nextHref && nextText && (
        <div>
          <Link 
            href={nextHref} 
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
          >
            {nextText} &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}