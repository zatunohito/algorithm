/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js'
import ReviewCompleteButton from '@/components/ReviewCompleteButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function DocumentationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700 shadow-2xl shadow-blue-500/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        
        {/* Documentation Content */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">ドキュメント: 線形探索</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          <p>
            線形探索（せんけいたんさく）は、配列やリストの<strong className="text-white">先頭から順番に</strong>要素を一つずつ調べていき、目的の値を探す最もシンプルで直感的な探索アルゴリズムです。
          </p>
          <p>
            データが整列（ソート）されている必要がなく、どんな順番でデータが並んでいても使えるのが特徴です。
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <p>
            線形探索は、以下の手順で動作します。ここでは、配列`data`から値`target`を探す例を考えます。
          </p>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <h3 className="text-lg sm:text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
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
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>探索を開始する。</li>
              <li>配列の最初の要素（インデックス0）からチェックする。</li>
              <li>現在の要素は、探している値と一致するか？
                <ul className="list-disc pl-6 sm:pl-8 mt-2">
                  <li><strong className="text-white">はいの場合:</strong> その要素のインデックスを「見つかった位置」として記録し、探索を終了する。</li>
                  <li><strong className="text-white">いいえの場合:</strong> 次の要素に進む。</li>
                </ul>
              </li>
              <li>配列の最後までチェックしたか？
                <ul className="list-disc pl-6 sm:pl-8 mt-2">
                  <li><strong className="text-white">はいの場合:</strong> 探している値は配列になかったと判断し、探索を終了する。</li>
                  <li><strong className="text-white">いいえの場合:</strong> ステップ3に戻る。</li>
                </ul>
              </li>
            </ol>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            線形探索の計算量は、最悪の場合（探す値が配列の末尾にあるか、存在しない場合）、配列の要素数 n に比例します。これを<strong className="text-white">O(n)</strong>（オーダーエヌ）と表記します。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LinearSearchProblemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/1'

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const { data } = await supabase
          .from('user_progress')
          .select('lesson_path')
          .eq('user_id', user.id)
          .eq('lesson_path', lessonPath)
          .single()
        
        setIsCompleted(!!data)
      }
    }
    getUser()
  }, [])

  const handleComplete = async () => {
    if (!user) return
    
    if (isCompleted) {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('lesson_path', lessonPath)
      setIsCompleted(false)
    } else {
      await supabase
        .from('user_progress')
        .upsert({ user_id: user.id, lesson_path: lessonPath })
      setIsCompleted(true)
    }
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <span>&larr; 基礎IIに戻る</span>
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors shadow-md">
            ドキュメントを見る
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">問題集: 線形探索</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムの理解度をチェックしよう</p>
        </div>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：探索結果</h3>
            <p className="text-gray-300 mb-4">以下の配列 `scores` から、値 `13` を線形探索で探します。アルゴリズムが見つけたインデックスは何になりますか？（インデックスは0から始まります）</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>配列 scores = [15, 7, 22, 13, 40]</code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 3</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 配列を先頭から順番に見ていくと、`15` (インデックス0), `7` (インデックス1), `22` (インデックス2), `13` (インデックス3) となり、4番目（インデックス3）で値が見つかります。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：プログラムの穴埋め</h3>
            <p className="text-gray-300 mb-4">以下のプログラムは、配列 `data` から値 `target` を線形探索し、見つかった場合はそのインデックスを、見つからなかった場合は `-1` を返すものです。空欄 `[ ア ]` に入る最も適切な記述を選択してください。</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 findIndex(data, target)<br />
                {'  '}i を 0 から dataの要素数 - 1 まで 1 ずつ増やしながら繰り返す<br />
                {'    '}もし [      ア      ] ならば<br />
                {'      '}返す i<br />
                {'    '}終わり<br />
                {'  '}終わり<br />
                {'  '}返す -1<br />
                終わり
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `data[i] が target と等しい`</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 線形探索では、ループで配列の各要素 `data[i]` を取り出し、探している値 `target` と一致するかどうかを比較します。したがって、条件式にはこの比較が入ります。</p>
              </div>
            </details>
          </div>
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
            <Link href="/application/base2/2" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：二分探索 &rarr;
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && <DocumentationModal onClose={() => setIsModalOpen(false)} />}
      <ReviewCompleteButton lessonPath={lessonPath} />
    </div>
  );
}