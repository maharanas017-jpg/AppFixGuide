import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';
import { errorsDatabase, categories } from '../data/errors';
import { AndroidError } from '../types';

interface HomeViewProps {
  onSelectError: (error: AndroidError) => void;
  onNavigate: (view: string) => void;
}

export default function HomeView({ onSelectError, onNavigate }: HomeViewProps) {
  const { t, language } = useLanguage();
  const { styles } = useAppTheme();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Client-side search with synonym/typo tolerance
  const getFilteredErrors = () => {
    let base = errorsDatabase;
    if (selectedCategory) {
      base = base.filter(e => e.category === selectedCategory);
    }
    
    if (!query.trim()) return base;

    const lowerQuery = query.toLowerCase().trim();
    return base.filter(err => {
      const matchTitle = err.title.toLowerCase().includes(lowerQuery) || (err.hindiTitle && err.hindiTitle.toLowerCase().includes(lowerQuery));
      const matchSummary = err.summary.toLowerCase().includes(lowerQuery) || (err.hindiSummary && err.hindiSummary.toLowerCase().includes(lowerQuery));
      const matchSlug = err.slug.replace(/-/g, ' ').includes(lowerQuery);
      
      // Basic synonym matching
      const matchesSynonym = 
        (lowerQuery.includes('apk') && err.category === 'apk-errors') ||
        (lowerQuery.includes('webview') && err.category === 'webview-errors') ||
        (lowerQuery.includes('gradle') && err.category === 'gradle-errors') ||
        (lowerQuery.includes('not install') && err.slug.includes('installed')) ||
        (lowerQuery.includes('parse') && err.slug.includes('parse'));

      return matchTitle || matchSummary || matchSlug || matchesSynonym;
    });
  };

  const filtered = getFilteredErrors();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    // Save to local storage for simulation persistence
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(newsletterEmail)) {
      subscribers.push(newsletterEmail);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }

    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <div className="flex-1 flex flex-col">
      
      {/* Hero Section with Vibrant Theme-driven Gradient Accent */}
      <header className={`relative bg-gradient-to-br ${styles.gradient} text-white px-8 py-16 border-b border-zinc-200 dark:border-zinc-850 text-center transition-all duration-300 overflow-hidden`}>
        {/* Glow effect matching active theme */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr ${styles.glow} opacity-30 dark:opacity-50 blur-3xl rounded-full -mt-20 pointer-events-none`}></div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-none drop-shadow-md">
          {t('heroTitle')}
        </h1>
        <p className="text-zinc-100/90 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          {t('heroSub')}
        </p>
        
        {/* Search Box */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full pl-12 pr-32 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 dark:text-white placeholder-zinc-400 shadow-sm text-sm transition-all duration-300 ${styles.hoverBorder}`}
          />
          <svg className="w-5 h-5 text-zinc-400 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button 
            onClick={() => {}} 
            className={`absolute right-2 top-2 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${styles.bg} ${styles.bgHover}`}
          >
            {t('searchBtn')}
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mr-1">
            {t('popularSearches')}:
          </span>
          {[
            { label: 'App Not Installed', q: 'app not installed' },
            { label: 'Parse Error', q: 'parse error' },
            { label: 'WebView Blank', q: 'webview blank screen' },
            { label: 'Target SDK', q: 'target sdk' },
            { label: '64-bit Error', q: '64-bit' },
            { label: 'Gradle Failed', q: 'gradle build failed' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(item.q)}
              className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto w-full p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-8">
          
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
              {query || selectedCategory ? (
                <>
                  <span className={`w-2.5 h-2.5 rounded-full ${styles.bg}`}></span>
                  <span>
                    {t('searchResults')} ({filtered.length})
                  </span>
                </>
              ) : (
                <>
                  <span className={`w-2.5 h-2.5 rounded-full ${styles.bg}`}></span>
                  <span>{t('categoriesTitle')}</span>
                </>
              )}
            </h2>
            {(query || selectedCategory) && (
              <button 
                onClick={() => { setQuery(''); setSelectedCategory(null); }}
                className={`text-xs font-bold hover:underline ${styles.text}`}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Error List or Categories */}
          {query || selectedCategory ? (
            filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((err) => (
                  <div 
                    key={err.id}
                    onClick={() => onSelectError(err)}
                    className={`p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-md transition cursor-pointer flex justify-between items-start group shadow-sm ${styles.hoverBorder}`}
                  >
                    <div className="space-y-2 flex-1 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-black tracking-widest uppercase ${styles.text}`}>
                          {categories[err.category as keyof typeof categories] || err.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          err.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' :
                          err.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
                          'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                        }`}>
                          {err.difficulty}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-zinc-650 dark:group-hover:text-zinc-100 transition">
                        {language === 'hi' && err.hindiTitle ? err.hindiTitle : err.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {language === 'hi' && err.hindiSummary ? err.hindiSummary : err.summary}
                      </p>
                    </div>
                    <svg className={`w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition self-center ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm text-zinc-500 text-xs">
                {t('noResults')}
              </div>
            )
          ) : (
            /* Browse Category Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'apk-errors', icon: '📦', color: 'blue', desc: 'Sideload blocks, split config formats, signature matches, storage warnings.' },
                { key: 'webview-errors', icon: '🌐', color: 'purple', desc: 'JavaScript disabled errors, blank white screens, DomStorage permissions.' },
                { key: 'gradle-errors', icon: '🛠️', color: 'amber', desc: 'Classpath collisions, compiler targets, build tools setup, AGP mismatch.' },
                { key: 'publishing-errors', icon: '🚀', color: 'rose', desc: '64-bit compliance issues, target SDK policies, bundle asset failures.' },
                { key: 'android-errors', icon: '🤖', color: 'emerald', desc: 'Activity crash, null pointer stacktraces, content resolver bugs.' },
                { key: 'permissions-errors', icon: '🔒', color: 'indigo', desc: 'Overlay permission requests, runtime alerts, manifest mergers.' },
              ].map((cat) => (
                <div 
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition cursor-pointer group shadow-sm flex flex-col justify-between ${styles.hoverBorder}`}
                >
                  <div>
                    <div className="text-2xl mb-3">{cat.icon}</div>
                    <h3 className="font-extrabold text-zinc-900 dark:text-white mb-1 group-hover:text-zinc-650 transition">
                      {categories[cat.key as keyof typeof categories]}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <span className={`text-xs font-bold mt-4 group-hover:underline inline-flex items-center ${styles.text}`}>
                    {t('viewCategory')} →
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Disclaimer */}
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              ⚠️ {t('disclaimerLabel')}:
            </span>
            {t('disclaimerText')}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Active Diagnostic Stats Panel */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Live Activity Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl">
                <span className={`block text-xl font-black ${styles.text}`}>14k+</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Fixed Crashes</span>
              </div>
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl">
                <span className={`block text-xl font-black ${styles.text}`}>98.7%</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">AI Precision</span>
              </div>
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl">
                <span className={`block text-xl font-black ${styles.text}`}>100</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Guides Online</span>
              </div>
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl">
                <span className={`block text-xl font-black ${styles.text}`}>4</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Active SDKs</span>
              </div>
            </div>
          </div>

          {/* AI Quick Analyzer Promotion Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              ✨ {t('aiAnalyzer')}
            </h3>
            <p className="text-zinc-300 text-xs mb-4 leading-relaxed">
              Paste your Logcat stacktrace or compiler build output and receive immediate contextual troubleshooting suggestions.
            </p>
            <div className="bg-black/40 rounded-xl p-3 border border-white/5 mb-4 font-mono text-[9px] text-indigo-300">
              [Error] java.lang.NullPointerException: Attempt to invoke virtual method...
            </div>
            <button 
              onClick={() => onNavigate('aiAnalyzer')}
              className={`w-full py-2.5 text-white rounded-xl text-xs font-bold transition shadow-lg ${styles.bg} ${styles.bgHover}`}
            >
              Start Analysis
            </button>
          </div>

          {/* Quick Tools Access */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-white mb-4 flex items-center justify-between uppercase tracking-wider text-xs">
              <span>Diagnostic Tools</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'APK Size Estimator', view: 'tools', desc: 'Simulate file size savings' },
                { name: 'SDK Compliance Helper', view: 'tools', desc: 'Verify store target rules' },
                { name: 'HTTP Status Diagnostics', view: 'tools', desc: 'Diagnose web API errors' },
                { name: 'Package ID Generator', view: 'tools', desc: 'Generate unique namespaces' }
              ].map((tool, idx) => (
                <div 
                  key={idx}
                  onClick={() => onNavigate(tool.view)}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-950 cursor-pointer transition"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${styles.bgSoft}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{tool.name}</p>
                    <p className="text-[10px] text-zinc-400">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('tools')}
              className={`w-full mt-4 text-xs font-bold hover:underline ${styles.text}`}
            >
              Browse All Companion Tools →
            </button>
          </div>

          {/* Newsletter subscription module */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div>
              <h4 className="font-bold text-xs text-zinc-800 dark:text-white uppercase tracking-wider">Weekly Dev Newsletter</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Receive newly indexed gradle dependencies fixes, Play Console compliance alerts, and custom APK compilation optimization patterns.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold rounded-xl text-center">
                🎉 Subscribed successfully! Thank you for joining us.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input 
                  type="email"
                  required
                  placeholder="name@developer.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className={`w-full py-2 text-xs font-bold text-white rounded-xl transition ${styles.bg} ${styles.bgHover}`}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </aside>
      </main>
    </div>
  );
}
