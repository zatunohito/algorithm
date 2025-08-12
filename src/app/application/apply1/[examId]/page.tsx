
import { mockQuizzes } from '@/lib/quizData';
import QuizView from '@/components/quiz/QuizView';
import Link from 'next/link';

interface PageProps {
  params: {
    examId: string;
  };
}

export default function QuizPage({ params }: PageProps) {
  const quiz = mockQuizzes.find(q => q.id === params.examId);
  const lessonPath = `/application/apply1/${params.examId}`;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/application/apply1" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 模擬試験一覧に戻る</span>
        </Link>
        {quiz ? (
          <QuizView quiz={quiz} lessonPath={lessonPath} />
        ) : (
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">クイズが見つかりません</h2>
            <p className="text-gray-400">指定されたIDのクイズは存在しないか、準備中です。</p>
          </div>
        )}
      </div>
    </div>
  );
}

// This function generates static paths for all the mock quizzes.
export async function generateStaticParams() {
  return mockQuizzes.map(quiz => ({
    examId: quiz.id,
  }));
}
