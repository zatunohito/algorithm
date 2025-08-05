export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-auto">
      <p>がんばろう！情報Ⅰ</p>
      <div className="container mx-auto p-4 text-center text-gray-400">
        <div className="flex justify-center space-x-6">
          <details className="group">
            <summary className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-300">
              一般お問い合わせ
            </summary>
            <div className="pt-2 text-sm">
              <p>ご質問、ご意見などございましたら、下記メールアドレスまでお気軽にお問い合わせください。</p>
              <p className="mt-1">Email: <a href="mailto:info-c@zatu.tokyo" className="text-blue-400 hover:underline">info-c(to consumer)@zatu.tokyo</a></p>
            </div>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-300">
              団体導入相談
            </summary>
            <div className="pt-2 text-sm">
              <p>学校、塾、その他教育機関での団体導入をご検討の際は、下記までご連絡ください。</p>
              <p className="mt-1">Email: <a href="mailto:info-b@zatu.tokyo" className="text-blue-400 hover:underline">info-b(to business)</a></p>
              <p className="mt-1">担当者より詳細をご案内させていただきます。</p>
            </div>
          </details>
        </div>
        <p className="mt-4 text-sm">&copy; 2025 AlGoriss. All rights reserved.</p>
      </div>
    </footer>
  );
}