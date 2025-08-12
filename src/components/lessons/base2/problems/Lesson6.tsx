'use client';

export default function Lesson6() {

  return (
    <>
      {/* Problem 1 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題1：ベースケースの特定</h3>
        <p className="text-gray-300 mb-4">以下の階乗を計算する再帰関数の擬似コードにおいて、「ベースケース」に相当するのはどの部分ですか？</p>
        <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
          <code>
            関数 factorial(n)<br />
            {'  '}もし n が 0 と等しい ならば<br />
            {'    '}返す 1<br />
            {'  '}終わり<br />
            {'  '}返す n * factorial(n - 1)<br />
            終わり
          </code>
        </pre>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> `もし n が 0 と等しい ならば` の条件分岐全体。</p>
            <p className="mt-2"><strong>理由:</strong> ベースケースは再帰呼び出しを停止させるための条件です。このコードでは、`n`が0になったときに再帰呼び出しを行わず、具体的な値 `1` を返すことで処理を終了させています。これがなければ、`n`は負の値になり、無限に自分自身を呼び出し続けてしまいます。</p>
          </div>
        </details>
      </div>

      {/* Problem 2 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題2：再帰のトレース</h3>
        <p className="text-gray-300 mb-4">問題1の `factorial` 関数を `factorial(3)` として呼び出した場合、最終的に返される値は何になりますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> 6</p>
            <p className="mt-2"><strong>理由:</strong> 関数の呼び出しは以下のように展開されます。</p>
            <ul className="list-disc pl-6 mt-2 text-sm font-mono">
              <li>factorial(3) は 3 * factorial(2) を返す</li>
              <li>factorial(2) は 2 * factorial(1) を返す</li>
              <li>factorial(1) は 1 * factorial(0) を返す</li>
              <li>factorial(0) は 1 を返す (ベースケース)</li>
            </ul>
            <p className="mt-2">結果は逆順に計算され、`1 * 1 = 1`、`2 * 1 = 2`、`3 * 2 = 6` となり、最終的に `6` が返されます。</p>
          </div>
        </details>
      </div>

      {/* Problem 3 */}
      <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mt-0 mb-4">問題3：無限再帰</h3>
        <p className="text-gray-300 mb-4">再帰関数において、ベースケースを定義し忘れるとどのような問題が発生しますか？</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">答えを見る</summary>
          <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
            <p><strong>答え:</strong> 無限再帰（または無限ループ）</p>
            <p className="mt-2"><strong>理由:</strong> ベースケースは再帰を停止させるための「ブレーキ」の役割を果たします。もしベースケースがなければ、関数は停止することなく自分自身を呼び出し続けます。これにより、プログラムが使用できるメモリを使い果たしてしまい、最終的には「スタックオーバーフロー」というエラーを引き起こしてクラッシュします。</p>
          </div>
        </details>
      </div>
    </>
  );
}
