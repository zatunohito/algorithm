import { Suspense } from 'react'
import ReviewCompleteButtonClient from './ReviewCompleteButtonClient'

interface ReviewCompleteButtonProps {
  lessonPath: string
}

export default function ReviewCompleteButton({ lessonPath }: ReviewCompleteButtonProps) {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ReviewCompleteButtonClient lessonPath={lessonPath} />
    </Suspense>
  )
}