/* eslint-disable */
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function VariablesAndConstantsPage() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const lessonPath = '/application/base1/2'

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
        {/* Back button */}
        <Link href="/application/base1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎Iに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">変数と定数</h1>
          <p className="mt-4 text-lg text-gray-400">データを扱うための「箱」</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            プログラムでは、数値や文字列などのデータを一時的に保存しておく場所が必要です。その役割を果たすのが「変数」と「定数」です。これらは、データに名前をつけて管理するための「箱」のようなものだと考えてください。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">「変数」とは？</h2>
          <p>
            「変数」は、中身を後から変更できる箱です。例えば、ゲームのスコアのように、処理の途中で値が変わる可能性のあるデータを保存するのに使います。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：変数</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 score = 80  // scoreという名前の変数に80を保存<br />
                出力: score      // 80が出力される<br />
                <br />
                score = 95      // scoreの中身を95に変更<br />
                出力: score      // 95が出力される
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">「定数」とは？</h2>
          <p>
            「定数」は、一度中身を入れたら変更できない箱です。円周率（π）のように、プログラムの実行中に変わることのない値を保存するのに使います。
          </p>
          <p>
            値を変更しないことを明確にすることで、意図しない書き換えを防ぎ、コードが読みやすく安全になります。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：定数</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                定数 PI = 3.14  // PIという名前の定数に3.14を保存<br />
                出力: PI       // 3.14が出力される
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">問題</h2>
          <p>
            下のコードは正しく実行され、結果が出力されるでしょうか？それともエラーになるでしょうか？
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">このコードはエラーが出るか出ないか</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                定数 ありがとう = 39<br />
                ありがとう = 50<br />
                出力 : ありがとう
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> エラーになる</p>
                <p className="mt-2">
                  <strong className="text-white">理由:</strong> 「ありがとう」は「定数」として宣言されているため、一度39を代入した後に50を再代入しようとするとエラーが発生します。定数は後から値を変更することができません。
                </p>
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
            <Link href="/application/base1/3" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：条件分岐 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}