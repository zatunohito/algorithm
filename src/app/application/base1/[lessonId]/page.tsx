'use client'

import { use } from 'react';
import { useUserProgress } from '@/hooks/useUserProgress'
import LessonLayout from '@/components/lesson/LessonLayout'
import LessonActions from '@/components/lesson/LessonActions'
import LoadingError from '@/components/lesson/LoadingError'
import { base1Lessons } from '@/lib/base1Data'
import { notFound } from 'next/navigation'
import LessonContentRenderer from '@/components/lesson/LessonContentRenderer'

interface PageProps {
  params: {
    lessonId: string
  }
}

export default function Base1LessonPage({ params }: PageProps) {
  const { lessonId } = use(params);
  const lesson = base1Lessons[lessonId]

  if (!lesson) {
    notFound()
  }

  const lessonPath = `/application/base1/${lessonId}`
  const { user, isCompleted, loading, error, handleComplete } = useUserProgress(lessonPath)

  if (loading || error) {
    return <LoadingError loading={loading} error={error} />
  }

  const nextLesson = lesson.nextLesson ? base1Lessons[lesson.nextLesson] : undefined
  const nextHref = nextLesson ? `/application/base1/${lesson.nextLesson}` : '/application/base1'
  const nextText = nextLesson ? `次のレッスンへ：${nextLesson.title}` : '基礎Iのトップに戻る'

  return (
    <LessonLayout
      backHref="/application/base1"
      backText="基礎Iに戻る"
      title={lesson.title}
      subtitle={lesson.subtitle}
    >
      {lesson.content ? (
        <LessonContentRenderer content={lesson.content} />
      ) : (
        lesson.component && <lesson.component />
      )}
      <LessonActions
        user={user}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        nextHref={nextHref}
        nextText={nextText}
      />
    </LessonLayout>
  )
}
