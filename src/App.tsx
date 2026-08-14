import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ThemeProvider, useAppTheme, AccentTheme } from './components/ThemeContext';
import HomeView from './views/HomeView';
import ErrorsListView from './views/ErrorsListView';
import ToolsView from './views/ToolsView';
import GuidesListView from './views/GuidesListView';
import SubmitErrorView from './views/SubmitErrorView';
import AiAnalyzerView from './views/AiAnalyzerView';
import ErrorDetailView from './views/ErrorDetailView';
import GuideDetailView from './views/GuideDetailView';
import AdminView from './views/AdminView';
import AboutView from './views/AboutView';
import PrivacyPolicyView from './views/PrivacyPolicyView';
import SupportView from './views/SupportView';
import { AndroidError, Guide } from './types';

function MainLayout() {
  const { t, language, setLanguage } = useLanguage();
  const { accentTheme, setAccentTheme, styles, darkMode, setDarkMode } = useAppTheme();
  
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedError, setSelectedError] = useState<AndroidError | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedError(null);
    setSelectedGuide(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectError = (err: AndroidError) => {
    setSelectedError(err);
    setSelectedGuide(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectGuide = (g: Guide) => {
    setSelectedGuide(g);
    setSelectedError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeOptions: { id: AccentTheme; colorClass: string; label: string }[] = [
    { id: 'emerald', colorClass: 'bg-emerald-500', label: 'Emerald' },
    { id: 'indigo', colorClass: 'bg-indigo-500', label: 'Indigo' },
    { id: 'amber', colorClass: 'bg-amber-500', label: 'Amber' },
    { id: 'rose', colorClass: 'bg-rose-500', label: 'Rose' },
    { id: 'violet', colorClass: 'bg-violet-500', label: 'Violet' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* Dynamic Top Announcement Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-zinc-900 to-indigo-950 text-white text-[11px] font-bold py-2 px-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span>Google Play targetSdk 34 & AAB compilations fully indexed for 2026.</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleNavigate('support')} className="hover:underline text-cyan-400 text-[10px]">
            Ask an Expert (Support Tickets)
          </button>
          <span>•</span>
          <button onClick={() => handleNavigate('about')} className="hover:underline text-zinc-300 text-[10px]">
            Our Timeline
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${styles.bg}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.955 11.955 0 00-1.721-5.147 11.955 11.955 0 00-5.789-5.484M3.382 5.984a11.955 11.955 0 001.721 5.147 11.955 11.955 0 005.789 5.484"></path>
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">AppFixGuide</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5">
          <button 
            onClick={() => handleNavigate('errors')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'errors' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            {t('errors')}
          </button>
          <button 
            onClick={() => handleNavigate('tools')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'tools' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            {t('tools')}
          </button>
          <button 
            onClick={() => handleNavigate('guides')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'guides' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            {t('guides')}
          </button>
          <button 
            onClick={() => handleNavigate('aiAnalyzer')}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition ${currentView === 'aiAnalyzer' ? `${styles.text} ${styles.bgSoft}` : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            ✨ AI Analyzer
          </button>
          <button 
            onClick={() => handleNavigate('submitError')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'submitError' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            Submit
          </button>
          <button 
            onClick={() => handleNavigate('support')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'support' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            Support
          </button>
          <button 
            onClick={() => handleNavigate('about')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'about' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNavigate('privacy')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'privacy' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            Privacy
          </button>
          <button 
            onClick={() => handleNavigate('admin')}
            className={`text-xs font-bold uppercase tracking-wider transition ${currentView === 'admin' ? styles.text : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
          >
            Admin
          </button>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

          {/* Interactive Multi-Color Palette Selector */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 dark:bg-zinc-950 rounded-full border border-zinc-200 dark:border-zinc-800">
            {themeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccentTheme(opt.id)}
                title={`Switch to ${opt.label} Theme`}
                className={`w-4 h-4 rounded-full transition ${opt.colorClass} ${accentTheme === opt.id ? 'ring-2 ring-offset-2 ring-zinc-400 dark:ring-offset-zinc-900 scale-125' : 'hover:scale-110'}`}
              ></button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

          {/* Dark Mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Localization Toggle */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400">
            <button 
              onClick={() => setLanguage('en')}
              className={`transition cursor-pointer ${language === 'en' ? `${styles.text} font-extrabold` : 'hover:text-zinc-600'}`}
            >
              EN
            </button>
            <span>|</span>
            <button 
              onClick={() => setLanguage('hi')}
              className={`transition cursor-pointer ${language === 'hi' ? `${styles.text} font-extrabold` : 'hover:text-zinc-600'}`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Accent picker mobile */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-50 dark:bg-zinc-950 rounded-full border border-zinc-200">
            {themeOptions.slice(0, 3).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccentTheme(opt.id)}
                className={`w-3.5 h-3.5 rounded-full ${opt.colorClass} ${accentTheme === opt.id ? 'ring-1 ring-zinc-400' : ''}`}
              ></button>
            ))}
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className="text-sm">
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="flex items-center gap-1 text-xs font-bold text-zinc-400">
            <button 
              onClick={() => setLanguage('en')}
              className={`transition ${language === 'en' ? `${styles.text} font-extrabold` : ''}`}
            >
              EN
            </button>
            <span>|</span>
            <button 
              onClick={() => setLanguage('hi')}
              className={`transition ${language === 'hi' ? `${styles.text} font-extrabold` : ''}`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Subbar */}
      <div className="flex lg:hidden items-center justify-around bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-2.5 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 overflow-x-auto gap-3">
        <button onClick={() => handleNavigate('errors')} className={currentView === 'errors' ? styles.text : ''}>{t('errors')}</button>
        <button onClick={() => handleNavigate('tools')} className={currentView === 'tools' ? styles.text : ''}>{t('tools')}</button>
        <button onClick={() => handleNavigate('guides')} className={currentView === 'guides' ? styles.text : ''}>{t('guides')}</button>
        <button onClick={() => handleNavigate('aiAnalyzer')} className={currentView === 'aiAnalyzer' ? styles.text : ''}>AI</button>
        <button onClick={() => handleNavigate('submitError')} className={currentView === 'submitError' ? styles.text : ''}>Submit</button>
        <button onClick={() => handleNavigate('support')} className={currentView === 'support' ? styles.text : ''}>Support</button>
        <button onClick={() => handleNavigate('about')} className={currentView === 'about' ? styles.text : ''}>About</button>
        <button onClick={() => handleNavigate('privacy')} className={currentView === 'privacy' ? styles.text : ''}>Privacy</button>
        <button onClick={() => handleNavigate('admin')} className={currentView === 'admin' ? styles.text : ''}>Admin</button>
      </div>

      {/* Main View Render Router */}
      <div className="flex-1 flex flex-col">
        {selectedError ? (
          <ErrorDetailView 
            error={selectedError} 
            onSelectError={selectError}
            onBack={() => setSelectedError(null)} 
          />
        ) : selectedGuide ? (
          <GuideDetailView 
            guide={selectedGuide} 
            onBack={() => setSelectedGuide(null)} 
          />
        ) : (
          <>
            {currentView === 'home' && <HomeView onSelectError={selectError} onNavigate={handleNavigate} />}
            {currentView === 'errors' && <ErrorsListView onSelectError={selectError} />}
            {currentView === 'tools' && <ToolsView />}
            {currentView === 'guides' && <GuidesListView onSelectGuide={selectGuide} />}
            {currentView === 'aiAnalyzer' && <AiAnalyzerView />}
            {currentView === 'submitError' && <SubmitErrorView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'privacy' && <PrivacyPolicyView />}
            {currentView === 'support' && <SupportView />}
            {currentView === 'admin' && <AdminView />}
          </>
        )}
      </div>

      {/* Navigation Footer */}
      <footer className="px-8 py-8 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row items-center justify-between text-xs text-zinc-500 font-medium gap-6 transition-colors duration-300">
        <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
          <p className="font-extrabold text-zinc-800 dark:text-zinc-200">AppFixGuide Diagnostic Portal</p>
          <p className="text-[11px] text-zinc-400 max-w-sm">{t('footerCopyright')}</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <button onClick={() => handleNavigate('home')} className="hover:text-zinc-800 dark:hover:text-zinc-200">{t('home')}</button>
          <button onClick={() => handleNavigate('about')} className="hover:text-zinc-800 dark:hover:text-zinc-200">About Us</button>
          <button onClick={() => handleNavigate('privacy')} className="hover:text-zinc-800 dark:hover:text-zinc-200">Privacy Policy</button>
          <button onClick={() => handleNavigate('support')} className="hover:text-zinc-800 dark:hover:text-zinc-200">Support Desk</button>
          <button onClick={() => handleNavigate('tools')} className="hover:text-zinc-800 dark:hover:text-zinc-200">{t('tools')}</button>
          <button onClick={() => handleNavigate('guides')} className="hover:text-zinc-800 dark:hover:text-zinc-200">{t('guides')}</button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-150 dark:border-zinc-850 italic text-[10px] text-center lg:text-right max-w-xs">
          "Verified solutions for APK compile pipelines. Content and diagnostic services are open source."
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
}
