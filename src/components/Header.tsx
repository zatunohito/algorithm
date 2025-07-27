import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          {/* public/1753592922455.png に画像ファイルを配置してください */}
          <Image
            src="/1753592922455.png"
            alt="Algorithm Visualizer Logo"
            width={180} // 元の画像のアスペクト比に合わせて調整してください
            height={40} // 元の画像のアスペクト比に合わせて調整してください
            priority
            className="invert"
          />
        </Link>
        <nav className="font-mono">
          <Link href="/sorting" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300">
            Sorting
          </Link>
        </nav>
      </div>
    </header>
  );
}