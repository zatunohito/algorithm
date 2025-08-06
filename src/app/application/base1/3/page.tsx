'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import CodeExample from '@/components/lesson/CodeExample'
import SectionHeader from '@/components/lesson/SectionHeader'
import ProblemSection from '@/components/lesson/ProblemSection'

export default function ConditionalBranchingPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/3')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="条件分岐"
      subtitle="「もし〜ならば」で処理を分ける"
    >
      <p>
        プログラムは、常に同じ順番で実行されるだけではありません。特定の「条件」が満たされているかどうかによって、実行する処理を変えることができます。これを「条件分岐」と呼びます。
      </p>

      <SectionHeader title="もし〜ならば (if文)" />
      <p>
        最も基本的な条件分岐は「もし（if）条件が正しいならば、この処理をする」という形です。フローチャートでは、ひし形の記号を使って条件を表します。
      </p>
      <CodeExample
        title="コードの例：if文"
        code="変数 age = 20<br />もし age が 18 以上 ならば<br />{'  '}出力: &quot;成人です&quot;<br />終わり"
        description="この例では、変数`age`が18以上なので、「成人です」と出力されます。"
      />

      <SectionHeader title="そうでなければ (else)" />
      <p>
        「もし条件が正しくなければ、代わりにこちらの処理をする」という場合、「そうでなければ（else）」を使います。
      </p>
      <CodeExample
        title="コードの例：if-else文"
        code="変数 score = 75<br />もし score が 80 以上 ならば<br />{'  '}出力: &quot;合格&quot;<br />そうでなければ<br />{'  '}出力: &quot;不合格&quot;<br />終わり"
        description="この例では、`score`が80未満なので、「不合格」と出力されます。"
      />

      <SectionHeader title="さらに他の条件も (else if)" />
      <p>
        複数の条件で分岐させたい場合は、「そうでなく、もし（else if）」を使って条件を追加できます。
      </p>
      <CodeExample
        title="コードの例：if-else if-else文"
        code="変数 time = 14<br />もし time が 12 より小さい ならば<br />{'  '}出力: &quot;午前&quot;<br />そうでなく、もし time が 18 より小さい ならば<br />{'  '}出力: &quot;午後&quot;<br />そうでなければ<br />{'  '}出力: &quot;夜&quot;<br />終わり"
        description="この例では、`time`は12以上かつ18未満なので、「午後」と出力されます。"
      />

      <SectionHeader title="問題" />
      
      <ProblemSection
        title="問題1：何が出力される？"
        code="変数 x = 10<br />もし x {'>'} 5 ならば<br />{'  '}x = x + 5<br />終わり<br />出力: x"
        answer="15"
        explanation="条件 `x {'>'} 5` (10は5より大きい) が真なので、if文の中の `x = x + 5` が実行され、xは15になります。"
      />

      <ProblemSection
        title="問題2：何が出力される？"
        code="変数 temperature = 28<br />もし temperature {'>='} 30 ならば<br />{'  '}出力: &quot;エアコンをつける&quot;<br />そうでなければ<br />{'  '}出力: &quot;窓を開ける&quot;<br />終わり"
        answer="窓を開ける"
        explanation="条件 `temperature {'>='} 30` (28は30以上) が偽なので、`そうでなければ` (else) のブロックが実行されます。"
      />

      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1/4"
        nextText="次のレッスンへ：繰り返し"
      />
    </LessonLayout>
  );
}