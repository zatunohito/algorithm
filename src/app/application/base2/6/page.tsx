import Link from 'next/link';

export default function RecursionDocPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎IIに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">ドキュメント: 再帰</h1>
          <p className="mt-4 text-lg text-gray-400">自分自身を呼び出して問題を解く</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            再帰（さいき）は、<strong className="text-white">ある関数がその処理の内部で自分自身を呼び出す</strong>ことによって、問題を解決するプログラミングのテクニックです。
          </p>
          <p>
            大きな問題を、同じ構造を持つより小さな問題に分割していき、最も簡単な問題（ベースケース）までたどり着いたら、今度はその結果を使いながら元の問題まで戻ってくる、というアプローチを取ります。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">再帰の2つの重要な要素</h2>
          <p>
            再帰関数を正しく動作させるためには、以下の2つの要素が不可欠です。
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong className="text-white">ベースケース (Base Case):</strong> 再帰を停止させる条件です。これがないと、関数は無限に自分自身を呼び出し続け、プログラムがクラッシュしてしまいます（無限再帰）。</li>
            <li><strong className="text-white">再帰ステップ (Recursive Step):</strong> 問題をより小さな部分問題に分割し、自分自身を呼び出す部分です。呼び出すたびに、問題が少しずつベースケースに近づいていくように設計する必要があります。</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの例：階乗計算</h2>
          <p>
            再帰の典型的な例として、数値 `n` の階乗（`n!`）を計算する関数を考えます。階乗は `n * (n-1) * ... * 1` で計算されます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 factorial(n)<br />
                {'  '}// ベースケース: nが0なら1を返す<br />
                {'  '}もし n が 0 と等しい ならば<br />
                {'    '}返す 1<br />
                {'  '}終わり<br />
                <br />
                {'  '}// 再帰ステップ: n * factorial(n-1) を計算<br />
                {'  '}返す n * factorial(n - 1)<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">
              例えば `factorial(3)` を呼び出すと、内部で `3 * factorial(2)` が呼ばれ、さらに `2 * factorial(1)`、`1 * factorial(0)` と続きます。`factorial(0)` がベースケースに到達して `1` を返すと、`1 * 1`、`2 * 1`、`3 * 2` と結果が戻っていき、最終的に `6` が得られます。
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            再帰の考え方をフローチャートで表現するのは少し難しいですが、概念的には以下のようになります。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>関数が値 `n` で呼び出される。</li>
              <li>`n` はベースケース（例: `n=0`）を満たすか？
                <ul className="list-disc pl-8 mt-2 space-y-2">
                  <li><strong className="text-white">はいの場合:</strong> 特定の値（例: 1）を返し、この関数の呼び出しは終了する。</li>
                  <li><strong className="text-white">いいえの場合:</strong> 問題を小さくして（例: `n-1`）、自分自身を再度呼び出す。</li>
                </ul>
              </li>
              <li>自分自身を呼び出した結果が返ってくるのを待つ。</li>
              <li>返ってきた結果と現在の値 `n` を使って計算し、その結果を呼び出し元に返す。</li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">再帰の利点と注意点</h2>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong className="text-white">利点:</strong> コードが簡潔で直感的になる場合があります。特に、問題の構造自体が再帰的な場合（例: 木構造の探索）に強力です。</li>
            <li><strong className="text-white">注意点:</strong> 関数呼び出しにはメモリや時間がかかるため、単純な繰り返し処理で書けるものを再帰で書くと、パフォーマンスが低下することがあります。また、ベースケースの設計を誤ると無限再帰に陥る危険があります。</li>
          </ul>
        </div>

        {/* Navigation to problem set */}
        <div className="mt-12 text-center">
            <Link href="/application/base2/6/problems" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}