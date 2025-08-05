import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">ようこそ</h1>
          <p className="text-gray-300 mb-8">アルゴリズム学習プラットフォームへ</p>
        </div>
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            ログイン
          </Link>
          <Link
            href="/auth/signup"
            className="block w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
          >
            アカウント作成
          </Link>
        </div>
      </div>
    </div>
  )
}