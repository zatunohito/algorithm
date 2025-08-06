/* eslint-disable */
'use client'

export default function LessonContent4() {
  return (
    <>
      <p>
        選択ソートは、<strong className="text-white">配列の未整列な部分から最小値（または最大値）を探し出し、それを未整列部分の先頭要素と交換する</strong>という操作を繰り返すことで、データを整列（ソート）するアルゴリズムです。
      </p>
      <p>
        アルゴリズムの動作が人間にとって直感的で分かりやすいのが特徴です。
      </p>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">アルゴリズムの流れ</h2>
      <p>
        配列`data`を昇順にソートする例を考えます。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">共通テスト用プログラム表記（擬似コード）</h3>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 selectionSort(data)<br />
            {'  '}変数 n = dataの要素数<br />
            {'  '}// i は整列済みの末尾、または未整列部分の先頭を指す<br />
            {'  '}i を 0 から n - 2 まで 1 ずつ増やしながら繰り返す<br />
            {'    '}変数 minIndex = i  // 最小値のインデックスを保持<br />
            {'    '}// 未整列部分から最小値を探すループ<br />
            {'    '}j を i + 1 から n - 1 まで 1 ずつ増やしながら繰り返す<br />
            {'      '}もし data[j] が data[minIndex] より小さい ならば<br />
            {'        '}minIndex = j<br />
            {'      '}終わり<br />
            {'    '}終わり<br />
            {'    '}// 見つかった最小値を未整列部分の先頭と交換<br />
            {'    '}data[i] と data[minIndex] を交換する<br />
            {'  '}終わり<br />
            {'  '}返す data<br />
            終わり
          </code>
        </pre>
        <p className="mt-4">
          このコードは二重ループになっています。外側のループは、ソート済みの境界を一つずつ進めます。内側のループは、未整列の範囲から最小の要素を探し出し、そのインデックスを`minIndex`に保存します。内側のループが終わった後、見つかった最小値と未整列部分の先頭の要素を交換します。
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">フローチャートの考え方</h2>
      <p>
        選択ソートの考え方をフローチャートで表すと、以下のようになります。
      </p>
      <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <ol className="list-decimal list-inside space-y-2">
          <li>ソートを開始する。</li>
          <li>外側のループを開始する。このループは未整列部分の先頭を指す（`i`が0から`n-2`まで）。</li>
          <li>未整列部分の先頭を、暫定の最小値のインデックス（`minIndex`）とする。</li>
          <li>内側のループを開始し、`i+1`から配列の末尾まで走査して、真の最小値を探す。
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>現在の要素`data[j]`が暫定の最小値`data[minIndex]`より小さければ、`minIndex`を`j`に更新する。</li>
            </ul>
          </li>
          <li>内側のループが終了したら、`minIndex`に最小値のインデックスが格納されている。</li>
          <li>未整列部分の先頭要素`data[i]`と、見つかった最小値`data[minIndex]`を交換する。</li>
          <li>外側のループが終了するまで、ステップ2から6を繰り返す。</li>
          <li>ソートが完了した配列を返す。</li>
        </ol>
      </div>

      <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">計算量</h2>
      <p>
        選択ソートの計算量は、バブルソートと同様に <strong className="text-white">O(n²)</strong>（オーダーエヌ二乗）となります。
      </p>
      <p>
        二重ループ構造のため、比較回数は常に一定で、要素数nに対して約n²/2回です。一方、交換回数は外側のループの回数と同じでn-1回となります。バブルソートに比べて要素の交換回数が少ないのが特徴ですが、比較回数が多いため、全体的な計算量は同じオーダーになります。
      </p>
    </>
  );
}