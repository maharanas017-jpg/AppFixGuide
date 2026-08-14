import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { Guide } from '../types';

interface GuideDetailViewProps {
  guide: Guide;
  onBack: () => void;
}

export default function GuideDetailView({ guide, onBack }: GuideDetailViewProps) {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <button 
        onClick={onBack}
        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 mb-4"
      >
        ← {language === 'hi' ? 'गाइड सूची' : 'Back to Guides'}
      </button>

      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <span>{guide.category}</span>
          <span>•</span>
          <span>{guide.estimatedTime}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight">
          {language === 'hi' && guide.hindiTitle ? guide.hindiTitle : guide.title}
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm leading-relaxed">
          {language === 'hi' && guide.hindiSummary ? guide.hindiSummary : guide.summary}
        </p>
      </div>

      {/* Structured markdown text render fallback */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="prose dark:prose-invert max-w-none text-sm text-zinc-700 dark:text-zinc-300 space-y-4 whitespace-pre-wrap leading-relaxed">
          {guide.content}
        </div>
      </div>

      <div className="text-xs text-zinc-400 text-center mt-6">
        Last updated: {guide.lastUpdated} • Verified by AppFixGuide engineering team.
      </div>
    </div>
  );
}
