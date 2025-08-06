interface LoadingErrorProps {
  loading: boolean
  error: string | null
}

export default function LoadingError({ loading, error }: LoadingErrorProps) {
  if (loading) {
    return <div className="text-center text-white py-8">読み込み中...</div>
  }
  
  if (error) {
    return <div className="text-center text-red-400 py-8">エラー: {error}</div>
  }
  
  return null
}