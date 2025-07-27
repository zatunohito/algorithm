import Link from 'next/link';

export default function RepetitionPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎Iに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">繰り返し</h1>
          <p className="mt-4 text-lg text-gray-400">同じ処理を何度も実行する</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            プログラミングでは、同じ、あるいは似たような処理を何度も実行したい場面がよくあります。例えば、「リストの全項目を表示する」「合計点が100を超えるまで計算を続ける」などです。このような処理を効率的に行うのが「繰り返し（ループ）」です。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">決まった回数繰り返す</h2>
          <p>
            最も基本的な繰り返しは、「指定した回数だけ処理を実行する」というものです。何回繰り返すかが事前にわかっている場合に使われます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：5回繰り返す</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                i を 1 から 5 まで 1 ずつ増やしながら繰り返す<br />
                {'  '}出力: "こんにちは"<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">この例では、「こんにちは」という文字列が5回出力されます。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">条件が成り立つ間繰り返す</h2>
          <p>
            「特定の条件が満たされている間だけ、処理を繰り返す」という方法もあります。繰り返しの回数が事前に決まっていない場合に便利です。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">コードの例：条件で繰り返す</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 count = 0<br />
                count {'<'} 3 の間、繰り返す<br />
                {'  '}出力: "ループ中"<br />
                {'  '}count = count + 1<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">この例では、`count`が0, 1, 2の間は条件が成り立つため、「ループ中」が3回出力されます。`count`が3になると条件が成り立たなくなり、ループは終了します。ループ内で`count`の値を変更しないと、無限に処理が続いてしまう（無限ループ）ので注意が必要です。</p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">問題</h2>
          
          {/* Problem 1 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 sum = 0<br />
                i を 1 から 4 まで 1 ずつ増やしながら繰り返す<br />
                {'  '}sum = sum + i<br />
                終わり<br />
                出力: sum
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong> 10</p>
                <p className="mt-2"><strong className="text-white">理由:</strong> `sum`に`i`の値（1, 2, 3, 4）が順番に足されていきます。最終的に `0 + 1 + 2 + 3 + 4` の計算結果である10が出力されます。</p>
              </div>
            </details>
          </div>

          {/* Problem 2 */}
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：何が出力される？</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                変数 num = 10<br />
                num {'>'} 1 の間、繰り返す<br />
                {'  '}出力: num<br />
                {'  '}num = num - 3<br />
                終わり
              </code>
            </pre>
            <details className="mt-4 group">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
              <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
                <p><strong className="text-white">答え:</strong></p>
                <pre className="bg-gray-950 p-2 rounded-md">10<br />7<br />4</pre>
                <p className="mt-2"><strong className="text-white">理由:</strong> ループは`num`が1より大きい間続きます。最初に10が出力され、`num`は7になります。次に7が出力され、`num`は4になります。次に4が出力され、`num`は1になります。ここで条件 `num {'>'} 1` が偽になるため、ループは終了します。</p>
              </div>
            </details>
          </div>
        </div>

        {/* Navigation to next lesson */}
        <div className="mt-12 text-center">
            <Link href="/application/base1/5" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：配列 &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}