/* eslint-disable */
import Link from 'next/link';

export default function ArrayPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎Iに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">配列</h1>
          <p className="mt-4 text-lg text-gray-400">複数のデータをまとめて扱う</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            プログラムでは、たくさんのデータを扱うことがよくあります。例えば、クラス全員のテストの点数や、買い物リストの商品名などです。これらの関連するデータを一つにまとめて管理できるのが「配列」です。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">配列とは？</h2>
          <p>
            配列は、複数のデータを入れることができる、番号付きの箱が並んだ棚のようなものです。この「番号」のことを「インデックス（添字）」と呼びます。
            <strong className="text-white">多くのプログラミング言語では、インデックスは0から始まります。</strong>
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：配列の宣言とアクセス</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                // 3つの整数を保存する配列を宣言<br />
                配列 scores = [85, 92, 78]<br />
                <br />
                // 2番目の要素にアクセス (インデックスは1)<br />
                出力: scores[1]  // 92が出力される
              </code>
            </pre>
            <p className="mt-4">この例では、`scores`という配列のインデックス`1`（2番目）の箱に入っている`92`が出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">繰り返し処理との組み合わせ</h2>
          <p>
            配列は、前のレッスンで学んだ「繰り返し」と組み合わせることで真価を発揮します。ループを使って、配列のすべての要素に対して同じ処理を簡単に行うことができます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：配列の全要素を出力</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                配列 items = ["鉛筆", "消しゴム", "ノート"]<br />
                i を 0 から 2 まで 1 ずつ増やしながら繰り返す<br />
                {'  '}出力: items[i]<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">このループは、`i`が0, 1, 2と変化し、`items[0]`, `items[1]`, `items[2]`が順番に出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">問題</h2>
          
          {/* Problem 1 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                配列 numbers = [100, 200, 300, 400]<br />
                出力: numbers[3]
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 400</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> 配列のインデックスは0から始まるため、`numbers[3]`は4番目の要素である`400`を指します。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：最終的に`result`は何になる？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                配列 values = [2, 4, 6, 8]<br />
                変数 result = 0<br />
                i を 0 から 3 まで 1 ずつ増やしながら繰り返す<br />
                {'  '}もし values[i] {'>'} 5 ならば<br />
                {'    '}result = result + values[i]<br />
                {'  '}終わり<br />
                終わり<br />
                出力: result
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 14</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> ループは配列`values`の各要素をチェックします。条件`values[i] {'>'} 5`が真になるのは、`6`と`8`の時です。そのため、`result`は`0 + 6 + 8`で`14`になります。</p>
              </div>
            </details>
          </div>
        </div>

        {/* Navigation to next lesson */}
        <div className="mt-12 text-center">
            <Link href="/application/base1/6" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：関数 &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}