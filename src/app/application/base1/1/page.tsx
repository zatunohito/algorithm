'use client'

import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'

import SectionHeader from '@/components/lesson/SectionHeader'

export default function StartEndPage() {
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress('/application/base1/1')

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title="開始と終了"
      subtitle="プログラムの基本的な構造"
    >
          <p>
            すべてのプログラムやアルゴリズムには、明確な「開始」と「終了」があります。これは、処理がどこから始まり、どこで終わるのかを定義する、最も基本的なルールです。
          </p>

          <SectionHeader title="「開始」とは？" />
          <p>
            「開始」は、プログラムが実行される最初のポイントです。ここから処理が順番に実行されていきます。フローチャート（流れ図）では、通常、角の丸い四角形で「開始」または「Start」と書かれた記号で表されます。
          </p>
          <p>
            この「開始」のステップがあることで、コンピュータはどこから命令を読み解けばよいのかを正確に理解できます。
          </p>

          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">フローチャートの例：開始記号</h3>
            <div className="flex justify-center items-center">
              <div className="border-2 border-blue-400 rounded-full px-8 py-3 text-white font-mono text-lg bg-gray-800/50">
                開始
              </div>
            </div>
          </div>

          <SectionHeader title="「終了」とは？" />
          <p>
            「終了」は、プログラムのすべての処理が完了し、停止するポイントです。これ以降、コンピュータはそのプログラムに関する処理を行いません。フローチャートでは、「開始」と同じく角の丸い四角形で「終了」または「End」と書かれた記号で表されます。
          </p>
          <p>
            「終了」が明確に定義されていることで、プログラムが無限に動き続ける（無限ループ）のを防ぎ、意図した通りに処理を終えることができます。
          </p>

          <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-white mt-0 mb-4">フローチャートの例：終了記号</h3>
            <div className="flex justify-center items-center">
              <div className="border-2 border-blue-400 rounded-full px-8 py-3 text-white font-mono text-lg bg-gray-800/50">
                終了
              </div>
            </div>
          </div>

          <SectionHeader title="なぜ重要なのか？" />
          <p>
            「開始」と「終了」は、プログラムの全体像を把握するための道しるべです。
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong className="text-white">構造の明確化:</strong> プログラムの流れがどこから始まり、どこで終わるのかがはっきりします。</li>
            <li><strong className="text-white">予測可能性:</strong> プログラムが必ず終了することが保証され、意図しない動作を防ぎます。</li>
            <li><strong className="text-white">デバッグの容易さ:</strong> 問題が発生した際に、処理の開始点と終了点が分かっていると、原因の特定がしやすくなります。</li>
          </ul>
          <p className="mt-4">
            どんなに複雑なアルゴリズムでも、この「開始」から「終了」までの一連の流れの中に記述されます。まずはこの基本構造をしっかりと理解しましょう。
          </p>
      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref="/application/base1/2"
        nextText="次のレッスンへ：変数と定数"
      />
    </LessonLayout>
  );
}