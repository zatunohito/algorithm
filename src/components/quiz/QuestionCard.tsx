
import type { Question } from '@/types/quiz';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  isSubmitted: boolean;
}

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer, isSubmitted }: Props) {
  return (
    <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">問題 {question.id}: {question.text}</h3>
      {question.code && (
        <pre className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
          <code>{question.code}</code>
        </pre>
      )}
      {question.image && (
        <div className="mb-4">
          <img src={question.image} alt={`Question ${question.id}`} className="max-w-full h-auto rounded-lg" />
        </div>
      )}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isCorrect = isSubmitted && option.id === question.correctAnswer;
          const isSelected = selectedAnswer === option.id;
          const isIncorrect = isSubmitted && isSelected && option.id !== question.correctAnswer;

          return (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              disabled={isSubmitted}
              className={`
                w-full text-left p-4 rounded-lg border transition-all duration-200 
                ${isCorrect ? 'bg-green-500/30 border-green-500' : ''}
                ${isIncorrect ? 'bg-red-500/30 border-red-500' : ''}
                ${!isSubmitted && isSelected ? 'bg-blue-500/20 border-blue-500' : ''}
                ${!isSubmitted && !isSelected ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/80 hover:border-blue-600' : ''}
                ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className="font-mono mr-3">{option.id}.</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
      {isSubmitted && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h4 className="font-semibold text-blue-300 mb-2">解説</h4>
          <p className="text-gray-300 whitespace-pre-wrap">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
