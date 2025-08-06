'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import CodeExample from '@/components/lesson/CodeExample'
import SectionHeader from '@/components/lesson/SectionHeader'
import ProblemSection from '@/components/lesson/ProblemSection'

export default function ArrayPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/5')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="配列"
      subtitle="複数のデータをまとめて扱う"
    >
      <p>
        プログラムでは、たくさんのデータを扱うことがよくあります。例えば、クラス全員のテストの点数や、買い物リストの商品名などです。これらの関連するデータを一つにまとめて管理できるのが「配列」です。
      </p>

      <SectionHeader title="配列とは？" />
      <p>
        配列は、複数のデータを入れることができる、番号付きの箱が並んだ棚のようなものです。この「番号」のことを「インデックス（添字）」と呼びます。
        <strong className="text-white">多くのプログラミング言語では、インデックスは0から始まります。</strong>
      </p>
      <CodeExample
        title="コードの例：配列の宣言とアクセス"
        code="配列 scores = [85, 92, 78]<br /><br />出力: scores[1]  // 92が出力される"
        description="この例では、`scores`という配列のインデックス`1`（2番目）の箱に入っている`92`が出力されます。"
      />

      <SectionHeader title="繰り返し処理との組み合わせ" />
      <p>
        配列は、前のレッスンで学んだ「繰り返し」と組み合わせることで真価を発揮します。ループを使って、配列のすべての要素に対して同じ処理を簡単に行うことができます。
      </p>
      <CodeExample
        title="コードの例：配列の全要素を出力"
        code="配列 items = [&quot;鉛筆&quot;, &quot;消しゴム&quot;, &quot;ノート&quot;]<br />i を 0 から 2 まで 1 ずつ増やしながら繰り返す<br />{'  '}出力: items[i]<br />終わり"
        description="このループは、`i`が0, 1, 2と変化し、`items[0]`, `items[1]`, `items[2]`が順番に出力されます。"
      />

      <SectionHeader title="問題" />
      
      <ProblemSection
        title="問題1：何が出力される？"
        code="配列 numbers = [100, 200, 300, 400]<br />出力: numbers[3]"
        answer="400"
        explanation="配列のインデックスは0から始まるため、`numbers[3]`は4番目の要素である`400`を指します。"
      />

      <ProblemSection
        title="問題2：最終的に`result`は何になる？"
        code="配列 values = [2, 4, 6, 8]<br />変数 result = 0<br />i を 0 から 3 まで 1 ずつ増やしながら繰り返す<br />{'  '}もし values[i] {'>'} 5 ならば<br />{'    '}result = result + values[i]<br />{'  '}終わり<br />終わり<br />出力: result"
        answer="14"
        explanation="ループは配列`values`の各要素をチェックします。条件`values[i] {'>'} 5`が真になるのは、`6`と`8`の時です。そのため、`result`は`0 + 6 + 8`で`14`になります。"
      />

      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1/6"
        nextText="次のレッスンへ：関数"
      />
    </LessonLayout>
  );
}