
import Link from 'next/link';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer'

export default function BinarySearchDocPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎IIに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">ドキュメント: 二分探索</h1>
          <p className="mt-4 text-lg text-gray-400">効率的な探索アルゴリズム</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            二分探索（にぶんたんさく）は、<strong className="text-white">あらかじめ整列（ソート）された</strong>配列から目的の値を探すための、非常に高速なアルゴリズムです。
          </p>
          <p>
            探索範囲の中央の値と目的の値を比較し、探索範囲を半分に絞り込んでいくことで、効率的に目的の要素を見つけ出します。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">前提条件</h2>
          <p>
            二分探索を適用するための最も重要な前提条件は、<strong className="text-white">データが昇順（小さい順）または降順（大きい順）に整列されていること</strong>です。整列されていないデータに対しては正しく動作しません。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <p>
            配列`data`（昇順にソート済み）から値`target`を探す例を考えます。探索範囲の左端を`left`、右端を`right`とします。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 binarySearch(data, target)<br />
                {'  '}変数 left = 0<br />
                {'  '}変数 right = dataの要素数 - 1<br />
                <br />
                {'  '}left {'<='} right の間、繰り返す<br />
                {'    '}変数 mid = floor((left + right) / 2) // 中央のインデックスを計算<br />
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

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            二分探索の考え方をフローチャートで表すと、以下のようになります。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>探索を開始する。探索範囲の左端`left`を0、右端`right`を「配列の要素数 - 1」に設定する。</li>
              <li>`left`が`right`以下である限り、以下の処理を繰り返す。
                <ul className="list-disc pl-8 mt-2 space-y-2">
                  <li>中央のインデックス`mid`を計算する。</li>
                  <li>配列の`mid`番目の要素と探している値`target`を比較する。
                    <ul className="list-disc pl-8 mt-2">
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

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            二分探索は、1回の比較で探索範囲が半分になるため、計算量は<strong className="text-white">O(log n)</strong>（オーダーログエヌ）となります。これは線形探索のO(n)に比べて非常に高速です。例えば、要素数が100万個あっても、たかだか20回程度の比較で結果がわかります。
          </p>
        </div>

        {/* Algorithm Visualization */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">二分探索の動作確認</h2>
          <AlgorithmVisualizer 
            algorithm="binary-search" 
            data={[10, 20, 30, 40, 50, 60, 70]} 
            target={60} 
          />
        </div>

        {/* Navigation to problem set */}
        <div className="mt-12 text-center">
            <Link href="/application/base2/2/problems" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}

