'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const questions = [
  'プログラミングやコードを書くことに対する興味はどの程度ありますか？',
  'アルゴリズムやプログラミングについて、どの程度知識がありますか？',
  '視覚的な学習ツールを使ったことがありますか？',
  'プログラミングの試験や課題に対する自信はどの程度ありますか？',
  'プログラミング学習へのモチベーションはどの程度ありますか？',
  '効率的な学習方法を実践していますか？',
  '将来的にプログラミングやITスキルを活用したいと思いますか？',
  '学習アプリケーションの使用経験はありますか？',
  'プログラミングやアルゴリズムのスキルに対する自己評価をしてください。'
]

const scaleLabels = [
  '1: 全く興味がない ↔ 5: 非常に興味がある',
  '1: 全く知識がない ↔ 5: 十分な知識がある',
  '1: 全く使用したことがない ↔ 5: 頻繁に使用している',
  '1: 全く自信がない ↔ 5: 非常に自信がある',
  '1: 全くない ↔ 5: 非常に高い',
  '1: 全く実践していない ↔ 5: 常に実践している',
  '1: 全く思わない ↔ 5: 強く思う',
  '1: 全く使用しない ↔ 5: 非常によく使用する',
  '1: 初心者レベル ↔ 5: 上級者レベル'
]

export default function AssessmentPage() {
  const [scores, setScores] = useState({ 
    form1: 0, form2: 0, form3: 0, form4: 0, form5: 0, 
    form6: 0, form7: 0, form8: 0, form9: 0 
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleScoreChange = (formIndex: number, score: number) => {
    setScores(prev => ({ ...prev, [`form${formIndex}`]: score }))
  }

  const handleSubmit = async () => {
    if (Object.values(scores).some(score => score === 0)) {
      alert('すべての質問にお答えください')
      return
    }

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('user_assessments').insert({
        user_id: user.id,
        assessment_time: 'before',
        form1_score: scores.form1,
        form2_score: scores.form2,
        form3_score: scores.form3,
        form4_score: scores.form4,
        form5_score: scores.form5,
        form6_score: scores.form6,
        form7_score: scores.form7,
        form8_score: scores.form8,
        form9_score: scores.form9
      })

      router.push('/application')
    } catch (error) {
      console.error('Error saving assessment:', error)
      alert('保存に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">事前アンケート</h1>
          <p className="mt-4 text-lg text-gray-400">学習開始前の理解度をお聞かせください</p>
        </div>

        <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-8 space-y-8">
          {questions.map((question, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {index + 1}. {question}
              </h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(index + 1, score)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      scores[`form${index + 1}` as keyof typeof scores] === score
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {scaleLabels[index]}
              </p>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-700">
            <button
              onClick={handleSubmit}
              disabled={loading || Object.values(scores).some(score => score === 0)}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? '送信中...' : '送信して学習を開始'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}