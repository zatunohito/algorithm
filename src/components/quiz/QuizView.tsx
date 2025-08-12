
'use client'

import { useState, useEffect } from 'react';
import type { Quiz, Question } from '@/types/quiz';
import { useUserProgress } from '@/hooks/useUserProgress';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

interface Props {
  quiz: Quiz;
  lessonPath: string;
}

export default function QuizView({ quiz, lessonPath }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { isCompleted, handleComplete } = useUserProgress(lessonPath);

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [quiz.questions[currentQuestionIndex].id]: answerId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    // Only mark as complete if score is, for example, 80% or higher
    // Or simply mark as complete regardless of score, as per initial interpretation.
    // For now, let's mark as complete if it's not already.
    if (!isCompleted) {
        handleComplete();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  if (isSubmitted) {
    return <QuizResult questions={quiz.questions} userAnswers={userAnswers} score={score} onRestart={handleRestart} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestion.id] || null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-2">{quiz.title}</h2>
      <p className="text-center text-gray-400 mb-8">問題 {currentQuestionIndex + 1} / {quiz.questions.length}</p>
      
      <QuestionCard 
        question={currentQuestion} 
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        isSubmitted={false} // In this view, we don't show answers immediately
      />

      <div className="flex justify-between items-center mt-8">
        <div>
          {/* Placeholder for previous button if needed */}
        </div>
        <div>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button 
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              次の問題へ
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              結果を見る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
