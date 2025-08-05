/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Documentation Modal Component
function DocumentationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700 shadow-2xl shadow-blue-500/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">ドキュメント: 選択ソート</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          <p>
            選択ソートは、<strong className="text-white">配列の未整列な部分から最小値（または最大値）を探し出し、それを未整列部分の先頭要素と交換する</strong>という操作を繰り返すことで、データを整列（ソート）するアルゴリズムです。
          </p>
          <p>
            アルゴリズムの動作が人間にとって直感的で分かりやすいのが特徴です。
          </p>
          
          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <h3 className="text-lg sm:text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 selectionSort(data)<br />
                {'  '}変数 n = dataの要素数<br />
                {'  '}// i は整列済みの末尾、または未整列部分の先頭を指す<br />
                {'  '}i を 0 から n - 2 まで 1 ずつ増やしながら繰り返す<br />
                {'    '}変数 minIndex = i  // 最小値のインデックスを保持<br />
                {'    '}// 未整列部分から最小値を探すループ<br />
                {'    '}j を i + 1 から n - 1 まで 1 ずつ増やしながら繰り返す<br />
                {'      '}もし data[j] が data[minIndex] より小さい ならば<br />
                {'        '}minIndex = j<br />
                {'      '}終わり<br />
                {'    '}終わり<br />
                {'    '}// 見つかった最小値を未整列部分の先頭と交換<br />
                {'    '}data[i] と data[minIndex] を交換する<br />
                {'  '}終わり<br />
                {'  '}返す data<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">
              このコードは二重ループになっています。外側のループは、ソート済みの境界を一つずつ進めます。内側のループは、未整列の範囲から最小の要素を探し出し、そのインデックスを`minIndex`に保存します。内側のループが終わった後、見つかった最小値と未整列部分の先頭の要素を交換します。
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            選択ソートの考え方をフローチャートで表すと、以下のようになります。
          </p>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>ソートを開始する。</li>
              <li>外側のループを開始する。このループは未整列部分の先頭を指す（`i`が0から`n-2`まで）。</li>
              <li>未整列部分の先頭を、暫定の最小値のインデックス（`minIndex`）とする。</li>
              <li>内側のループを開始し、`i+1`から配列の末尾まで走査して、真の最小値を探す。
                <ul className="list-disc pl-6 sm:pl-8 mt-2 space-y-2">
                  <li>現在の要素`data[j]`が暫定の最小値`data[minIndex]`より小さければ、`minIndex`を`j`に更新する。</li>
                </ul>
              </li>
              <li>内側のループが終了したら、`minIndex`に最小値のインデックスが格納されている。</li>
              <li>未整列部分の先頭要素`data[i]`と、見つかった最小値`data[minIndex]`を交換する。</li>
              <li>外側のループが終了するまで、ステップ2から6を繰り返す。</li>
              <li>ソートが完了した配列を返す。</li>
            </ol>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            選択ソートの計算量は、バブルソートと同様に <strong className="text-white">O(n²)</strong>（オーダーエヌ二乗）となります。
          </p>
          <p>
            二重ループ構造のため、比較回数は常に一定で、要素数nに対して約n²/2回です。一方、交換回数は外側のループの回数と同じでn-1回となります。バブルソートに比べて要素の交換回数が少ないのが特徴ですが、比較回数が多いため、全体的な計算量は同じオーダーになります。
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function SelectionSortProblemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/4'

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">問題集: 選択ソート</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムの理解度をチェックしよう</p>
        </div>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：1回目のパス</h3>
            <p className="text-gray-300 mb-4">以下の配列 `data` に対して、昇順の選択ソートを適用した場合、1回目のパス（未整列部分の先頭との交換）が終了した後の配列の状態として正しいものを選択してください。</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>配列 data = [5, 8, 2, 6, 1]</code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `[1, 8, 2, 6, 5]`</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 1回目のパスでは、未整列部分（配列全体）から最小値を探します。最小値は `1`（インデックス4）です。これと未整列部分の先頭要素 `5`（インデックス0）を交換します。その結果、配列は `[1, 8, 2, 6, 5]` となります。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：2回目のパス</h3>
            <p className="text-gray-300 mb-4">問題1の続きです。1回目のパスが終了した配列 `[1, 8, 2, 6, 5]` に対して、2回目のパスが終了した後の配列の状態はどうなりますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `[1, 2, 8, 6, 5]`</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 2回目のパスでは、未整列部分（インデックス1以降 `[8, 2, 6, 5]`）から最小値を探します。最小値は `2`（元のインデックス2）です。これと未整列部分の先頭要素 `8`（インデックス1）を交換します。その結果、配列は `[1, 2, 8, 6, 5]` となります。</p>
              </div>
            </details>
          </div>

          {/* Problem 3 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：交換回数</h3>
            <p className="text-gray-300 mb-4">選択ソートの大きな特徴の一つは、要素の交換回数です。要素数 `n` の配列をソートする場合、交換が行われる回数は最大で何回ですか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> n-1 回</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 選択ソートは、1回のパス（外側のループ1周）で最小値（または最大値）を見つけた後、交換を1回だけ行います。このパスは `n-1` 回繰り返されるため、交換回数も最大で `n-1` 回となります。これは、比較回数が多い一方で交換回数が少ないという、選択ソートの重要な特性です。</p>
              </div>
            </details>
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
              <Link href="/application/base2/5" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                  次のレッスンへ：挿入ソート &rarr;
              </Link>
            </div>
          </div>
        </div>

        {isModalOpen && <DocumentationModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}