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
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">ドキュメント: 挿入ソート</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          <p>
            挿入ソートは、<strong className="text-white">配列の未整列な部分から要素を一つずつ取り出し、それを整列済みの部分の適切な位置に挿入していく</strong>ことで、データを整列（ソート）するアルゴリズムです。
          </p>
          <p>
            トランプを手札に加える際に、正しい位置にカードを挿入していく動作に似ています。データがほとんど整列されている場合には非常に高速に動作するという特徴があります。
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <p>
            配列`data`を昇順にソートする例を考えます。
          </p>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <h3 className="text-lg sm:text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 insertionSort(data)<br />
                {'  '}変数 n = dataの要素数<br />
                {'  '}// i は未整列部分の先頭を指す<br />
                {'  '}i を 1 から n - 1 まで 1 ずつ増やしながら繰り返す<br />
                {'    '}変数 key = data[i]  // 挿入する要素を一時的に保持<br />
                {'    '}変数 j = i - 1      // 整列済み部分の末尾を指す<br />
                <br />
                {'    '}// key を挿入する適切な位置を探しながら、要素を後ろにずらす<br />
                {'    '}j {'>='} 0 かつ data[j] が key より大きい 間、繰り返す<br />
                {'      '}data[j + 1] = data[j]<br />
                {'      '}j = j - 1<br />
                {'    '}終わり<br />
                <br />
                {'    '}// 適切な位置に key を挿入<br />
                {'    '}data[j + 1] = key<br />
                {'  '}終わり<br />
                {'  '}返す data<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">
              このコードは二重ループ構造になっています。外側のループは、未整列部分の先頭要素を順番に選択します。内側のループは、選択された要素（`key`）を、それより前にある整列済みの部分と比較し、`key`より大きい要素を一つずつ後ろにずらしていきます。適切な場所が見つかったら、そこに`key`を挿入します。
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            挿入ソートの考え方をフローチャートで表すと、以下のようになります。
          </p>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>ソートを開始する。配列の最初の要素は整列済みとみなす。</li>
              <li>外側のループを開始する。2番目の要素（`i=1`）から最後の要素までを順番に見ていく。</li>
              <li>現在の要素 `data[i]` を `key` として取り出す。</li>
              <li>内側のループを開始する。整列済み部分の末尾から先頭に向かって `key` と比較していく。
                <ul className="list-disc pl-6 sm:pl-8 mt-2 space-y-2">
                  <li>もし比較している要素 `data[j]` が `key` より大きければ、その要素を一つ後ろにずらす (`data[j+1] = data[j]`)。</li>
                  <li>比較対象を一つ前にずらし、`key` より小さい要素が見つかるか、先頭に達するまで繰り返す。</li>
                </ul>
              </li>
              <li>内側のループが終了した位置の直後が `key` の正しい挿入場所なので、`key` をそこに挿入する。</li>
              <li>外側のループが終了するまで、ステップ2から5を繰り返す。</li>
              <li>ソートが完了した配列を返す。</li>
            </ol>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            挿入ソートの計算量は、データの並び方によって異なります。
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">最悪計算時間: O(n²)</strong><br />
            データが降順（ソートしたい順序と逆）に並んでいる場合。内側のループが毎回最大回数実行されるため、計算量はnの2乗に比例します。</li>
            <li><strong className="text-white">平均計算時間: O(n²)</strong><br />
            データがランダムに並んでいる場合も、平均的にはO(n²)となります。</li>
            <li><strong className="text-white">最良計算時間: O(n)</strong><br />
            データが昇順（ソートしたい順序通り）に並んでいる場合。内側のループは一度も実行されず、外側のループだけで済むため、計算量はnに比例します。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function InsertionSortProblemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/5'

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">問題集: 挿入ソート</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムの理解度をチェックしよう</p>
        </div>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：最初の挿入</h3>
            <p className="text-gray-300 mb-4">以下の配列 `data` に対して、昇順の挿入ソートを適用します。最初のパス（`i=1`）が終了した後の配列の状態として正しいものを選択してください。</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>配列 data = [5, 2, 4, 6, 1, 3]</code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `[2, 5, 4, 6, 1, 3]`</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 最初のパスでは、未整列部分の先頭である `2` (インデックス1) を取り出します。これを整列済み部分 `[5]` の適切な位置に挿入します。`5` は `2` より大きいため、`5` を後ろにずらし、空いた先頭の位置に `2` を挿入します。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：2回目の挿入</h3>
            <p className="text-gray-300 mb-4">問題1の続きです。配列が `[2, 5, 4, 6, 1, 3]` となった状態から、2回目のパス（`i=2`）が終了した後の配列の状態はどうなりますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `[2, 4, 5, 6, 1, 3]`</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 2回目のパスでは、`4` (インデックス2) を取り出します。これを整列済み部分 `[2, 5]` の適切な位置に挿入します。`5` は `4` より大きいため後ろにずらしますが、`2` は `4` より小さいため、その直後に `4` を挿入します。</p>
              </div>
            </details>
          </div>

          {/* Problem 3 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：最良のケース</h3>
            <p className="text-gray-300 mb-4">挿入ソートが最も高速に動作するのはどのようなデータの場合ですか？また、その時の計算量はどうなりますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> データが既にソート（整列）済みの場合。計算量は O(n) となります。</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> データが既に整列済みの場合、内側のループ（要素をずらす処理）は一度も実行されません。外側のループで要素を1つずつ確認するだけなので、処理回数は要素数 `n` に比例します。これは挿入ソートの大きな利点の一つです。</p>
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
              <Link href="/application/base2/6" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                  次のレッスンへ：再帰 &rarr;
              </Link>
            </div>
          </div>
        </div>

        {isModalOpen && <DocumentationModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}