'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import CodeExample from '@/components/lesson/CodeExample'
import SectionHeader from '@/components/lesson/SectionHeader'
import ProblemSection from '@/components/lesson/ProblemSection'

export default function VariablesAndConstantsPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/2')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="変数と定数"
      subtitle="データを扱うための「箱」"
    >
          <p>
            プログラムでは、数値や文字列などのデータを一時的に保存しておく場所が必要です。その役割を果たすのが「変数」と「定数」です。これらは、データに名前をつけて管理するための「箱」のようなものだと考えてください。
          </p>

          <SectionHeader title="「変数」とは？" />
          <p>
            「変数」は、中身を後から変更できる箱です。例えば、ゲームのスコアのように、処理の途中で値が変わる可能性のあるデータを保存するのに使います。
          </p>
          <CodeExample
            title="コードの例：変数"
            code="変数 score = 80  // scoreという名前の変数に80を保存<br />出力: score      // 80が出力される<br /><br />score = 95      // scoreの中身を95に変更<br />出力: score      // 95が出力される"
          />

          <SectionHeader title="「定数」とは？" />
          <p>
            「定数」は、一度中身を入れたら変更できない箱です。円周率（π）のように、プログラムの実行中に変わることのない値を保存するのに使います。
          </p>
          <p>
            値を変更しないことを明確にすることで、意図しない書き換えを防ぎ、コードが読みやすく安全になります。
          </p>
          <CodeExample
            title="コードの例：定数"
            code="定数 PI = 3.14  // PIという名前の定数に3.14を保存<br />出力: PI       // 3.14が出力される"
          />

          <SectionHeader title="問題" />
          <p>
            下のコードは正しく実行され、結果が出力されるでしょうか？それともエラーになるでしょうか？
          </p>
          <ProblemSection
            title="このコードはエラーが出るか出ないか"
            code="定数 ありがとう = 39<br />ありがとう = 50<br />出力 : ありがとう"
            answer="エラーになる"
            explanation="「ありがとう」は「定数」として宣言されているため、一度39を代入した後に50を再代入しようとするとエラーが発生します。定数は後から値を変更することができません。"
          />
      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1/3"
        nextText="次のレッスンへ：条件分岐"
      />
    </LessonLayout>
  );
}