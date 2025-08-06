/* eslint-disable */
'use client';

import LessonContent from './LessonContent';

interface DocumentModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DocumentModal({ onClose, title, children }: DocumentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700 shadow-2xl shadow-blue-500/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">{title}</h1>
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}