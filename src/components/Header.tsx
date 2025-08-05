'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Header() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        getCompletedCount(user.id)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        getCompletedCount(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const getCompletedCount = async (userId: string) => {
    const { data } = await supabase
      .from('user_progress')
      .select('lesson_path')
      .eq('user_id', userId)
    
    setCompletedCount(data?.length || 0)
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
      await navigator.clipboard.writeText(user.id)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/1753592922455.png"
            alt="Algorithm Visualizer Logo"
            width={180}
            height={40}
            priority
            className="invert"
          />
        </Link>
        <nav className="font-mono flex items-center space-x-4">
          <Link href="/application" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300">
            アプリ
          </Link>
          {user ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {user.email?.split('@')[0]}
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
      
      {/* User Info Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full mx-4 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">ユーザー情報</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="text-sm text-gray-400">ユーザーID</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs bg-gray-800 p-2 rounded break-all flex-1">{user?.id}</p>
                  <button
                    onClick={handleCopyUserId}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                  >
                    {isCopied ? '📜 Copied!' : '📝 Copy!'}
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">完了レッスン数</p>
                <p className="text-2xl font-bold text-green-400">{completedCount} レッスン</p>
              </div>
              
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                <p className="text-blue-300 font-medium">{getEncouragementMessage(completedCount)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}