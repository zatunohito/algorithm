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
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">ドキュメント: 二分探索</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          <p>
            二分探索（にぶんたんさく）は、<strong className="text-white">あらかじめ整列（ソート）された</strong>配列から目的の値を探すための、非常に高速なアルゴリズムです。
          </p>
          <p>
            探索範囲の中央の値と目的の値を比較し、探索範囲を半分に絞り込んでいくことで、効率的に目的の要素を見つけ出します。
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">前提条件</h2>
          <p>
            二分探索を適用するための最も重要な前提条件は、<strong className="text-white">データが昇順（小さい順）または降順（大きい順）に整列されていること</strong>です。整列されていないデータに対しては正しく動作しません。
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <h3 className="text-lg sm:text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 binarySearch(data, target)<br />
                {'  '}変数 left = 0<br />
                {'  '}変数 right = dataの要素数 - 1<br />
                <br />
                {'  '}left {'<='} right の間、繰り返す<br />
                {'    '}変数 mid = floor((left + right) / 2) // 中央のインデックス<br />
                <br />
                {'    '}もし data[mid] が target と等しい ならば<br />
                {'      '}返す mid  // 見つかった<br />
                {'    '}そうでなく、もし data[mid] {'<'} target ならば<br />
                {'      '}left = mid + 1  // 探索範囲を右半分に絞る<br />
                {'    '}そうでなければ<br />
                {'      '}right = mid - 1 // 探索範囲を左半分に絞る<br />
                {'    '}終わり<br />
                {'  '}終わり<br />
                <br />
                {'  '}返す -1  // 見つからなかった
              </code>
            </pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            二分探索の考え方をフローチャートで表すと、以下のようになります。
          </p>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>探索を開始する。探索範囲の左端`left`を0、右端`right`を「配列の要素数 - 1」に設定する。</li>
              <li>`left`が`right`以下である限り、以下の処理を繰り返す。
                <ul className="list-disc pl-6 sm:pl-8 mt-2 space-y-2">
                  <li>中央のインデックス`mid`を計算する。</li>
                  <li>配列の`mid`番目の要素と探している値`target`を比較する。
                    <ul className="list-disc pl-6 sm:pl-8 mt-2">
                      <li><strong className="text-white">一致した場合:</strong> `mid`を返して探索を終了する。</li>
                      <li><strong className="text-white">`target`の方が大きい場合:</strong> `left`を`mid + 1`に更新し、探索範囲を右半分に絞る。</li>
                      <li><strong className="text-white">`target`の方が小さい場合:</strong> `right`を`mid - 1`に更新し、探索範囲を左半分に絞る。</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>ループが終了した場合（`left`が`right`より大きくなった場合）、探している値は配列になかったと判断し、-1を返して終了する。</li>
            </ol>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            二分探索は、1回の比較で探索範囲が半分になるため、計算量は<strong className="text-white">O(log n)</strong>（オーダーログエヌ）となります。これは線形探索のO(n)に比べて非常に高速です。例えば、要素数が100万個あっても、たかだか20回程度の比較で結果がわかります。
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function BinarySearchProblemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const lessonPath = '/application/base2/2'

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">問題集: 二分探索</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムの理解度をチェックしよう</p>
        </div>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：前提条件</h3>
            <p className="text-gray-300 mb-4">二分探索アルゴリズムを正しく適用するために、データ配列が満たしているべき最も重要な条件は何ですか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 配列がソート（整列）されていること。</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 二分探索は、探索範囲の中央値と目的値を比較し、大小関係に基づいて探索範囲を半分に絞り込むことで機能します。この大小比較が意味を持つためには、データが昇順または降順に並んでいる必要があります。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：探索の第一歩</h3>
            <p className="text-gray-300 mb-4">以下のソート済み配列 `data` から、値 `60` を二分探索で探します。最初のステップで比較対象となる要素のインデックス `mid` は何になりますか？（インデックスは0から始まります。`mid = floor((left + right) / 2)` で計算するものとします）</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>配列 data = [10, 20, 30, 40, 50, 60, 70]</code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 3</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 最初の探索範囲は `left = 0`, `right = 6` です。中央のインデックスは `mid = floor((0 + 6) / 2) = floor(3) = 3` となります。したがって、最初に比較されるのは `data[3]` (値は40) です。</p>
              </div>
            </details>
          </div>

          {/* Problem 3 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：探索範囲の更新</h3>
            <p className="text-gray-300 mb-4">問題2の続きです。`data[3]` (値は40) と目的の値 `60` を比較した後、次の探索範囲はどうなりますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `left` が `4` になり、`right` は `6` のまま。</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 目的の値 `60` は比較対象の `40` より大きいため、探索範囲は右半分に絞られます。アルゴリズムに従い、`left` が `mid + 1` (つまり `3 + 1 = 4`) に更新されます。`right` は変わりません。</p>
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
              <Link href="/application/base2/3" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                  次のレッスンへ：バブルソート &rarr;
              </Link>
            </div>
          </div>
        </div>

        {isModalOpen && <DocumentationModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}