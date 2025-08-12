'use client';

export default function Lesson5() {

  return (
    <>
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：最初の挿入</h3>
        <p className="text-gray-300 mb-4">以下の配列 `data` に対して、昇順の挿入ソートを適用します。最初のパス（`i=1`）が終了した後の配列の状態として正しいものを選択してください。</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>配列 data = [5, 2, 4, 6, 1, 3]</code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> `[2, 5, 4, 6, 1, 3]`</p>
            <p className="mt-2"><strong>理由:</strong> 最初のパスでは、未整列部分の先頭である `2` (インデックス1) を取り出します。これを整列済み部分 `[5]` の適切な位置に挿入します。`5` は `2` より大きいため、`5` を後ろにずらし、空いた先頭の位置に `2` を挿入します。</p>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：2回目の挿入</h3>
        <p className="text-gray-300 mb-4">問題1の続きです。配列が `[2, 5, 4, 6, 1, 3]` となった状態から、2回目のパス（`i=2`）が終了した後の配列の状態はどうなりますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> `[2, 4, 5, 6, 1, 3]`</p>
            <p className="mt-2"><strong>理由:</strong> 2回目のパスでは、`4` (インデックス2) を取り出します。これを整列済み部分 `[2, 5]` の適切な位置に挿入します。`5` は `4` より大きいため後ろにずらしますが、`2` は `4` より小さいため、その直後に `4` を挿入します。</p>
          </div>
        </details>
      </div>

      {/* Problem 3 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：最良のケース</h3>
        <p className="text-gray-300 mb-4">挿入ソートが最も高速に動作するのはどのようなデータの場合ですか？また、その時の計算量はどうなりますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> データが既にソート（整列）済みの場合。計算量は O(n) となります。</p>
            <p className="mt-2"><strong>理由:</strong> データが既に整列済みの場合、内側のループ（要素をずらす処理）は一度も実行されません。外側のループで要素を1つずつ確認するだけなので、処理回数は要素数 `n` に比例します。これは挿入ソートの大きな利点の一つです。</p>
          </div>
        </details>
      </div>
    </>
  );
}
