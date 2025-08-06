/* eslint-disable */
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DocumentModal from './DocumentModal';
import { createClient } from '@supabase/supabase-js';
import ReviewCompleteButton from '@/components/ReviewCompleteButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ProblemPageLayoutProps {
  backLink: string;
  backLinkText: string;
  pageTitle: string;
  pageDescription: string;
  documentTitle: string;
  lessonPath: string;
  nextLessonLink: string;
  nextLessonTitle: string;
  children: React.ReactNode;
  lessonContent: React.ReactNode;
}

export default function ProblemPageLayout({
  backLink,
  backLinkText,
  pageTitle,
  pageDescription,
  documentTitle,
  lessonPath,
  nextLessonLink,
  nextLessonTitle,
  children,
  lessonContent,
}: ProblemPageLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data } = await supabase
          .from('user_progress')
          .select('lesson_path')
          .eq('user_id', user.id)
          .eq('lesson_path', lessonPath)
          .single();
        
        setIsCompleted(!!data);
      }
    };
    getUser();
  }, [lessonPath]);

  const handleComplete = async () => {
    if (!user) return;
    
    if (isCompleted) {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('lesson_path', lessonPath);
      setIsCompleted(false);
    } else {
      await supabase
        .from('user_progress')
        .upsert({ user_id: user.id, lesson_path: lessonPath });
      setIsCompleted(true);
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href={backLink} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <span>&larr; {backLinkText}</span>
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors shadow-md">
            ドキュメントを見る
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{pageTitle}</h1>
          <p className="mt-4 text-lg text-gray-400">{pageDescription}</p>
        </div>

        <div className="space-y-8">
          {children}
        </div>

        <div className="mt-12 text-center space-y-4">
          {user && (
            <button
              onClick={handleComplete}
              className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
                isCompleted 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
            >
              {isCompleted ? '✓ 完了済み（クリックで解除）' : 'レッスンを完了する'}
            </button>
          )}
          <div>
            <Link href={nextLessonLink} className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                次のレッスンへ：{nextLessonTitle} &rarr;
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && <DocumentModal onClose={() => setIsModalOpen(false)} title={documentTitle}>{lessonContent}</DocumentModal>}
      <ReviewCompleteButton lessonPath={lessonPath} />
    </div>
  );
}