'use client'

import Link from 'next/link'

interface PostAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  isBlocking?: boolean
}

export default function PostAssessmentModal({ isOpen, onClose, isBlocking = false }: PostAssessmentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">おめでとうございます！</h2>
          <p className="text-gray-300 mb-6">
            基礎IIと応用Iの50%以上を達成しました！<br />
            {isBlocking ? 'アンケートに回答して続きを解放してください。' : '学習の成果を教えてください。'}
          </p>
          <div className="space-y-3">
            <Link
              href="/application/assessment/after"
              className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              アンケートに回答する
            </Link>
            {!isBlocking && (
              <button
                onClick={onClose}
                className="block w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                後で回答する
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}