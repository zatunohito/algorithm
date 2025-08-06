'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import CodeExample from '@/components/lesson/CodeExample'
import SectionHeader from '@/components/lesson/SectionHeader'
import ProblemSection from '@/components/lesson/ProblemSection'

export default function RepetitionPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/4')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="繰り返し"
      subtitle="同じ処理を何度も実行する"
    >
      <p>
        プログラミングでは、同じ、あるいは似たような処理を何度も実行したい場面がよくあります。例えば、「リストの全項目を表示する」「合計点が100を超えるまで計算を続ける」などです。このような処理を効率的に行うのが「繰り返し（ループ）」です。
      </p>

      <SectionHeader title="決まった回数繰り返す" />
      <p>
        最も基本的な繰り返しは、「指定した回数だけ処理を実行する」というものです。何回繰り返すかが事前にわかっている場合に使われます。
      </p>
      <CodeExample
        title="コードの例：5回繰り返す"
        code="i を 1 から 5 まで 1 ずつ増やしながら繰り返す<br />{'  '}出力: &quot;テスト&quot;<br />終わり"
        description="この例では、「こんにちは」という文字列が5回出力されます。"
      />

      <SectionHeader title="条件が成り立つ間繰り返す" />
      <p>
        「特定の条件が満たされている間だけ、処理を繰り返す」という方法もあります。繰り返しの回数が事前に決まっていない場合に便利です。
      </p>
      <CodeExample
        title="コードの例：条件で繰り返す"
        code="変数 count = 0<br />count {'<'} 3 の間、繰り返す<br />{'  '}出力: &quot;ループ中&quot;<br />{'  '}count = count + 1<br />終わり"
        description="この例では、`count`が0, 1, 2の間は条件が成り立つため、「ループ中」が3回出力されます。`count`が3になると条件が成り立たなくなり、ループは終了します。ループ内で`count`の値を変更しないと、無限に処理が続いてしまう（無限ループ）ので注意が必要です。"
      />

      <SectionHeader title="問題" />
      
      <ProblemSection
        title="問題1：何が出力される？"
        code="変数 sum = 0<br />i を 1 から 4 まで 1 ずつ増やしながら繰り返す<br />{'  '}sum = sum + i<br />終わり<br />出力: sum"
        answer="10"
        explanation="`sum`に`i`の値（1, 2, 3, 4）が順番に足されていきます。最終的に `0 + 1 + 2 + 3 + 4` の計算結果である10が出力されます。"
      />

      <ProblemSection
        title="問題2：何が出力される？"
        code="変数 num = 10<br />num {'>'} 1 の間、繰り返す<br />{'  '}出力: num<br />{'  '}num = num - 3<br />終わり"
        answer="10<br />7<br />4"
        explanation="ループは`num`が1より大きい間続きます。最初に10が出力され、`num`は7になります。次に7が出力され、`num`は4になります。次に4が出力され、`num`は1になります。ここで条件 `num {'>'} 1` が偽になるため、ループは終了します。"
      />

      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1/5"
        nextText="次のレッスンへ：配列"
      />
    </LessonLayout>
  );
}