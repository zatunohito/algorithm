'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import PostAssessmentModal from '@/components/PostAssessmentModal'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function MyPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [completedCount, setCompletedCount] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progressData, setProgressData] = useState({ base1: 0, base2: 0, apply1: 0 })
  const [showPostAssessment, setShowPostAssessment] = useState(false)
  const [hasShownModal, setHasShownModal] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await getCompletedCount(user.id)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const getCompletedCount = async (userId: string) => {
    const { data } = await supabase
      .from('user_progress')
      .select('lesson_path')
      .eq('user_id', userId)
    
    setCompletedCount(data?.length || 0)
    
    // Calculate progress by category
    const base1Count = data?.filter(item => item.lesson_path.includes('/base1/')).length || 0
    const base2Count = data?.filter(item => item.lesson_path.includes('/base2/')).length || 0
    const apply1Count = data?.filter(item => item.lesson_path.includes('/apply1/')).length || 0
    
    const newProgressData = {
      base1: Math.round((base1Count / 6) * 100),
      base2: Math.round((base2Count / 6) * 100),
      apply1: Math.round((apply1Count / 6) * 100)
    }
    
    setProgressData(newProgressData)
    
    // Check if user qualifies for post-assessment
    if (newProgressData.base2 >= 50 && newProgressData.apply1 >= 50) {
      // Check if user has already completed after assessment
      const { data: afterAssessment } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', userId)
        .eq('assessment_time', 'after')
        .single()
      
      if (!afterAssessment && !hasShownModal) {
        setShowPostAssessment(true)
        setHasShownModal(true)
      }
    }
  }

  const getEncouragementMessage = (count: number) => {
    if (count === 0) return '学習を始めましょう！最初の一歩が大切です。'
    if (count <= 3) return 'いいスタートです！この調子で頑張りましょう。'
    if (count <= 6) return '順調に進んでいますね！継続は力なりです。'
    if (count <= 10) return 'すばらしい進歩です！アルゴリズムマスターに近づいています。'
    return 'お見事！あなたは真のアルゴリズムマスターです！'
  }

  const handleCopyUserId = async () => {
    if (user?.id) {
      try {
        await navigator.clipboard.writeText(user.id)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (error) {
        console.error('コピーに失敗しました:', error)
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <div className="text-center text-white py-8">読み込み中...</div>
  if (!user) return <div className="text-center text-white py-8">ログインが必要です</div>

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; ホームに戻る</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">マイページ</h1>
          <p className="mt-4 text-lg text-gray-400">あなたの学習状況</p>
        </div>

        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">学習進捗</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>全体の進捗</span>
                <span>{Math.round((completedCount / 18) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((completedCount / 18) * 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-400">{completedCount} / 18 レッスン完了</p>
          </div>

          {/* Category Progress */}
          <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">カテゴリ別達成率</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>基礎I</span>
                  <span>{progressData.base1}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressData.base1}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>基礎II</span>
                  <span>{progressData.base2}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressData.base2}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>応用I</span>
                  <span>{progressData.apply1}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressData.apply1}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">ユーザーID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs bg-gray-800 p-3 rounded break-all flex-1">{user.id}</p>
                <button
                  onClick={handleCopyUserId}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  {isCopied ? '📜 Copied!' : '📝 Copy!'}
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">メールアドレス</p>
              <p className="text-white">{user.email}</p>
            </div>
            
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
              <p className="text-blue-300 font-medium">{getEncouragementMessage(completedCount)}</p>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/application" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
            学習を続ける &rarr;
          </Link>
        </div>
      </div>
      
      <PostAssessmentModal 
        isOpen={showPostAssessment} 
        onClose={() => setShowPostAssessment(false)} 
      />
    </div>
  )
}