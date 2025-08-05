'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Header() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/1753592922455.png"
            alt="Algorithm Visualizer Logo"
            width={180}
            height={40}
            priority
            className="invert"
          />
        </Link>
        <nav className="font-mono flex items-center space-x-4">
          <Link href="/application" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300">
            アプリ
          </Link>
          {user ? (
            <Link
              href="/mypage"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {user.email?.split('@')[0]}
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}