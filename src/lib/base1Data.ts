import Lesson4 from '@/components/lessons/base1/Lesson4';
import Lesson5 from '@/components/lessons/base1/Lesson5';
import Lesson6 from '@/components/lessons/base1/Lesson6';

export type Content = {
  type: 'paragraph' | 'header' | 'list' | 'code' | 'problem' | 'flowchart-box';
  text?: string;
  title?: string;
  items?: string[];
  code?: string;
  description?: string;
  answer?: string;
  explanation?: string;
  content?: string;
};

export const base1Lessons: {
    [key: string]: {
        title: string;
        subtitle: string;
        component?: React.ComponentType;
        content?: Content[];
        nextLesson?: string;
        prevLesson?: string;
    }
} = {
  '1': {
    title: '開始と終了',
    subtitle: 'プログラムの基本的な構造である開始と終了について学びます。',
    content: [
      { type: 'paragraph', text: 'すべてのプログラムやアルゴリズムには、明確な「開始」と「終了」があります。これは、処理がどこから始まり、どこで終わるのかを定義する、最も基本的なルールです。' },
      { type: 'header', title: '「開始」とは？' },
      { type: 'paragraph', text: '「開始」は、プログラムが実行される最初のポイントです。ここから処理が順番に実行されていきます。フローチャート（流れ図）では、通常、角の丸い四角形で「開始」または「Start」と書かれた記号で表されます。' },
      { type: 'paragraph', text: 'この「開始」のステップがあることで、コンピュータはどこから命令を読み解けばよいのかを正確に理解できます。' },
      { type: 'flowchart-box', title: 'フローチャートの例：開始記号', content: '開始' },
      { type: 'header', title: '「終了」とは？' },
      { type: 'paragraph', text: '「終了」は、プログラムのすべての処理が完了し、停止するポイントです。これ以降、コンピュータはそのプログラムに関する処理を行いません。フローチャートでは、「開始」と同じく角の丸い四角形で「終了」または「End」と書かれた記号で表されます。' },
      { type: 'paragraph', text: '「終了」が明確に定義されていることで、プログラムが無限に動き続ける（無限ループ）のを防ぎ、意図した通りに処理を終えることができます。' },
      { type: 'flowchart-box', title: 'フローチャートの例：終了記号', content: '終了' },
      { type: 'header', title: 'なぜ重要なのか？' },
      { type: 'paragraph', text: '「開始」と「終了」は、プログラムの全体像を把握するための道しるべです。' },
      { type: 'list', items: [
        '<strong class="text-white">構造の明確化:</strong> プログラムの流れがどこから始まり、どこで終わるのかがはっきりします。',
        '<strong class="text-white">予測可能性:</strong> プログラムが必ず終了することが保証され、意図しない動作を防ぎます。',
        '<strong class="text-white">デバッグの容易さ:</strong> 問題が発生した際に、処理の開始点と終了点が分かっていると、原因の特定がしやすくなります。'
      ]},
      { type: 'paragraph', text: 'どんなに複雑なアルゴリズムでも、この「開始」から「終了」までの一連の流れの中に記述されます。まずはこの基本構造をしっかりと理解しましょう。' }
    ],
    nextLesson: '2',
  },
  '2': {
    title: '変数と定数',
    subtitle: 'データを一時的に保存するための変数と、変更されない値を扱う定数を学びます。',
    content: [
      { type: 'paragraph', text: 'プログラムでは、数値や文字列などのデータを一時的に保存しておく場所が必要です。その役割を果たすのが「変数」と「定数」です。これらは、データに名前をつけて管理するための「箱」のようなものだと考えてください。' },
      { type: 'header', title: '「変数」とは？' },
      { type: 'paragraph', text: '「変数」は、中身を後から変更できる箱です。例えば、ゲームのスコアのように、処理の途中で値が変わる可能性のあるデータを保存するのに使います。' },
      { type: 'code', title: 'コードの例：変数', code: '変数 score = 80  // scoreという名前の変数に80を保存<br />出力: score      // 80が出力される<br /><br />score = 95      // scoreの中身を95に変更<br />出力: score      // 95が出力される' },
      { type: 'header', title: '「定数」とは？' },
      { type: 'paragraph', text: '「定数」は、一度中身を入れたら変更できない箱です。円周率（π）のように、プログラムの実行中に変わることのない値を保存するのに使います。' },
      { type: 'paragraph', text: '値を変更しないことを明確にすることで、意図しない書き換えを防ぎ、コードが読みやすく安全になります。' },
      { type: 'code', title: 'コードの例：定数', code: '定数 PI = 3.14  // PIという名前の定数に3.14を保存<br />出力: PI       // 3.14が出力される' },
      { type: 'header', title: '問題' },
      { type: 'paragraph', text: '下のコードは正しく実行され、結果が出力されるでしょうか？それともエラーになるでしょうか？' },
      { type: 'problem', title: 'このコードはエラーが出るか出ないか', code: '定数 ありがとう = 39<br />ありがとう = 50<br />出力 : ありがとう', answer: 'エラーになる', explanation: '「ありがとう」は「定数」として宣言されているため、一度39を代入した後に50を再代入しようとするとエラーが発生します。定数は後から値を変更することができません。' }
    ],
    prevLesson: '1',
    nextLesson: '3',
  },
  '3': {
    title: '条件分岐',
    subtitle: '「もし〜ならば」という条件に応じて処理を分ける方法を学びます。',
    content: [
        { type: 'paragraph', text: 'プログラムは、常に同じ順番で実行されるだけではありません。特定の「条件」が満たされているかどうかによって、実行する処理を変えることができます。これを「条件分岐」と呼びます。' },
        { type: 'header', title: 'もし〜ならば (if文)' },
        { type: 'paragraph', text: '最も基本的な条件分岐は「もし（if）条件が正しいならば、この処理をする」という形です。フローチャートでは、ひし形の記号を使って条件を表します。' },
        { type: 'code', title: 'コードの例：if文', code: '変数 age = 20<br />もし age が 18 以上 ならば<br />  出力: &quot;成人です&quot;<br />終わり', description: 'この例では、変数`age`が18以上なので、「成人です」と出力されます。' },
        { type: 'header', title: 'そうでなければ (else)' },
        { type: 'paragraph', text: '「もし条件が正しくなければ、代わりにこちらの処理をする」という場合、「そうでなければ（else）」を使います。' },
        { type: 'code', title: 'コードの例：if-else文', code: '変数 score = 75<br />もし score が 80 以上 ならば<br />  出力: &quot;合格&quot;<br />そうでなければ<br />  出力: &quot;不合格&quot;<br />終わり', description: 'この例では、`score`が80未満なので、「不合格」と出力されます。' },
        { type: 'header', title: 'さらに他の条件も (else if)' },
        { type: 'paragraph', text: '複数の条件で分岐させたい場合は、「そうでなく、もし（else if）」を使って条件を追加できます。' },
        { type: 'code', title: 'コードの例：if-else if-else文', code: '変数 time = 14<br />もし time が 12 より小さい ならば<br />  出力: &quot;午前&quot;<br />そうでなく、もし time が 18 より小さい ならば<br />  出力: &quot;午後&quot;<br />そうでなければ<br />  出力: &quot;夜&quot;<br />終わり', description: 'この例では、`time`は12以上かつ18未満なので、「午後」と出力されます。' },
        { type: 'header', title: '問題' },
        { type: 'problem', title: '問題1：何が出力される？', code: '変数 x = 10<br />もし x > 5 ならば<br />  x = x + 5<br />終わり<br />出力: x', answer: '15', explanation: '条件 `x > 5` (10は5より大きい) が真なので、if文の中の `x = x + 5` が実行され、xは15になります。' },
        { type: 'problem', title: '問題2：何が出力される？', code: '変数 temperature = 28<br />もし temperature >= 30 ならば<br />  出力: &quot;エアコンをつける&quot;<br />そうでなければ<br />  出力: &quot;窓を開ける&quot;<br />終わり', answer: '窓を開ける', explanation: '条件 `temperature >= 30` (28は30以上) が偽なので、`そうでなければ` (else) のブロックが実行されます。' }
    ],
    prevLesson: '2',
    nextLesson: '4',
  },
  '4': {
    title: '繰り返し',
    subtitle: '同じ処理を何度も実行するための基本的なループ処理を学びます。',
    component: Lesson4,
    prevLesson: '3',
    nextLesson: '5',
  },
  '5': {
    title: '配列',
    subtitle: '複数のデータをまとめて扱うための配列の基本を学びます。',
    component: Lesson5,
    prevLesson: '4',
    nextLesson: '6',
  },
  '6': {
    title: '関数',
    subtitle: '処理をひとまとめにし、再利用可能にする関数の使い方を学びます。',
    component: Lesson6,
    prevLesson: '5',
  },
};