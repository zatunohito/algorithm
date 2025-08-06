/* eslint-disable */
'use client'

export default function LessonContent5() {
  return (
    <>
      <p>
        挿入ソートは、<strong className="text-white">配列の未整列な部分から要素を一つずつ取り出し、それを整列済みの部分の適切な位置に挿入していく</strong>ことで、データを整列（ソート）するアルゴリズムです。
      </p>
      <p>
        トランプを手札に加える際に、正しい位置にカードを挿入していく動作に似ています。データがほとんど整列されている場合には非常に高速に動作するという特徴があります。
      </p>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
      <p>
        配列`data`を昇順にソートする例を考えます。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 insertionSort(data)<br />
            {'  '}変数 n = dataの要素数<br />
            {'  '}// i は未整列部分の先頭を指す<br />
            {'  '}i を 1 から n - 1 まで 1 ずつ増やしながら繰り返す<br />
            {'    '}変数 key = data[i]  // 挿入する要素を一時的に保持<br />
            {'    '}変数 j = i - 1      // 整列済み部分の末尾を指す<br />
            <br />
            {'    '}// key を挿入する適切な位置を探しながら、要素を後ろにずらす<br />
            {'    '}j {'>='} 0 かつ data[j] が key より大きい 間、繰り返す<br />
            {'      '}data[j + 1] = data[j]<br />
            {'      '}j = j - 1<br />
            {'    '}終わり<br />
            <br />
            {'    '}// 適切な位置に key を挿入<br />
            {'    '}data[j + 1] = key<br />
            {'  '}終わり<br />
            {'  '}返す data<br />
            終わり
          </code>
        </pre>
        <p className="mt-4">
          このコードは二重ループ構造になっています。外側のループは、未整列部分の先頭要素を順番に選択します。内側のループは、選択された要素（`key`）を、それより前にある整列済みの部分と比較し、`key`より大きい要素を一つずつ後ろにずらしていきます。適切な場所が見つかったら、そこに`key`を挿入します。
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
      <p>
        挿入ソートの考え方をフローチャートで表すと、以下のようになります。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <ol className="list-decimal list-inside space-y-2">
          <li>ソートを開始する。配列の最初の要素は整列済みとみなす。</li>
          <li>外側のループを開始する。2番目の要素（`i=1`）から最後の要素までを順番に見ていく。</li>
          <li>現在の要素 `data[i]` を `key` として取り出す。</li>
          <li>内側のループを開始する。整列済み部分の末尾から先頭に向かって `key` と比較していく。
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>もし比較している要素 `data[j]` が `key` より大きければ、その要素を一つ後ろにずらす (`data[j+1] = data[j]`)。</li>
              <li>比較対象を一つ前にずらし、`key` より小さい要素が見つかるか、先頭に達するまで繰り返す。</li>
            </ul>
          </li>
          <li>内側のループが終了した位置の直後が `key` の正しい挿入場所なので、`key` をそこに挿入する。</li>
          <li>外側のループが終了するまで、ステップ2から5を繰り返す。</li>
          <li>ソートが完了した配列を返す。</li>
        </ol>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
      <p>
        挿入ソートの計算量は、データの並び方によって異なります。
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li><strong className="text-white">最悪計算時間: O(n²)</strong><br />
        データが降順（ソートしたい順序と逆）に並んでいる場合。内側のループが毎回最大回数実行されるため、計算量はnの2乗に比例します。</li>
        <li><strong className="text-white">平均計算時間: O(n²)</strong><br />
        データがランダムに並んでいる場合も、平均的にはO(n²)となります。</li>
        <li><strong className="text-white">最良計算時間: O(n)</strong><br />
        データが昇順（ソートしたい順序通り）に並んでいる場合。内側のループは一度も実行されず、外側のループだけで済むため、計算量はnに比例します。</li>
      </ul>
    </>
  );
}