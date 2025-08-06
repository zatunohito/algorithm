
'use client'

// NOTE: This component is currently specific to the "Linear Search" lesson.
// To make it reusable for other lessons, you could pass content via props
// or create separate content components for each lesson.

export default function LessonContent() {
  return (
    <>
      <p>
        線形探索（せんけいたんさく）は、配列やリストの<strong className="text-white">先頭から順番に</strong>要素を一つずつ調べていき、目的の値を探す最もシンプルで直感的な探索アルゴリズムです。
      </p>
      <p>
        データが整列（ソート）されている必要がなく、どんな順番でデータが並んでいても使えるのが特徴です。
      </p>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
      <p>
        線形探索は、以下の手順で動作します。ここでは、配列`data`から値`target`を探す例を考えます。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 linearSearch(data, target)<br />
            {'  '}i を 0 から dataの要素数 - 1 まで 1 ずつ増やしながら繰り返す<br />
            {'    '}もし data[i] が target と等しい ならば<br />
            {'      '}返す i  // 見つかった要素のインデックスを返す<br />
            {'    '}終わり<br />
            {'  '}終わり<br />
            {'  '}返す -1  // 見つからなかったことを示す
          </code>
        </pre>
        <p className="mt-4">
          このコードでは、配列`data`を最初から最後までループで確認し、目的の`target`が見つかった瞬間にそのインデックス（配列の何番目か）を返します。最後までループしても見つからなかった場合は、-1（見つからなかったことを示す特別な値）を返します。
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
      <p>
        線形探索の考え方をフローチャートで表すと、以下のようになります。ループ構造と条件分岐が使われていることがわかります。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <ol className="list-decimal list-inside space-y-2">
          <li>探索を開始する。</li>
          <li>配列の最初の要素（インデックス0）からチェックする。</li>
          <li>現在の要素は、探している値と一致するか？
            <ul className="list-disc pl-8 mt-2">
              <li><strong className="text-white">はいの場合:</strong> その要素のインデックスを「見つかった位置」として記録し、探索を終了する。</li>
              <li><strong className="text-white">いいえの場合:</strong> 次の要素に進む。</li>
            </ul>
          </li>
          <li>配列の最後までチェックしたか？
            <ul className="list-disc pl-8 mt-2">
              <li><strong className="text-white">はいの場合:</strong> 探している値は配列になかったと判断し、探索を終了する。</li>
              <li><strong className="text-white">いいえの場合:</strong> ステップ3に戻る。</li>
            </ul>
          </li>
        </ol>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
      <p>
        線形探索の計算量は、最悪の場合（探す値が配列の末尾にあるか、存在しない場合）、配列の要素数 n に比例します。これを<strong className="text-white">O(n)</strong>（オーダーエヌ）と表記します。
      </p>
    </>
  );
}