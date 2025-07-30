'use client';

import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionCardProps } from '../components/QuestionCard';

// 第1問 配列と探索アルゴリズム (25点)
const question1_1: QuestionCardProps = {
  problemNumber: 1,
  questionText: (
    <>
      <p>
        [プログラム1] の find_max_score 関数は、配列 scores に格納された満足度のうち、最も高い点数を返すものです。以下の配列 survey_data が与えられたとき、find_max_score(survey_data, 10) の実行結果として正しいものを、選択肢から一つ選びなさい。
      </p>
      <pre>
        <code>survey_data = [7, 5, 9, 4, 8, 10, 6, 7, 5, 9]</code>
      </pre>
      <p>
        <b>[プログラム1]</b>
      </p>
      <pre>
        <code>{`// scores: アンケートの回答を格納した配列
// n: 配列scoresの要素数
function find_max_score(scores, n) {
  let max_score = scores[0];
  let i = 1;
  while (i < n) {
    if (max_score < scores[i]) {
      max_score = scores[i];
    }
    i = i + 1;
  }
  return max_score;
}`}</code>
      </pre>
    </>
  ),
  choices: ["4", "5", "7", "9", "10"],
  selectedAnswer: null,
  onAnswerChange: () => {},
  isSubmitted: false,
  correctAnswerIndex: 4,
  explanation: (
    <>
      <p>find_max_score 関数は、配列の要素を順番に見ていき、現在の最大値 max_score より大きい値が見つかれば、max_score をその値で更新します。</p>
      <ul>
        <li>max_score は scores[0] の 7 で初期化されます。</li>
        <li>i=1 の 5 は 7 より小さい。</li>
        <li>i=2 の 9 は 7 より大きいので max_score は 9 になります。</li>
        <li>i=3 の 4 は 9 より小さい。</li>
        <li>i=4 の 8 は 9 より小さい。</li>
        <li>i=5 の 10 は 9 より大きいので max_score は 10 になります。</li>
      </ul>
      <p>以降、10 より大きい値はないため、最終的に 10 が返されます。</p>
    </>
  ),
};

const question1_2: QuestionCardProps = {
  problemNumber: 2,
  questionText: (
    <>
      <p>Tさんは次に、特定の満足度（例えば8点）がアンケート結果の中にいくつ存在するかを数える関数 count_target_score を作成することにしました。以下のプログラムの空欄 [ ア ] と [ イ ] に入る最も適切な字句の組み合わせを、選択肢から一つ選びなさい。</p>
      <p><b>[プログラム2]</b></p>
      <pre><code>
1 // scores: アンケートの回答を格納した配列
2 // n: 配列scoresの要素数
3 // target: 探したい満足度
4 function count_target_score(scores, n, target)
5 | count = 0
6 | i = 0
7 | while i &lt; n
8 | | if scores[i] == [ ア ]
9 | | | count = [ イ ]
10 | | end if
11 | | i = i + 1
12 | end while
13 | return count
14 end function
      </code></pre>
    </>
  ),
  choices: [
    "ア: target, イ: count + 1",
    "ア: target, イ: i + 1",
    "ア: count, イ: count + 1",
    "ア: count, イ: i + 1",
    "ア: scores[i], イ: target",
  ],
  selectedAnswer: null,
  onAnswerChange: () => {},
  isSubmitted: false,
  correctAnswerIndex: 0,
  explanation: (
    <>
      <p>この関数は、配列 scores の各要素 scores[i] が、探したい値 target と等しいかどうかを判定する必要があります。したがって、<b>[ ア ] には target</b> が入ります。</p>
      <p>もし等しい場合、見つけた回数を記録する変数 count の値を1増やす必要があります。したがって、<b>[ イ ] には count + 1</b> が入ります。</p>
    </>
  ),
};

