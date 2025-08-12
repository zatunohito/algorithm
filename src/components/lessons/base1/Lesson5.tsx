'use client'

import SectionHeader from '@/components/lesson/SectionHeader';
import CodeExample from '@/components/lesson/CodeExample';

export default function Lesson5() {
  return (
    <>
      <p>
        配列は、複数の値をまとめて管理するためのデータ構造です。同じ種類のデータ（数値、文字列など）をリストのように並べて保存できます。
      </p>

      <SectionHeader title="配列の宣言と初期化" />
      <p>
        配列を宣言するには、角括弧 <code>[]</code> を使用します。
      </p>
      <CodeExample
        title="配列の宣言"
        code={'let numbers = [1, 2, 3, 4, 5];<br />let fruits = ["apple", "banana", "cherry"];'}
      />

      <SectionHeader title="要素へのアクセス" />
      <p>
        配列の各要素には、インデックス（0から始まる番号）を使ってアクセスします。
      </p>
      <CodeExample
        title="インデックスによるアクセス"
        code={'console.log(numbers[0]); // 1<br />console.log(fruits[1]); // "banana"'}
      />

      <SectionHeader title="配列の長さ" />
      <p>
        <code>length</code> プロパティで、配列の要素数を取得できます。
      </p>
      <CodeExample
        title="lengthプロパティ"
        code={'console.log(numbers.length); // 5'}
      />

      <SectionHeader title="配列の操作" />
      <p>
        配列には、要素を追加、削除、検索するための様々なメソッドが用意されています。
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li><code>push()</code>: 末尾に要素を追加</li>
        <li><code>pop()</code>: 末尾の要素を削除</li>
        <li><code>shift()</code>: 先頭の要素を削除</li>
        <li><code>unshift()</code>: 先頭に要素を追加</li>
        <li><code>indexOf()</code>: 要素を検索してインデックスを返す</li>
      </ul>

      <p className="mt-4">
        これらの基本を理解することで、より複雑なデータ操作が可能になります。
      </p>
    </>
  );
};
