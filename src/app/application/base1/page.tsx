/* eslint-disable */
import Link from 'next/link';

const lessons = [
  {
    href: '/application/base1/1',
    title: '開始と終了',
    description: 'プログラムの基本的な構造である開始と終了について学びます。',
  },
  {
    href: '/application/base1/2',
    title: '変数と定数',
    description: 'データを一時的に保存するための変数と、変更されない値を扱う定数を学びます。',
  },
  {
    href: '/application/base1/3',
    title: '条件分岐',
    description: '「もし〜ならば」という条件に応じて処理を分ける方法を学びます。',
  },
  {
    href: '/application/base1/4',
    title: '繰り返し',
    description: '同じ処理を何度も実行するための基本的なループ処理を学びます。',
  },
  {
    href: '/application/base1/5',
    title: '配列',
    description: '複数のデータをまとめて扱うための配列の基本を学びます。',
  },
  {
    href: '/application/base1/6',
    title: '関数',
    description: '処理をひとまとめにし、再利用可能にする関数の使い方を学びます。',
  },
];

export default function Base1Page() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/application" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; アプリケーション一覧に戻る</span>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">基礎I</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムを考える基礎を学びます。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className="group block p-6 bg-gray-900/60 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20">
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{lesson.title}</h2>
              <p className="text-gray-400">{lesson.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}