const question1_3: QuestionCardProps = {
  problemNumber: 3,
  questionText: (
    <>
      <p>分析を進める中で、Tさんは満足度が中央値（データを大きさの順に並べたときに中央に位置する値）に近いほど、来場者の全体的な傾向がわかると考えました。そこで、まずアンケート結果を昇順（小さい順）に並べ替えるアルゴリズムを検討しています。</p>
      <p>以下の [手順] は、<b>選択ソート</b> と呼ばれるアルゴリズムを説明したものです。空欄 [ ウ ] に入る最も適切なものを、選択肢から一つ選びなさい。</p>
      <p><b>[手順]</b></p>
      <ol>
        <li>配列の中から最小値を見つける。</li>
        <li>その最小値を、配列の未整列部分の先頭の要素と交換する。</li>
        <li>交換した要素を整列済みとみなし、残りの未整列部分に対して [ ウ ]。</li>
      </ol>
    </>
  ),
  choices: [
    "再び全体の配列から最小値を見つける。",
    "手順1から2を繰り返す。",
    "何もせず処理を終了する。",
    "配列の要素をすべて逆順にする。",
  ],
  selectedAnswer: null,
  onAnswerChange: () => {},
  isSubmitted: false,
  correctAnswerIndex: 1,
  explanation: (
    <>
      <p>選択ソートは、未整列の部分から最小値（または最大値）を選び、それを整列済みの部分の末尾に移動させる操作を、未整列部分がなくなるまで繰り返すアルゴリズムです。したがって、<b>[ ウ ] には「手順1から2を繰り返す」</b>が入るのが適切です。</p>
    </>
  ),
};

// 第2問 アルゴリズムの応用 (25点)
const question2_1: QuestionCardProps = {
  problemNumber: 1,
  questionText: (
    <>
      <p>文化祭の模擬店で、お釣りを効率的に渡す方法について考えることにしました。使える硬貨は、500円、100円、50円、10円、5円、1円の6種類とします。客に渡すお釣りの硬貨の枚数をできるだけ少なくするためのアルゴリズムを考えます。これは <b>貪欲法</b> と呼ばれるアルゴリズムの一種で解決できます。</p>
      <p><b>[アルゴリズム]</b></p>
      <p>お釣りの金額 change に対して、以下の処理を change が0になるまで繰り返す。</p>
      <ol>
        <li>使用できる硬貨の中で、額面が最も大きく、かつ change 以下の硬貨を選ぶ。</li>
        <li>その硬貨を1枚使い、change からその硬貨の額面を引く。</li>
        <li>使用した硬貨の枚数を記録する。</li>
      </ol>
      <p>お釣りが <b>786円</b> の場合、このアルゴリズムに従うと、最初に選ばれる硬貨と、その硬貨を1枚使った後のお釣りの金額の組み合わせとして正しいものを、選択肢から一つ選びなさい。</p>
    </>
  ),
  choices: [
    "硬貨: 100円, 残りのお釣り: 686円",
    "硬貨: 500円, 残りのお釣り: 286円",
    "硬貨: 500円, 残りのお釣り: 781円",
    "硬貨: 10円, 残りのお釣り: 776円",
  ],
  selectedAnswer: null,
  onAnswerChange: () => {},
  isSubmitted: false,
  correctAnswerIndex: 1,
  explanation: (
    <>
      <p>お釣りは786円です。アルゴリズムのステップ1に従い、使用できる硬貨（500, 100, 50, 10, 5, 1）の中で、額面が最も大きく、かつ786円以下なのは <b>500円硬貨</b> です。</p>
      <p>ステップ2に従い、その硬貨を1枚使うと、お釣りは 786 - 500 = <b>286 円</b> になります。</p>
    </>
  ),
};

