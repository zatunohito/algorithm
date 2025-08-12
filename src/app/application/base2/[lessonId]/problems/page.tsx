
'use client'

import { base2Lessons } from '@/lib/base2Data';
import { notFound } from 'next/navigation';
import ProblemPageLayout from '@/components/lesson/ProblemPageLayout';

interface PageProps {
  params: {
    lessonId: string;
  };
}

export default function Base2ProblemsPage({ params }: PageProps) {
  const { lessonId } = params;
  const lesson = base2Lessons[lessonId];

  if (!lesson) {
    notFound();
  }

  const lessonPath = `/application/base2/${lessonId}`;
  const nextLesson = lesson.nextLesson ? base2Lessons[lesson.nextLesson] : undefined;

  return (
    <ProblemPageLayout
      backLink="/application/base2"
      backLinkText="基礎IIに戻る"
      pageTitle={lesson.problems.title}
      pageDescription={lesson.problems.description}
      documentTitle={lesson.doc.title}
      lessonPath={lessonPath}
      nextLessonLink={lesson.nextLesson ? `/application/base2/${lesson.nextLesson}` : undefined}
      nextLessonTitle={nextLesson ? nextLesson.title : undefined}
      >
      <lesson.problems.contentComponent />
    </ProblemPageLayout>
  );
}
