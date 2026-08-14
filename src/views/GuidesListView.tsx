import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { guides } from '../data/guides';
import { Guide } from '../types';

interface GuidesListViewProps {
  onSelectGuide: (guide: Guide) => void;
}

export default function GuidesListView({ onSelectGuide }: GuidesListViewProps) {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {language === 'hi' ? 'एंड्रॉइड डिबगिंग और यूजर गाइड' : 'Android Debugging & User Guides'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Complete step-by-step developer tutorials and user instructions on installing APK files and configuring SDK versions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.slug}
            onClick={() => onSelectGuide(guide)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 cursor-pointer transition shadow-sm flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                <span>{guide.category}</span>
                <span>{guide.estimatedTime}</span>
              </div>
              
              <h3 className="font-bold text-base text-zinc-950 dark:text-white group-hover:text-emerald-600 transition leading-snug">
                {language === 'hi' && guide.hindiTitle ? guide.hindiTitle : guide.title}
              </h3>
              
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {language === 'hi' && guide.hindiSummary ? guide.hindiSummary : guide.summary}
              </p>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 mt-4 pt-3 flex justify-between items-center text-xs text-zinc-400">
              <span>Updated: {guide.lastUpdated}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">
                Read Guide →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
