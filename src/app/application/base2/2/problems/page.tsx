
'use client';

import ProblemPageLayout from '@/components/lesson/ProblemPageLayout';
import LessonContent2 from '@/components/lesson/LessonContent2';

export default function BinarySearchProblemsPage() {
  const lessonPath = '/application/base2/2';

  return (
    <ProblemPageLayout
      backLink="/application/base2"
      backLinkText="基礎IIに戻る"
      pageTitle="問題集: 二分探索"
      pageDescription="アルゴリズムの理解度をチェックしよう"
      documentTitle="ドキュメント: 二分探索"
      lessonPath={lessonPath}
      nextLessonLink="/application/base2/3"
      nextLessonTitle="バブルソート"
      lessonContent={<LessonContent2 />}
    >
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：前提条件</h3>
        <p className="text-gray-300 mb-4">二分探索アルゴリズムを正しく適用するために、データ配列が満たしているべき最も重要な条件は何ですか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> 配列がソート（整列）されていること。</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 二分探索は、探索範囲の中央値と目的値を比較し、大小関係に基づいて探索範囲を半分に絞り込むことで機能します。この大小比較が意味を持つためには、データが昇順または降順に並んでいる必要があります。</p>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：探索の第一歩</h3>
        <p className="text-gray-300 mb-4">以下のソート済み配列 `data` から、値 `60` を二分探索で探します。最初のステップで比較対象となる要素のインデックス `mid` は何になりますか？（インデックスは0から始まります。`mid = floor((left + right) / 2)` で計算するものとします）</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>配列 data = [10, 20, 30, 40, 50, 60, 70]</code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> 3</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 最初の探索範囲は `left = 0`, `right = 6` です。中央のインデックスは `mid = floor((0 + 6) / 2) = floor(3) = 3` となります。したがって、最初に比較されるのは `data[3]` (値は40) です。</p>
          </div>
        </details>
      </div>

      {/* Problem 3 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：探索範囲の更新</h3>
        <p className="text-gray-300 mb-4">問題2の続きです。`data[3]` (値は40) と目的の値 `60` を比較した後、次の探索範囲はどうなりますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `left` が `4` になり、`right` は `6` のまま。</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 目的の値 `60` は比較対象の `40` より大きいため、探索範囲は右半分に絞られます。アルゴリズムに従い、`left` が `mid + 1` (つまり `3 + 1 = 4`) に更新されます。`right` は変わりません。</p>
          </div>
        </details>
      </div>
    </ProblemPageLayout>
  );
}