/* eslint-disable */

import Link from 'next/link';

const lessons = [
  {
    href: '/application/base2/1',
    title: '線形探索',
    description: '配列の先頭から順番に目的の値を探す基本的な探索アルゴリズムです。',
  },
  {
    href: '/application/base2/2',
    title: '二分探索',
    description: 'ソート済みの配列から高速に目的の値を探す効率的な探索アルゴリズムです。',
  },
  {
    href: '/application/base2/3',
    title: 'バブルソート',
    description: '隣り合う要素を比較・交換しながら全体を整列させる基本的なソートアルゴリズムです。',
  },
  {
    href: '/application/base2/4',
    title: '選択ソート',
    description: '未整列部分から最小値（または最大値）を見つけて整列済み部分に追加していくソートです。',
  },
  {
    href: '/application/base2/5',
    title: '挿入ソート',
    description: '整列済みの部分に新しい要素を適切な位置に挿入していくことで全体を整列させます。',
  },
  {
    href: '/application/base2/6',
    title: '再帰',
    description: '関数が自分自身を呼び出すことで問題を解決する強力なプログラミング手法です。',
  },
];

export default function Base2Page() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/application" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <span>&larr; アプリケーション一覧に戻る</span>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">基礎II</h1>
          <p className="mt-4 text-lg text-gray-400">アルゴリズムを一人で考えられるようにします</p>
          <p className="mt-4 text-gray-400">ノートを一冊用意してください。 <br /> ここからはノートを使いながら学習を進めていきます。</p>
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