import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { errorsDatabase, categories } from '../data/errors';
import { AndroidError } from '../types';

interface ErrorsListViewProps {
  onSelectError: (error: AndroidError) => void;
}

export default function ErrorsListView({ onSelectError }: ErrorsListViewProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: language === 'hi' ? 'सभी त्रुटियाँ' : 'All Errors' },
    ...Object.entries(categories).map(([key, value]) => ({ id: key, label: value }))
  ];

  const filtered = activeTab === 'all' 
    ? errorsDatabase 
    : errorsDatabase.filter(e => e.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {language === 'hi' ? 'सभी समीक्षा की गई एंड्रॉइड त्रुटियां' : 'All Reviewed Android Errors'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Select a category to filter common problems faced during sideloading, compiling, and store publication.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-150 dark:border-zinc-850 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((err) => (
            <div
              key={err.id}
              onClick={() => onSelectError(err)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 cursor-pointer transition shadow-sm flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                    {categories[err.category as keyof typeof categories]}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    err.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' :
                    err.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
                    'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                  }`}>
                    {err.difficulty}
                  </span>
                </div>
                
                <h3 className="font-bold text-base text-zinc-950 dark:text-white group-hover:text-emerald-600 transition leading-snug">
                  {language === 'hi' && err.hindiTitle ? err.hindiTitle : err.title}
                </h3>
                
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {language === 'hi' && err.hindiSummary ? err.hindiSummary : err.summary}
                </p>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 mt-4 pt-3 flex justify-between items-center text-xs text-zinc-400">
                <span>{t('estTime')}: {err.estimatedTime}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">
                  View Fix →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-500">
          {t('noResults')}
        </div>
      )}
    </div>
  );
}
