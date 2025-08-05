'use client'

import Link from 'next/link';
import { useAllUserProgress } from '@/hooks/useUserProgress'

const applications = [
  {
    href: '/application/base1',
    title: '基礎I',
    description: 'アルゴリズムを考える基礎を学びます',
  },
  {
    href: '/application/base2',
    title: '基礎II',
    description: 'アルゴリズムを一人で考えられるようにします',
  },
  {
    href: '/application/base3',
    title: 'まとめ問題',
    description: '基礎IとIIの内容を総復習します',
  },
  {
    href: '/application/apply1',
    title: '応用I',
    description: 'アルゴリズムを応用して問題を解決します',
  },
  {
    href: '/application/apply2',
    title: '応用II',
    description: 'アルゴリズムを応用して情報Iを対策します',
  },
];

export default function ApplicationPage() {
  const { isCompleted, loading, error } = useAllUserProgress()

  if (loading) return <div className="text-center text-white py-8">読み込み中...</div>
  if (error) return <div className="text-center text-red-400 py-8">エラー: {error}</div>

  return (
    <div className="py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">アルゴリズム学習</h1>
        <p className="mt-4 text-lg text-gray-400">アルゴリズムの動作を視覚的に理解し、学習を深めましょう。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {applications.map((app) => (
          <Link key={app.href} href={app.href} className="group block relative p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20">
            {isCompleted(app.href) && (
              <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"></div>
            )}
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{app.title}</h2>
            <p className="text-gray-400">{app.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}