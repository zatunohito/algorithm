'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const exams = Array.from({ length: 6 }, (_, i) => ({
  href: `/application/apply1/${i + 1}`,
  title: `模擬試験 ${i + 1}`,
}));

export default function Apply1Page() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [user, setUser] = useState<{ id: string } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      

    }
    getUser()
  }, [])

  const isCompleted = (lessonPath: string) => {
    return completedLessons.includes(lessonPath)
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/application" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; アプリケーション一覧に戻る</span>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">応用I</h1>
          <p className="mt-4 text-lg text-gray-400">模擬試験を通じて、アルゴリズムの理解度を確認します。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Link key={exam.href} href={exam.href} className="group relative flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/60 p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:bg-gray-800/80 hover:shadow-blue-500/20">
              {isCompleted(exam.href) && (
                <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"></div>
              )}
              <h2 className="text-2xl font-semibold text-white transition-colors group-hover:text-blue-400">{exam.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}