import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';

interface AnalysisResult {
  title: string;
  meaning: string;
  cause: string;
  steps: string[];
  alternatives: string[];
  prevention: string[];
  related: string[];
  isFallback: boolean;
}

export default function AiAnalyzerView() {
  const { t, language } = useLanguage();
  const { styles } = useAppTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [deviceVersion, setDeviceVersion] = useState('');
  const [appType, setAppType] = useState('Native Java/Kotlin');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorMessage.trim()) {
      alert('Please enter an error or stacktrace to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          errorMessage,
          deviceVersion,
          appType,
          description
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error state.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to complete analysis. Please retry shortly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
          ✨ {t('aiTitle')}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          {t('aiSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form panel */}
        <form onSubmit={handleAnalyze} className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Error Log / Logcat Exception *
            </label>
            <textarea 
              rows={6} required value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)}
              className="w-full font-mono text-[11px] p-3 border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={t('aiPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Device (e.g. Pixel 7, Android 14)
            </label>
            <input 
              type="text" value={deviceVersion} onChange={(e) => setDeviceVersion(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Samsung Galaxy S23, API 33"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Framework Stack
            </label>
            <select 
              value={appType} onChange={(e) => setAppType(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Native Java/Kotlin">Native Java/Kotlin</option>
              <option value="WebView Container / Hybrid">WebView Container / Hybrid</option>
              <option value="React Native">React Native</option>
              <option value="Flutter">Flutter</option>
              <option value="Unity Game Wrapper">Unity Game Wrapper</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              User Description (What triggers it?)
            </label>
            <textarea 
              rows={2} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Occurs immediately when compiling the release build variant."
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-xl text-xs transition shadow-md ${styles.bg} ${styles.bgHover} ${styles.shadow}`}
          >
            {loading ? t('aiAnalyzing') : t('aiAnalyzeBtn')}
          </button>
        </form>

        {/* Results/Reports Display Panel */}
        <div className="lg:col-span-7 space-y-6">
          {loading && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-8 rounded-2xl text-center space-y-4">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{t('aiAnalyzing')}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Gemini is looking up known compiler schemas and Android SDK policies...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/25 border border-red-200 text-red-700 dark:text-red-400 text-xs font-bold rounded-xl">
              ⚠ {error}
            </div>
          )}

          {!loading && !result && !error && (
            <div className="border border-dashed border-zinc-300 dark:border-zinc-850 p-8 text-center text-zinc-500 dark:text-zinc-400 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-4xl block mb-2">🤖</span>
              <span className="font-bold block text-zinc-700 dark:text-zinc-300">Ready to Analyze</span>
              <span className="text-xs">Paste your stacktrace and get comprehensive debugging steps instantly.</span>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Report Intro */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b pb-3 border-zinc-100 dark:border-zinc-850">
                  <h3 className="font-bold text-lg text-zinc-950 dark:text-white">{result.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles.bgSoft}`}>
                    {result.isFallback ? 'LOCAL HEURISTICS' : 'GEMINI 3.7'}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">What it means:</span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{result.meaning}</p>
                </div>

                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Likely cause:</span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{result.cause}</p>
                </div>
              </div>

              {/* Action Steps */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white border-b pb-2 mb-4 uppercase tracking-wider text-xs text-zinc-400">
                  Verified Action Steps (Fixes)
                </h4>
                <div className="space-y-4">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <div className={`w-6 h-6 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${styles.bg}`}>
                        {idx + 1}
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prevention & Fallback notices */}
              {(result.prevention?.length > 0 || result.isFallback) && (
                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl p-6 space-y-4 shadow-sm text-xs">
                  {result.prevention?.length > 0 && (
                    <div>
                      <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1 uppercase text-[10px] tracking-wide">Prevention Tips:</span>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {result.prevention.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.isFallback && (
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-zinc-400">
                      ℹ️ {t('aiOfflineFallback')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
