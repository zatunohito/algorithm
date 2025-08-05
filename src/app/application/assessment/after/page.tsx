'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const questions = [
  '「情報Ⅰ」の学習を通じて、プログラミングやコードを書くことへの興味は高まりましたか？',
  'アルゴリズムやプログラミングの学習を通して、新たに学んだ点や興味を持った点はどの程度ありますか？',
  'アルゴリズムをアニメーションとして表示する機能は、あなたの理解を深めるのに役立ちましたか？',
  '模擬試験の難易度はいかがでしたか？',
  '模擬試験への挑戦は、プログラミング学習へのモチベーション向上につながりましたか？',
  'このアプリケーションを活用することで、効率的に学習を進めることができましたか？',
  '「情報Ⅰ」を契機として、今後もプログラミングやアルゴリズムの学習を継続したいと思いますか？',
  'このアプリケーションの操作性はいかがでしたか？',
  '「情報Ⅰ」の学習を通じて、プログラミングやアルゴリズムのスキル向上を実感されましたか？',
  'なんでもかいてください！'
]

const scaleLabels = [
  '1: 全く高まらなかった ↔ 5: 大いに高まった',
  '1: 全くない ↔ 5: 非常に多くある',
  '1: 全く役立たなかった ↔ 5: 非常に役立った',
  '1: 非常に簡単 ↔ 5: 非常に難しい',
  '1: 全くつながらなかった ↔ 5: 大いにつながった',
  '1: 全くできなかった ↔ 5: 非常にできた',
  '1: 全く思わない ↔ 5: 強く思う',
  '1: 非常に不満 ↔ 5: 非常に満足',
  '1: 全く実感できない ↔ 5: 大いに実感できた',
  '自由記述（任意）'
]

export default function AfterAssessmentPage() {
  const [scores, setScores] = useState({ 
    form1: 0, form2: 0, form3: 0, form4: 0, form5: 0, 
    form6: 0, form7: 0, form8: 0, form9: 0 
  })
  const [form10Comment, setForm10Comment] = useState('')
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
        assessment_time: 'after',
        form1_score: scores.form1,
        form2_score: scores.form2,
        form3_score: scores.form3,
        form4_score: scores.form4,
        form5_score: scores.form5,
        form6_score: scores.form6,
        form7_score: scores.form7,
        form8_score: scores.form8,
        form9_score: scores.form9,
        form10_comment: form10Comment || null
      })

      alert('アンケートの回答ありがとうございました！')
      // Refresh the page to update blocking status
      window.location.href = '/application'
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">事後アンケート</h1>
          <p className="mt-4 text-lg text-gray-400">学習後の理解度をお聞かせください</p>
        </div>

        <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-8 space-y-8">
          {questions.map((question, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {index + 1}. {question}
              </h3>
              {index === 9 ? (
                // Question 10 - Free text comment
                <textarea
                  value={form10Comment}
                  onChange={(e) => setForm10Comment(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"
                  rows={3}
                  maxLength={100}
                  placeholder="自由にご意見をお書きください（100文字以内、任意）"
                />
              ) : (
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
              )}
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
              {loading ? '送信中...' : 'アンケートを送信'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}