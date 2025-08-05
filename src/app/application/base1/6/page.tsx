'use client'

import Link from 'next/link';
import { useUserProgress } from '@/hooks/useUserProgress'

export default function FunctionPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/6')

  if (loading) return <div className="text-center text-white py-8">読み込み中...</div>
  if (error) return <div className="text-center text-red-400 py-8">エラー: {error}</div>

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎Iに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">関数</h1>
          <p className="mt-4 text-lg text-gray-400">処理をひとまとめにし、再利用する</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            プログラムが大きくなってくると、同じようなコードを何度も書く場面が増えてきます。そんな時に便利なのが「関数」です。関数を使うと、一連の処理をひとまとめにして名前をつけ、必要な時にその名前を呼び出すだけで実行できるようになります。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">関数とは？</h2>
          <p>
            関数は、特定のタスクを実行するための一連の命令のブロックです。一度定義すれば、プログラムのどこからでも何度でも呼び出すことができます。これにより、コードの重複をなくし、プログラムを整理して見通しを良くすることができます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：単純な関数</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                {/* 「あいさつする」という処理を関数として定義 */}<br />
                関数 sayHello()<br />
                {'  '}出力: &quot;こんにちは！&quot;<br />
                終わり<br />
                <br />
                {/* 関数を呼び出す */}<br />
                sayHello()  {/* &quot;こんにちは！&quot; と出力される */}<br />
                sayHello()  {/* もう一度呼び出しても同じ処理が実行される */}
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">引数と戻り値</h2>
          <p>
            関数をさらに便利にするのが「引数（ひきすう）」と「戻り値（もどりち）」です。
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong className="text-white">引数:</strong> 関数に外部からデータ（値）を渡すためのものです。これにより、関数は渡されたデータに応じて異なる動作をすることができます。</li>
            <li><strong className="text-white">戻り値:</strong> 関数が処理した結果を、呼び出し元に返すためのものです。</li>
          </ul>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：引数と戻り値を持つ関数</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                {/* 2つの数値(a, b)を引数として受け取り、合計を戻り値として返す関数 */}<br />
                関数 add(a, b)<br />
                {'  '}変数 result = a + b<br />
                {'  '}返す result  {/* 計算結果を呼び出し元に返す */}<br />
                終わり<br />
                <br />
                {/* 関数を呼び出し、戻り値を変数sumに保存 */}<br />
                変数 sum = add(5, 3)<br />
                出力: sum  {/* 8が出力される */}
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">問題</h2>
          
          {/* Problem 1 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 multiply(x, y)<br />
                {'  '}返す x * y<br />
                終わり<br />
                <br />
                変数 answer = multiply(6, 7)<br />
                出力: answer
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 42</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> `multiply`関数が`6`と`7`を引数として呼び出され、その積である`42`が返されます。その結果が変数`answer`に保存され、出力されます。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 checkAge(age)<br />
                {'  '}もし age {'>='} 20 ならば<br />
                {'    '}返す &quot;成人&quot;<br />
                {'  '}そうでなければ<br />
                {'    '}返す &quot;未成年&quot;<br />
                {'  '}終わり<br />
                終わり<br />
                <br />
                出力: checkAge(18)
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 未成年</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> `checkAge`関数に`18`が渡されます。if文の条件 `age {'>='} 20` (18は20以上) が偽なので、`そうでなければ` (else) のブロックが実行され、&quot;未成年&quot;という文字列が返されて出力されます。</p>
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
            <Link href="/application/base1" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                基礎Iを完了する &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}