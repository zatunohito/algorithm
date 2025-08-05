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
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">ドキュメント: 再帰</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          <p>
            再帰（さいき）は、<strong className="text-white">ある関数がその処理の内部で自分自身を呼び出す</strong>ことによって、問題を解決するプログラミングのテクニックです。
          </p>
          
          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">再帰の2つの重要な要素</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">ベースケース (Base Case):</strong> 再帰を停止させる条件です。</li>
            <li><strong className="text-white">再帰ステップ (Recursive Step):</strong> 問題をより小さな部分問題に分割し、自分自身を呼び出す部分です。</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの例：階乗計算</h2>
          <div className="my-4 p-4 sm:p-6 bg-gray-950/70 rounded-lg border border-gray-800">
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 factorial(n)<br />
                {'  '}// ベースケース<br />
                {'  '}もし n が 0 と等しい ならば<br />
                {'    '}返す 1<br />
                {'  '}終わり<br />
                {'  '}// 再帰ステップ<br />
                {'  '}返す n * factorial(n - 1)<br />
                終わり
              </code>
            </pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white pt-6 border-t border-gray-800">再帰の利点と注意点</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">利点:</strong> コードが簡潔で直感的になる場合がある。</li>
            <li><strong className="text-white">注意点:</strong> パフォーマンスが低下することがある。無限再帰に陥る危険がある。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function RecursionProblemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const lessonPath = '/application/base2/6'

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">問題集: 再帰</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムの理解度をチェックしよう</p>
        </div>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：ベースケースの特定</h3>
            <p className="text-gray-300 mb-4">以下の階乗を計算する再帰関数の擬似コードにおいて、「ベースケース」に相当するのはどの部分ですか？</p>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 factorial(n)<br />
                {'  '}もし n が 0 と等しい ならば<br />
                {'    '}返す 1<br />
                {'  '}終わり<br />
                {'  '}返す n * factorial(n - 1)<br />
                終わり
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> `もし n が 0 と等しい ならば` の条件分岐全体。</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> ベースケースは再帰呼び出しを停止させるための条件です。このコードでは、`n`が0になったときに再帰呼び出しを行わず、具体的な値 `1` を返すことで処理を終了させています。これがなければ、`n`は負の値になり、無限に自分自身を呼び出し続けてしまいます。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：再帰のトレース</h3>
            <p className="text-gray-300 mb-4">問題1の `factorial` 関数を `factorial(3)` として呼び出した場合、最終的に返される値は何になりますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 6</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 関数の呼び出しは以下のように展開されます。</p>
                <ul className="list-disc pl-6 mt-2 text-sm font-mono">
                  <li>factorial(3) は 3 * factorial(2) を返す</li>
                  <li>factorial(2) は 2 * factorial(1) を返す</li>
                  <li>factorial(1) は 1 * factorial(0) を返す</li>
                  <li>factorial(0) は 1 を返す (ベースケース)</li>
                </ul>
                <p className="mt-2">結果は逆順に計算され、`1 * 1 = 1`、`2 * 1 = 2`、`3 * 2 = 6` となり、最終的に `6` が返されます。</p>
              </div>
            </details>
          </div>

          {/* Problem 3 */}
          <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：無限再帰</h3>
            <p className="text-gray-300 mb-4">再帰関数において、ベースケースを定義し忘れるとどのような問題が発生しますか？</p>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 無限再帰（または無限ループ）</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> ベースケースは再帰を停止させるための「ブレーキ」の役割を果たします。もしベースケースがなければ、関数は停止することなく自分自身を呼び出し続けます。これにより、プログラムが使用できるメモリを使い果たしてしまい、最終的には「スタックオーバーフロー」というエラーを引き起こしてクラッシュします。</p>
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
              <Link href="/application" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                  基礎IIを完了し、コース選択に戻る &rarr;
              </Link>
            </div>
          </div>
        </div>

        {isModalOpen && <DocumentationModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}