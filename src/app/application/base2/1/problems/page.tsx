/* eslint-disable */
'use client';

import ProblemPageLayout from '@/components/lesson/ProblemPageLayout';

export default function LinearSearchProblemsPage() {
  const lessonPath = '/application/base2/1';

  return (
    <ProblemPageLayout
      backLink="/application/base2"
      backLinkText="基礎IIに戻る"
      pageTitle="問題集: 線形探索"
      pageDescription="アルゴリズムの理解度をチェックしよう"
      documentTitle="ドキュメント: 線形探索"
      lessonPath={lessonPath}
      nextLessonLink="/application/base2/2"
      nextLessonTitle="二分探索"
    >
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：探索結果</h3>
        <p className="text-gray-300 mb-4">以下の配列 `scores` から、値 `13` を線形探索で探します。アルゴリズムが見つけたインデックスは何になりますか？（インデックスは0から始まります）</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>配列 scores = [15, 7, 22, 13, 40]</code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> 3</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 配列を先頭から順番に見ていくと、`15` (インデックス0), `7` (インデックス1), `22` (インデックス2), `13` (インデックス3) となり、4番目（インデックス3）で値が見つかります。</p>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：プログラムの穴埋め</h3>
        <p className="text-gray-300 mb-4">以下のプログラムは、配列 `data` から値 `target` を線形探索し、見つかった場合はそのインデックスを、見つからなかった場合は `-1` を返すものです。空欄 `[ ア ]` に入る最も適切な記述を選択してください。</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 findIndex(data, target)<br />
            {'  '}i を 0 から dataの要素数 - 1 まで 1 ずつ増やしながら繰り返す<br />
            {'    '}もし [      ア      ] ならば<br />
            {'      '}返す i<br />
            {'    '}終わり<br />
            {'  '}終わり<br />
            {'  '}返す -1<br />
            終わり
          </code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong className="text-white">答え:</strong> `data[i] が target と等しい`</p>
            <p className="mt-2"><strong className="text-white">理由:</strong> 線形探索では、ループで配列の各要素 `data[i]` を取り出し、探している値 `target` と一致するかどうかを比較します。したがって、条件式にはこの比較が入ります。</p>
          </div>
        </details>
      </div>
    </ProblemPageLayout>
  );
}