'use client'

import QuizView from '@/components/quiz/QuizView';
import { mockQuizzes } from '@/lib/quizData';

export default function MockExam5Page() {
  const quiz = mockQuizzes.find(q => q.id === 'apply1-mock-5');

  if (!quiz) {
    return <div>クイズが見つかりません。</div>;
  }

  return (
    <QuizView quiz={quiz} />
  );
}
