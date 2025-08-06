/* eslint-disable */
'use client';

import ProblemPageLayout from '@/components/lesson/ProblemPageLayout';
import LessonContent4 from '@/components/lesson/LessonContent4';

export default function SelectionSortProblemsPage() {
  const lessonPath = '/application/base2/4';

  return (
    <ProblemPageLayout
      backLink="/application/base2"
      backLinkText="基礎IIに戻る"
      pageTitle="問題集: 選択ソート"
      pageDescription="アルゴリズムの理解度をチェックしよう"
      documentTitle="ドキュメント: 選択ソート"
      lessonPath={lessonPath}
      nextLessonLink="/application/base2/5"
      nextLessonTitle="挿入ソート"
      lessonContent={<LessonContent4 />}
    >
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：1回目のパス</h3>
        <p className="text-gray-300 mb-4">以下の配列 `data` に対して、昇順の選択ソートを適用した場合、1回目のパス（未整列部分の先頭との交換）が終了した後の配列の状態として正しいものを選択してください。</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>配列 data = [5, 8, 2, 6, 1]</code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `[1, 8, 2, 6, 5]`</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 1回目のパスでは、未整列部分（配列全体）から最小値を探します。最小値は `1`（インデックス4）です。これと未整列部分の先頭要素 `5`（インデックス0）を交換します。その結果、配列は `[1, 8, 2, 6, 5]` となります。</p>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：2回目のパス</h3>
        <p className="text-gray-300 mb-4">問題1の続きです。1回目のパスが終了した配列 `[1, 8, 2, 6, 5]` に対して、2回目のパスが終了した後の配列の状態はどうなりますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `[1, 2, 8, 6, 5]`</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 2回目のパスでは、未整列部分（インデックス1以降 `[8, 2, 6, 5]`）から最小値を探します。最小値は `2`（元のインデックス2）です。これと未整列部分の先頭要素 `8`（インデックス1）を交換します。その結果、配列は `[1, 2, 8, 6, 5]` となります。</p>
          </div>
        </details>
      </div>

      {/* Problem 3 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：交換回数</h3>
        <p className="text-gray-300 mb-4">選択ソートの大きな特徴の一つは、要素の交換回数です。要素数 `n` の配列をソートする場合、交換が行われる回数は最大で何回ですか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> n-1 回</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 選択ソートは、1回のパス（外側のループ1周）で最小値（または最大値）を見つけた後、交換を1回だけ行います。このパスは `n-1` 回繰り返されるため、交換回数も最大で `n-1` 回となります。これは、比較回数が多い一方で交換回数が少ないという、選択ソートの重要な特性です。</p>
          </div>
        </details>
      </div>
    </ProblemPageLayout>
  );
}