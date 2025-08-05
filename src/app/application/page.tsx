'use client'

import Link from 'next/link';
import { useAllUserProgress } from '@/hooks/useUserProgress'
import { usePostAssessmentCheck } from '@/hooks/usePostAssessmentCheck'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import PostAssessmentModal from '@/components/PostAssessmentModal'
import MutatingDots from '@/components/MutatingDots'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const applications = [
  {
    href: '/application/base1',
    title: '基礎I',
    description: 'アルゴリズムを考える基礎を学びます',
  },
  {
    href: '/application/base2',
    title: '基礎II',
    description: 'アルゴリズムを一人で考えられるようにします',
  },
  {
    href: '/application/base3',
    title: 'まとめ問題',
    description: '基礎IとIIの内容を総復習します',
  },
  {
    href: '/application/apply1',
    title: '応用I',
    description: 'アルゴリズムを応用して問題を解決します',
  },
  {
    href: '/application/apply2',
    title: '応用II',
    description: 'アルゴリズムを応用して情報Iを対策します',
  },
];

export default function ApplicationPage() {
  const { isCompleted, loading, error } = useAllUserProgress()
  const { isBlocked, showModal, setShowModal, loading: assessmentLoading } = usePostAssessmentCheck()
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAssessment = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .eq('assessment_time', 'before')
        .single()
      
      setAssessmentCompleted(!!data)
      if (!data) {
        router.push('/application/assessment')
      }
    }
    
    if (!loading) {
      checkAssessment()
    }
  }, [loading, router])

  if (loading || assessmentLoading || assessmentCompleted === null) return (
    <div className="flex justify-center items-center py-16">
      <MutatingDots />
    </div>
  )
  if (error) return <div className="text-center text-red-400 py-8">エラー: {error}</div>
  if (!assessmentCompleted) return null

  return (
    <div className="py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">アルゴリズム学習</h1>
        <p className="mt-4 text-lg text-gray-400">アルゴリズムの動作を視覚的に理解し、学習を深めましょう。</p>
      </div>
      {assessmentCompleted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {applications.map((app) => (
            <div key={app.href} className={`group relative p-6 bg-gray-900/60 rounded-lg border border-gray-800 transition-all duration-300 shadow-lg ${
              isBlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800/80 hover:border-gray-700 transform hover:-translate-y-1 hover:shadow-blue-500/20'
            }`}>
              {isBlocked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-2">🔒</div>
                    <p className="text-sm">アンケート回答待ち</p>
                  </div>
                </div>
              ) : (
                <Link href={app.href} className="block">
                  {isCompleted(app.href) && (
                    <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"></div>
                  )}
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{app.title}</h2>
                  <p className="text-gray-400">{app.description}</p>
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 mb-4">アンケートに回答してレッスンを開始してください</p>
          <Link href="/application/assessment" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            アンケートに回答する
          </Link>
        </div>
      )}
      
      <PostAssessmentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        isBlocking={isBlocked}
      />
    </div>
  );
}