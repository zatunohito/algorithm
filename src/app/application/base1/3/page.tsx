/* eslint-disable */
import Link from 'next/link';

export default function ConditionalBranchingPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎Iに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">条件分岐</h1>
          <p className="mt-4 text-lg text-gray-400">「もし〜ならば」で処理を分ける</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            プログラムは、常に同じ順番で実行されるだけではありません。特定の「条件」が満たされているかどうかによって、実行する処理を変えることができます。これを「条件分岐」と呼びます。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">もし〜ならば (if文)</h2>
          <p>
            最も基本的な条件分岐は「もし（if）条件が正しいならば、この処理をする」という形です。フローチャートでは、ひし形の記号を使って条件を表します。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：if文</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 age = 20<br />
                もし age が 18 以上 ならば<br />
                {'  '}出力: "成人です"<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">この例では、変数`age`が18以上なので、「成人です」と出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">そうでなければ (else)</h2>
          <p>
            「もし条件が正しくなければ、代わりにこちらの処理をする」という場合、「そうでなければ（else）」を使います。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：if-else文</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 score = 75<br />
                もし score が 80 以上 ならば<br />
                {'  '}出力: "合格"<br />
                そうでなければ<br />
                {'  '}出力: "不合格"<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">この例では、`score`が80未満なので、「不合格」と出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">さらに他の条件も (else if)</h2>
          <p>
            複数の条件で分岐させたい場合は、「そうでなく、もし（else if）」を使って条件を追加できます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：if-else if-else文</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 time = 14<br />
                もし time が 12 より小さい ならば<br />
                {'  '}出力: "午前"<br />
                そうでなく、もし time が 18 より小さい ならば<br />
                {'  '}出力: "午後"<br />
                そうでなければ<br />
                {'  '}出力: "夜"<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">この例では、`time`は12以上かつ18未満なので、「午後」と出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">問題</h2>
          
          {/* Problem 1 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 x = 10<br />
                もし x {'>'} 5 ならば<br />
                {'  '}x = x + 5<br />
                終わり<br />
                出力: x
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 15</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 条件 `x {'>'} 5` (10は5より大きい) が真なので、if文の中の `x = x + 5` が実行され、xは15になります。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 temperature = 28<br />
                もし temperature {'>='} 30 ならば<br />
                {'  '}出力: "エアコンをつける"<br />
                そうでなければ<br />
                {'  '}出力: "窓を開ける"<br />
                終わり
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 窓を開ける</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 条件 `temperature {'>='} 30` (28は30以上) が偽なので、`そうでなければ` (else) のブロックが実行されます。</p>
              </div>
            </details>
          </div>
        </div>

        {/* Navigation to next lesson */}
        <div className="mt-12 text-center">
            <Link href="/application/base1/4" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：繰り返し &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}