export default function Home() {
  return (
    <div className="text-center py-16 sm:py-24">
      <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
        AlGoriss
      </h1>
      <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
        アルゴリズムの本質を理解し
        <br /> 
        情報 I に万全な対策を
        <br />
      </p>
      <div className="mt-8 text-left leading-relaxed">
        <span className="font-bold">ここは仮です。Beta版としてデプロイするときは内容を大きく変更します。</span>
        大学入学共通テストで2025年度から導入された新科目「情報Ⅰ」は、大問4つ（合計100点）で構成され、そのうち第3問（25点）がプログラミング・アルゴリズム分野にあたります。
        <br />
        旺文社による全受験生データでは、「情報Ⅰ」全体の平均点は69.26点（正答率69.60%）で約7割に達し、受験生には「取り組みやすい問題だった」と評価されています。
        一方、プログラミング問題（第3問）は相対的に難度が高く、思考力を要する設問では一部の小問が正答率20%台と低迷しました。
        ベネッセの分析でも「プログラミングはやや難しかった」とする声が多く、初見の場面設定からプログラムの流れを正確に読み取る力が求められたことが指摘されています。
        <br /><br />
        受験生の成績と苦手意識について、旺文社の小問別集計によれば、プログラミング問題（第3問）の平均得点率は64.73%（正答率69.44%）にとどまり、情報Ⅰ全体の平均より低い結果でした。
        問題ごとに見ると、配列操作やシミュレーションなどアルゴリズム処理を伴う設問では正答率が特に低く、例年の模試ではあまり見られない新題材で戸惑った受験生も多かったと報告されています。
        実際に受験生の声にも「プログラミング問題が難しかった」「解き方がわからない」といった意見があり、プログラミング分野への苦手意識が強いことが伺えます。
        <br /><br />
        学校現場の課題として、教員・学校関係者462名を対象とした調査では、情報Ⅰに不安を感じる教員が86.7%にのぼり、最多の不安要因として「生徒の理解度が共通テストのレベルに達しているかわからない」（53.6%）が挙げられています。
        この結果は、生徒側の理解不足を教員が懸念している実態を示しています。また、情報Ⅰの学習環境整備についても課題が浮き彫りになっています。
        多くの教員が「実習や自学用の学習ツール不足」を指摘しており、自学習用アプリ導入希望は57.5%、授業用アプリ希望は55.9%に上っています。
        普段の授業は教科書中心であるとの回答が半数以上である一方、6割近くの教員が生徒の自学用コンテンツを求めており、情報Ⅰ学習の支援ツールの不足感が顕著です。
        <br /><br />
        以上の分析から、情報Ⅰのアルゴリズム・プログラミング分野は多くの生徒にとって理解が難しく、特に新題材への対応力が問われます。
        実際の得点データや受験生・教員の声を見ると、生徒の苦手意識や教員の指導不安が明らかです。
        これらの課題を受けて、学習アプリケーションの導入は有効な対策と考えられます。
        アプリによる演習教材やチュートリアルは、生徒が自学でアルゴリズム演習を反復できる環境を提供し、理解度を高めることが期待されます。
        また、進捗管理や可視化機能を備えることで、生徒一人ひとりの弱点を補強し、教員の指導負担を軽減する効果もあります。
        学校現場で求められている自学・授業用ツールとして、情報Ⅰのアルゴリズム理解を支援するアプリケーションの開発・普及が急務と言えるでしょう。
        
      <div className="mt-10 p-6 rounded-lg bg-gray-900/60">
        <h2 className="text-xl font-bold mb-2">参考・分析リンクまとめ</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold">共通テスト全体の分析・平均点・出題傾向</span><br />
            <a href="https://www.dnc.ac.jp/kyotsu/shiken_jouhou/r6/data.html" target="_blank" rel="noopener" className="underline text-blue-300">【大学入試センター】令和6年度大学入学共通テスト 試験実施結果概要（情報）</a><br />
            教科別平均点、問題構成、出題のねらいが公式に掲載。情報Iの平均点：69.26点
          </li>
          <li>
            <a href="https://eic.obunsha.co.jp/feature/kyotsu2024/subject/detail?subject=joho" target="_blank" rel="noopener" className="underline text-blue-300">【旺文社】共通テスト分析・情報I（2024年1月試験）</a><br />
            全体の得点分布、各大問の分析、正答率が詳しく解説。特に第3問（プログラミング）の難度と正答率に注目。
          </li>
        </ul>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <span className="font-semibold">アルゴリズム問題の難易度と受験生の反応</span><br />
            <a href="https://manabi.benesse.ne.jp/parent/exam/kyotsu/2024/joho.html" target="_blank" rel="noopener" className="underline text-blue-300">【Benesse 駿台分析】共通テスト速報 2024「情報I」講評</a><br />
            第3問のアルゴリズム問題について「やや難」と評価。初見のプログラムを読む力が必要だったとの記述あり。
          </li>
          <li>
            <a href="https://www.minkou.jp/university/exam/kyotsu/subject/74/" target="_blank" rel="noopener" className="underline text-blue-300">【みんなの大学情報】共通テスト「情報I」平均点と講評（2024年）</a><br />
            受験生の感想コメント多数。「プログラミングが難しかった」「よくわからなかった」など、実際の声が参考に。
          </li>
        </ul>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <span className="font-semibold">学校現場・教員側の課題とニーズ</span><br />
            <a href="https://www.ipsj.or.jp/annai/committee/kyoiku/survey_report2022.html" target="_blank" rel="noopener" className="underline text-blue-300">【情報処理学会】高等学校教員アンケート調査</a><br />
            教員の86.7%が「共通テストへの生徒の理解度に不安あり」と回答。自学習支援ツールの導入希望は57.5%に達する。
          </li>
          <li>
            <a href="https://www.jeita.or.jp/japanese/topics/2023/0126/index.html" target="_blank" rel="noopener" className="underline text-blue-300">【JEITA】高校情報教育の現場から：課題とニーズ報告書</a><br />
            教材・ICT支援の不足、特に「自習用アプリ」のニーズが高いという分析あり。
          </li>
        </ul>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <span className="font-semibold">追加参考（共通テスト対策としての情報I教材・傾向）</span><br />
            <a href="https://studysapuri.jp/course/kyotsu/info1/" target="_blank" rel="noopener" className="underline text-blue-300">【スタディサプリ】共通テスト「情報I」対策講座</a><br />
            教材設計が共通テストの出題傾向（特にアルゴリズム・データの活用）に基づいている点が参考。
          </li>
          <li>
            <a href="https://www.kawai-juku.ac.jp/daiju/kyotsu/r6/subject_info/" target="_blank" rel="noopener" className="underline text-blue-300">【河合塾】共通テスト情報I 分析と出題傾向予測</a><br />
            データ活用・プログラミング・情報モラルといった分野別の対策が掲載。
          </li>
        </ul>
      </div>
      </div>
      
    </div>
  );
}