const question2_2: QuestionCardProps = {
  problemNumber: 2,
  questionText: (
    <>
      <p>このアルゴリズムをDNCLで実装した以下のプログラムについて、空欄 [ エ ] と [ オ ] に入る最も適切な字句の組み合わせを、選択肢から一つ選びなさい。</p>
      <p><b>[プログラム3]</b></p>
      <pre><code>
1 // change: お釣りの金額
2 function calculate_coins(change)
3 | coins = [500, 100, 50, 10, 5, 1]
4 | num_coins = 0
5 | i = 0
6 | while change &gt; 0
7 | | if change &gt;= [ エ ]
8 | | | change = change - [ エ ]
9 | | | num_coins = num_coins + 1
10 | | else
11 | | | [ オ ]
12 | | end if
13 | end while
14 | return num_coins
15 end function
      </code></pre>
    </>
  ),
  choices: [
    "エ: coins[i], オ: i = i + 1",
    "エ: coins[i], オ: change = 0",
    "エ: change, オ: i = i + 1",
    "エ: change, オ: num_coins = num_coins + 1",
    "エ: coins[0], オ: i = i + 1",
  ],
  selectedAnswer: null,
  onAnswerChange: () => {},
  isSubmitted: false,
  correctAnswerIndex: 0,
  explanation: (
    <>
      <p>このプログラムは、額面の大きい硬貨から順番に使えるかどうかを試していきます。</p>
      <ul>
        <li><code>coins</code> は硬貨の額面を大きい順に格納した配列です。<code>i</code> はそのインデックスを指します。</li>
        <li><code>while</code> ループは、<code>change</code> (残りのお釣り) が0になるまで続きます。</li>
        <li><code>if</code> 文では、現在のお釣りの金額 <code>change</code> が、検討中の硬貨 <code>coins[i]</code> の額面以上であるかを比較します。したがって、<b>[ エ ] には <code>coins[i]</code></b> が入ります。</li>
        <li><code>change</code> が <code>coins[i]</code> 以上であれば、その硬貨を1枚使い（<code>change</code> から <code>coins[i]</code> を引く）、使用枚数 <code>num_coins</code> を1増やします。この場合、同じ硬貨を連続して使える可能性があるため、<code>i</code> はインクリメントしません。</li>
        <li>もし <code>change</code> が <code>coins[i]</code> より小さい場合、その硬貨は使えないため、次の額面の硬貨を試す必要があります。そのために、配列のインデックス <code>i</code> を1増やして、次のループで <code>coins[i+1]</code> を参照するようにします。したがって、<code>else</code> 節の <b>[ オ ] には <code>i = i + 1</code></b> が入ります。</li>
      </ul>
    </>
  ),
};

export default function MockExam1() {
  // 各問題の選択状態・提出状態をuseStateで管理
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [isSubmitted, setIsSubmitted] = useState<boolean[]>([false, false, false, false, false]);

  // 問題データ配列
  const questions: QuestionCardProps[] = [
    question1_1,
    question1_2,
    question1_3,
    question2_1,
    question2_2,
  ];

  // 選択肢選択時のハンドラ
  const handleAnswerChange = (questionIdx: number, choiceIdx: number) => {
    if (!isSubmitted[questionIdx]) {
      setSelectedAnswers((prev) => {
        const arr = [...prev];
        arr[questionIdx] = choiceIdx;
        return arr;
      });
    }
  };

  // 提出ボタン
  const handleSubmit = (questionIdx: number) => {
    setIsSubmitted((prev) => {
      const arr = [...prev];
      arr[questionIdx] = true;
      return arr;
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">模擬試験1</h1>
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">第1問 配列と探索アルゴリズム</h2>
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="mb-8">
            <QuestionCard
              {...questions[idx]}
              selectedAnswer={selectedAnswers[idx]}
              onAnswerChange={(choiceIdx) => handleAnswerChange(idx, choiceIdx)}
              isSubmitted={isSubmitted[idx]}
            />
            {!isSubmitted[idx] && (
              <div className="mt-4 text-right">
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  onClick={() => handleSubmit(idx)}
                  disabled={selectedAnswers[idx] === null}
                >
                  回答を提出
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">第2問 アルゴリズムの応用</h2>
        {[3, 4].map((idx) => (
          <div key={idx} className="mb-8">
            <QuestionCard
              {...questions[idx]}
              selectedAnswer={selectedAnswers[idx]}
              onAnswerChange={(choiceIdx) => handleAnswerChange(idx, choiceIdx)}
              isSubmitted={isSubmitted[idx]}
            />
            {!isSubmitted[idx] && (
              <div className="mt-4 text-right">
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  onClick={() => handleSubmit(idx)}
                  disabled={selectedAnswers[idx] === null}
                >
                  回答を提出
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}