'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import CodeExample from '@/components/lesson/CodeExample'
import SectionHeader from '@/components/lesson/SectionHeader'
import ProblemSection from '@/components/lesson/ProblemSection'

export default function FunctionPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/6')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="関数"
      subtitle="処理をひとまとめにし、再利用する"
    >
      <p>
        プログラムが大きくなってくると、同じようなコードを何度も書く場面が増えてきます。そんな時に便利なのが「関数」です。関数を使うと、一連の処理をひとまとめにして名前をつけ、必要な時にその名前を呼び出すだけで実行できるようになります。
      </p>

      <SectionHeader title="関数とは？" />
      <p>
        関数は、特定のタスクを実行するための一連の命令のブロックです。一度定義すれば、プログラムのどこからでも何度でも呼び出すことができます。これにより、コードの重複をなくし、プログラムを整理して見通しを良くすることができます。
      </p>
      <CodeExample
        title="コードの例：単純な関数"
        code="関数 sayHello()<br />{'  '}出力: &quot;こんにちは！&quot;<br />終わり<br /><br />sayHello()  // &quot;こんにちは！&quot; と出力される<br />sayHello()  // もう一度呼び出しても同じ処理が実行される"
      />

      <SectionHeader title="引数と戻り値" />
      <p>
        関数をさらに便利にするのが「引数（ひきすう）」と「戻り値（もどりち）」です。
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li><strong className="text-white">引数:</strong> 関数に外部からデータ（値）を渡すためのものです。これにより、関数は渡されたデータに応じて異なる動作をすることができます。</li>
        <li><strong className="text-white">戻り値:</strong> 関数が処理した結果を、呼び出し元に返すためのものです。</li>
      </ul>
      <CodeExample
        title="コードの例：引数と戻り値を持つ関数"
        code="関数 add(a, b)<br />{'  '}変数 result = a + b<br />{'  '}返す result<br />終わり<br /><br />変数 sum = add(5, 3)<br />出力: sum  // 8が出力される"
      />

      <SectionHeader title="問題" />
      
      <ProblemSection
        title="問題1：何が出力される？"
        code="関数 multiply(x, y)<br />{'  '}返す x * y<br />終わり<br /><br />変数 answer = multiply(6, 7)<br />出力: answer"
        answer="42"
        explanation="`multiply`関数が`6`と`7`を引数として呼び出され、その積である`42`が返されます。その結果が変数`answer`に保存され、出力されます。"
      />

      <ProblemSection
        title="問題2：何が出力される？"
        code="関数 checkAge(age)<br />{'  '}もし age {'>='} 20 ならば<br />{'    '}返す &quot;成人&quot;<br />{'  '}そうでなければ<br />{'    '}返す &quot;未成年&quot;<br />{'  '}終わり<br />終わり<br /><br />出力: checkAge(18)"
        answer="未成年"
        explanation="`checkAge`関数に`18`が渡されます。if文の条件 `age {'>='} 20` (18は20以上) が偽なので、`そうでなければ` (else) のブロックが実行され、&quot;未成年&quot;という文字列が返されて出力されます。"
      />

      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1"
        nextText="基礎Iを完了する"
      />
    </LessonLayout>
  );
}