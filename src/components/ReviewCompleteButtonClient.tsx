'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

interface ReviewCompleteButtonProps {
  lessonPath: string
}

export default function ReviewCompleteButtonClient({ lessonPath }: ReviewCompleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const reviewType = searchParams.get('review')

  if (!reviewType) return null

  const handleComplete = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const updateField = reviewType === '3_days' ? 'review_3_days' :
                         reviewType === '7_days' ? 'review_7_days' : 'review_30_days'

      await supabase
        .from('user_progress')
        .update({ [updateField]: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('lesson_path', lessonPath)

      alert('復習完了！')
      router.push('/mypage')
    } catch (error) {
      console.error('Error completing review:', error)
    } finally {
      setLoading(false)
    }
  }

  const reviewTypeText = reviewType === '3_days' ? '3日後復習' : 
                        reviewType === '7_days' ? '1週間後復習' : '1ヶ月後復習'

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-900/90 border border-yellow-700 rounded-lg p-4 shadow-lg">
        <p className="text-yellow-300 text-sm mb-2">{reviewTypeText}セッション</p>
        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
        >
          {loading ? '完了中...' : '復習完了'}
        </button>
      </div>
    </div>
  )
}