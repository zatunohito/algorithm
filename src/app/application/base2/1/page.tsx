/* eslint-disable */
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LinearSearchDocPage() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/1'

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">ドキュメント: 線形探索</h1>
          <p className="mt-4 text-lg text-gray-400">最も基本的な探索アルゴリズム</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            線形探索（せんけいたんさく）は、配列やリストの<strong className="text-white">先頭から順番に</strong>要素を一つずつ調べていき、目的の値を探す最もシンプルで直感的な探索アルゴリズムです。
          </p>
          <p>
            データが整列（ソート）されている必要がなく、どんな順番でデータが並んでいても使えるのが特徴です。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <p>
            線形探索は、以下の手順で動作します。ここでは、配列`data`から値`target`を探す例を考えます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 linearSearch(data, target)<br />
                {'  '}i を 0 から dataの要素数 - 1 まで 1 ずつ増やしながら繰り返す<br />
                {'    '}もし data[i] が target と等しい ならば<br />
                {'      '}返す i  // 見つかった要素のインデックスを返す<br />
                {'    '}終わり<br />
                {'  '}終わり<br />
                {'  '}返す -1  // 見つからなかったことを示す
              </code>
            </pre>
            <p className="mt-4">
              このコードでは、配列`data`を最初から最後までループで確認し、目的の`target`が見つかった瞬間にそのインデックス（配列の何番目か）を返します。最後までループしても見つからなかった場合は、-1（見つからなかったことを示す特別な値）を返します。
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            線形探索の考え方をフローチャートで表すと、以下のようになります。ループ構造と条件分岐が使われていることがわかります。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>探索を開始する。</li>
              <li>配列の最初の要素（インデックス0）からチェックする。</li>
              <li>現在の要素は、探している値と一致するか？
                <ul className="list-disc pl-8 mt-2">
                  <li><strong className="text-white">はいの場合:</strong> その要素のインデックスを「見つかった位置」として記録し、探索を終了する。</li>
                  <li><strong className="text-white">いいえの場合:</strong> 次の要素に進む。</li>
                </ul>
              </li>
              <li>配列の最後までチェックしたか？
                <ul className="list-disc pl-8 mt-2">
                  <li><strong className="text-white">はいの場合:</strong> 探している値は配列になかったと判断し、探索を終了する。</li>
                  <li><strong className="text-white">いいえの場合:</strong> ステップ3に戻る。</li>
                </ul>
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            線形探索の計算量は、最悪の場合（探す値が配列の末尾にあるか、存在しない場合）、配列の要素数 n に比例します。これを<strong className="text-white">O(n)</strong>（オーダーエヌ）と表記します。
          </p>
        </div>

        {/* Algorithm Visualization */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">線形探索の動作確認</h2>
          <AlgorithmVisualizer 
            algorithm="linear-search" 
            data={[15, 7, 22, 13, 40]} 
            target={13} 
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
            <Link href="/application/base2/1/problems" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}