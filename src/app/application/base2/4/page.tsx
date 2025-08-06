/* eslint-disable */
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer'
import LessonContent4 from '@/components/lesson/LessonContent4';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SelectionSortDocPage() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/4'

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const completed = localStorage.getItem(`completed_${user.id}`)
        if (completed) {
          const completedLessons = JSON.parse(completed)
          setIsCompleted(completedLessons.includes(lessonPath))
        }
      }
    }
    getUser()
  }, [])

  const handleComplete = () => {
    if (!user) return
    
    const completed = localStorage.getItem(`completed_${user.id}`) || '[]'
    const completedLessons = JSON.parse(completed)
    
    if (isCompleted) {
      const updatedLessons = completedLessons.filter((lesson: string) => lesson !== lessonPath)
      localStorage.setItem(`completed_${user.id}`, JSON.stringify(updatedLessons))
      setIsCompleted(false)
    } else {
      completedLessons.push(lessonPath)
      localStorage.setItem(`completed_${user.id}`, JSON.stringify(completedLessons))
      setIsCompleted(true)
    }
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎IIに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">ドキュメント: 選択ソート</h1>
          <p className="mt-4 text-lg text-gray-400">最小値を見つけて整列</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <LessonContent4 />
        </div>

        {/* Algorithm Visualization */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">選択ソートの動作確認</h2>
          <AlgorithmVisualizer 
            algorithm="selection-sort" 
            data={[5, 8, 2, 6, 1]} 
          />
        </div>

        <div className="mt-12 text-center space-y-4">
          {user && (
            <button
              onClick={handleComplete}
              className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
                isCompleted 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
            >
              {isCompleted ? '✓ 完了済み（クリックで解除）' : 'レッスンを完了する'}
            </button>
          )}
          <div>
            <Link href="/application/base2/4/problems" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}