
import type { Question } from '@/types/quiz';

interface Props {
  questions: Question[];
  userAnswers: { [key: number]: string };
  score: number;
  onRestart: () => void;
}

export default function QuizResult({ questions, userAnswers, score, onRestart }: Props) {
  return (
    <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800 shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">クイズ完了！</h2>
      <p className="text-xl text-center mb-8">あなたのスコア: <span className="font-bold text-green-400">{score}%</span></p>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          return (
            <div key={question.id} className="p-4 bg-gray-800 rounded-lg">
              <p className="font-semibold mb-2">問題 {index + 1}: {question.text}</p>
              <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                あなたの解答: {userAnswer ? question.options.find(o => o.id === userAnswer)?.text : '未解答'} {isCorrect ? '✔' : '✘'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-400">正解: {question.options.find(o => o.id === question.correctAnswer)?.text}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button 
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-300"
        >
          もう一度挑戦する
        </button>
      </div>
    </div>
  );
}
