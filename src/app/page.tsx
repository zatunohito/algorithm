export default function Home() {
  return (
    <div className="text-center py-16 sm:py-24">
      <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
        ようこそ、アルゴリズムの世界へ
      </h1>
      <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
        このアプリケーションは、ソートアルゴリズムをはじめとする、コンピュータサイエンスの基本的な概念を視覚的に学び、理解を深めるためのインタラクティブなツールです。
        <br />
        直感的な操作で、複雑なアルゴリズムがどのように動作するのかを一つ一つ確認できます。
        <br className="hidden sm:block" />
        さあ、ナビゲーションから興味のあるアルゴリズムを選んで、学びの旅を始めましょう。
      </p>
    </div>
  );
}
