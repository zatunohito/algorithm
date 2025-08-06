
'use client';

import ProblemPageLayout from '@/components/lesson/ProblemPageLayout';
import LessonContent3 from '@/components/lesson/LessonContent3';

export default function BubbleSortProblemsPage() {
  const lessonPath = '/application/base2/3';

  return (
    <ProblemPageLayout
      backLink="/application/base2"
      backLinkText="基礎IIに戻る"
      pageTitle="問題集: バブルソート"
      pageDescription="アルゴリズムの理解度をチェックしよう"
      documentTitle="ドキュメント: バブルソート"
      lessonPath={lessonPath}
      nextLessonLink="/application/base2/4"
      nextLessonTitle="選択ソート"
      lessonContent={<LessonContent3 />}
    >
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：1回目のパス</h3>
        <p className="text-gray-300 mb-4">以下の配列 `data` に対して、昇順のバブルソートを適用した場合、1回目のパス（走査）が終了した後の配列の状態として正しいものを選択してください。</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>配列 data = [5, 3, 8, 1, 4]</code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `[3, 5, 1, 4, 8]`</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> バブルソートの1回のパスでは、隣り合う要素を比較し、左が大きい場合に交換します。この操作を配列の末尾まで繰り返すと、最も大きい要素が右端に移動します。</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>[<strong className="text-yellow-300">5, 3</strong>, 8, 1, 4] → [<strong className="text-green-400">3, 5</strong>, 8, 1, 4] (交換)</li>
              <li>[3, <strong className="text-yellow-300">5, 8</strong>, 1, 4] → [3, <strong className="text-green-400">5, 8</strong>, 1, 4] (交換なし)</li>
              <li>[3, 5, <strong className="text-yellow-300">8, 1</strong>, 4] → [3, 5, <strong className="text-green-400">1, 8</strong>, 4] (交換)</li>
              <li>[3, 5, 1, <strong className="text-yellow-300">8, 4</strong>] → [3, 5, 1, <strong className="text-green-400">4, 8</strong>] (交換)</li>
            </ul>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：計算量</h3>
        <p className="text-gray-300 mb-4">要素数が `n` の配列に対してバブルソートを行う場合、最悪計算時間（最も時間がかかる場合）のオーダー表記として正しいものはどれですか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> O(n²)</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> バブルソートは二重ループ構造を持ち、外側のループと内側のループがそれぞれ約n回実行されます。そのため、比較・交換の回数はnの2乗に比例し、計算量はO(n²)となります。これは、データが完全に逆順にソートされている場合などに相当します。</p>
          </div>
        </details>
      </div>

      {/* Problem 3 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：擬似コードの穴埋め</h3>
        <p className="text-gray-300 mb-4">以下のバブルソートの擬似コードについて、空欄 `[ ア ]` に入る最も適切な記述を選択してください。このループは、未ソート部分の隣り合う要素を比較するためのものです。</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 bubbleSort(data)<br />
            {'  '}変数 n = dataの要素数<br />
            {'  '}i を 0 から n - 2 まで 1 ずつ増やしながら繰り返す<br />
            {'    '}j を 0 から [      ア      ] まで 1 ずつ増やしながら繰り返す<br />
            {'      '}もし data[j] が data[j+1] より大きい ならば<br />
            {'        '}data[j] と data[j+1] を交換する<br />
            {'      '}終わり<br />
            {'    '}終わり<br />
            {'  '}終わり<br />
            終わり
          </code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `n - i - 2`</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 外側のループ `i` が1回完了するごとに、配列の右端から `i` 個の要素のソートが確定します。したがって、内側のループで比較する必要があるのは `n - i` 個の要素です。この範囲で隣り合う要素 `data[j]` と `data[j+1]` を比較するため、`j` のインデックスは `0` から `(n - i - 1) - 1`、つまり `n - i - 2` までとなります。</p>
          </div>
        </details>
      </div>

      {/* Problem 4 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題4：総パス数</h3>
        <p className="text-gray-300 mb-4">要素数が5の配列 `[5, 3, 8, 1, 4]` をバブルソートで完全に整列させるには、最大で何回のパス（外側のループの繰り返し）が必要ですか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> 4回</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> バブルソートでは、要素数が `n` の場合、最大で `n-1` 回のパスが必要です。1回のパスで少なくとも1つの要素（その時点で最大の要素）が正しい位置に確定するためです。要素数が5の場合、`5 - 1 = 4` 回のパスで全ての要素が整列されます。</p>
          </div>
        </details>
      </div>
    </ProblemPageLayout>
  );
}