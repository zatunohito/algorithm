
'use client'

import { base2Lessons } from '@/lib/base2Data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import { useUserProgress } from '@/hooks/useUserProgress';
import LoadingError from '@/components/lesson/LoadingError';

interface PageProps {
  params: {
    lessonId: string;
  };
}

export default function Base2DocPage({ params }: PageProps) {
  const { lessonId } = params;
  const lesson = base2Lessons[lessonId];

  if (!lesson) {
    notFound();
  }

  const lessonPath = `/application/base2/${lessonId}`;
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress(lessonPath);

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  const { doc, problems } = lesson;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/application/base2" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; 基礎IIに戻る</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{doc.title}</h1>
          <p className="mt-4 text-lg text-gray-400">{doc.subtitle}</p>
        </div>

        <doc.contentComponent />

        {doc.visualizer && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">{lesson.title}の動作確認</h2>
            <AlgorithmVisualizer 
              algorithm={doc.visualizer.algorithm}
              data={doc.visualizer.data}
              target={doc.visualizer.target}
            />
          </div>
        )}

        <div className="mt-12 text-center space-y-4">
          {user && (
            <button
              onClick={handleComplete}
              className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
                isCompleted 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
            >
              {isCompleted ? '✓ 完了済み（クリックで解除）' : 'レッスンを完了する'}
            </button>
          )}
          <div>
            <Link href={`${lessonPath}/problems`} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                問題集に進む &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
