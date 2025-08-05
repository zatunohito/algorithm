/* eslint-disable */
import Link from 'next/link';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer'

export default function BubbleSortDocPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎IIに戻る</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">ドキュメント: バブルソート</h1>
          <p className="mt-4 text-lg text-gray-400">隣り合う要素を交換して整列</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            バブルソートは、<strong className="text-white">隣り合う要素の大小を比較しながら交換を繰り返す</strong>ことで、データを昇順または降順に整列（ソート）するアルゴリズムです。
          </p>
          <p>
            アルゴリズムがシンプルで理解しやすいため、ソートの学習の第一歩としてよく用いられます。名前の由来は、最も大きい（または小さい）要素が、泡（バブル）が水面に上がっていくように配列の端に移動していく様子から来ています。
          </p>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
          <p>
            配列`data`を昇順にソートする例を考えます。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
              <code>
                関数 bubbleSort(data)<br />
                {'  '}変数 n = dataの要素数<br />
                {'  '}// パス（走査）の繰り返し<br />
                {'  '}i を 0 から n - 2 まで 1 ずつ増やしながら繰り返す<br />
                {'    '}// 隣り合う要素の比較と交換<br />
                {'    '}j を 0 から n - i - 2 まで 1 ずつ増やしながら繰り返す<br />
                {'      '}もし data[j] が data[j+1] より大きい ならば<br />
                {'        '}data[j] と data[j+1] を交換する<br />
                {'      '}終わり<br />
                {'    '}終わり<br />
                {'  '}終わり<br />
                {'  '}返す data<br />
                終わり
              </code>
            </pre>
            <p className="mt-4">
              このコードは二重ループになっています。外側のループは、配列全体を何回走査するか（パス）を制御します。内側のループは、隣り合う要素を比較し、必要であれば交換します。1回のパスが終わるごとに、最も大きい要素が配列の右端に確定していきます。
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
          <p>
            バブルソートの考え方をフローチャートで表すと、以下のようになります。
          </p>
          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>ソートを開始する。</li>
              <li>外側のループ（パス）を開始する。このループは配列の要素数-1回繰り返される。</li>
              <li>内側のループを開始する。配列の先頭から、まだソートが確定していない部分の末尾までを走査する。
                <ul className="list-disc pl-8 mt-2 space-y-2">
                  <li>隣り合う2つの要素（`data[j]`と`data[j+1]`）を比較する。</li>
                  <li>もし`data[j]`の方が大きければ、2つの要素を交換する。</li>
                </ul>
              </li>
              <li>内側のループが終了したら、1つのパスが完了。最も大きい要素が未整列部分の右端に移動する。</li>
              <li>外側のループが終了するまで、ステップ3と4を繰り返す。</li>
              <li>ソートが完了した配列を返す。</li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
          <p>
            バブルソートの計算量は、配列の要素数を n とすると、最悪の場合も平均的な場合も <strong className="text-white">O(n²)</strong>（オーダーエヌ二乗）となります。
          </p>
          <p>
            これは、二重ループ構造になっているため、比較回数が n の2乗に比例して増加するためです。要素数が多くなると処理時間が急激に長くなるため、実用的な場面で使われることは少ないですが、アルゴリズムの基本を学ぶ上で非常に重要です。
          </p>
        </div>

        {/* Algorithm Visualization */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">バブルソートの動作確認</h2>
          <AlgorithmVisualizer 
            algorithm="bubble-sort" 
            data={[5, 3, 8, 1, 4]} 
          />
        </div>

        {/* Navigation to problem set */}
        <div className="mt-12 text-center">
            <Link href="/application/base2/3/problems" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}