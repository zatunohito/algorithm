'use client';

import Image from 'next/image';
import React from 'react';

export interface QuestionCardProps {
  problemNumber: number;
  questionText: React.ReactNode;
  imageUrl?: string;
  choices: string[];
  selectedAnswer: number | null;
  onAnswerChange: (choiceIndex: number) => void;
  isSubmitted: boolean;
  correctAnswerIndex: number;
  explanation: React.ReactNode;
}

// --- ユーティリティ関数追加 ---
/**
 * コードブロック内で「数字+空白」の前で改行を挿入する
 * ただし、行頭の数字が1から1ずつ増加していない場合は改行を挿入しない
 * 1から連番で増えている場合のみ、その数字の前で改行する
 */
function formatCodeWithLineBreaks(text: string): string {
  const regex = /(\d+) /g;
  let result = '';
  let lastIndex = 0;
  let expectedNum = 1;
  let match: RegExpExecArray | null;
  let first = true;

  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1], 10);
    if (num === expectedNum) {
      // 数字の直前で改行（1行目以外のみ）
      if (!first) {
        result += text.slice(lastIndex, match.index) + '\n';
      } else {
        result += text.slice(lastIndex, match.index);
      }
      result += match[1] + ' ';
      lastIndex = regex.lastIndex;
      expectedNum++;
      first = false;
    } else {
      // 連番でなければそのまま
      result += text.slice(lastIndex, regex.lastIndex);
      lastIndex = regex.lastIndex;
      expectedNum = num + 1;
      first = false;
    }
  }
  result += text.slice(lastIndex);
  return result;
}

// --- questionText内の<code>要素を整形するラッパー ---
function FormatCodeInQuestionText({ children }: { children: React.ReactNode }) {
  // childrenを再帰的に走査して<code>要素を検出し、内容を整形
  function renderWithFormat(node: React.ReactNode): React.ReactNode {
    if (React.isValidElement(node)) {
      if (node.type === 'code' && typeof node.props.children === 'string') {
        const formatted = formatCodeWithLineBreaks(node.props.children);
        return React.cloneElement(
          node,
          {},
          formatted
        );
      }
      // 子要素が配列の場合も再帰
      if (node.props && node.props.children) {
        return React.cloneElement(
          node,
          {},
          React.Children.map(node.props.children, renderWithFormat)
        );
      }
    }
    return node;
  }
  return <>{React.Children.map(children, renderWithFormat)}</>;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  problemNumber,
  questionText,
  imageUrl,
  choices,
  selectedAnswer,
  onAnswerChange,
  isSubmitted,
  correctAnswerIndex,
  explanation,
}) => {
  const getChoiceClass = (index: number) => {
    const baseClass =
      'flex items-center w-full text-left p-3 rounded-md border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70';

    if (isSubmitted) {
      if (index === correctAnswerIndex) {
        // Correct answer
        return `${baseClass} bg-green-800/50 border-green-600 text-white`;
      }
      if (index === selectedAnswer) {
        // Incorrectly selected answer
        return `${baseClass} bg-red-800/50 border-red-600 text-white`;
      }
      // Other non-selected answers after submission
      return `${baseClass} bg-gray-900/50 border-gray-700/50 text-gray-400`;
    }

    if (selectedAnswer === index) {
      // Selected but not submitted
      return `${baseClass} bg-blue-800/50 border-blue-600 text-white`;
    }

    // Default state (not selected, not submitted)
    return `${baseClass} bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600`;
  };

  return (
    <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold text-white mt-0 mb-4">
        問題{problemNumber}
      </h3>
      <div className="text-gray-300 mb-4 space-y-4 text-lg leading-relaxed">
        {/* コードブロックをより見やすく表示 */}
        <div
          className="
            [&>pre]:break-words
            [&>pre]:whitespace-pre-wrap
            [&>pre]:font-mono
            [&>pre]:bg-gray-900
            [&>pre]:rounded-md
            [&>pre]:p-4
            [&>pre]:text-base
            [&>pre]:text-green-100
            [&>pre]:border
            [&>pre]:border-gray-700
            [&>pre]:mb-2
            [&>code]:text-green-100
            [&>code]:bg-transparent
            [&>code]:p-0
            [&>code]:font-mono
          "
        >
          <FormatCodeInQuestionText>{questionText}</FormatCodeInQuestionText>
        </div>
      </div>

      {imageUrl && (
        <div className="my-6 flex justify-center">
          <Image src={imageUrl} alt={`問題${problemNumber}の画像`} width={400} height={300} className="rounded-lg max-w-full h-auto object-contain" />
        </div>
      )}

      <div className="my-6 space-y-3">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onAnswerChange(index)}
            disabled={isSubmitted}
            className={getChoiceClass(index)}
          >
            <span className="mr-4 text-gray-400 font-mono">{index + 1}.</span>
            <span className="flex-1 text-left text-gray-200">{choice}</span>
          </button>
        ))}
      </div>

      {isSubmitted && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-2">答えと解説</h4>
          <div className="text-gray-300 space-y-4">
            <p><strong className="text-white">正解:</strong> {choices[correctAnswerIndex]}</p>
            <div>
              <strong className="text-white">解説:</strong>
              <div className="mt-2 leading-relaxed">{explanation}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};