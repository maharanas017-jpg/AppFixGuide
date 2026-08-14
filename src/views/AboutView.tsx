import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';

export default function AboutView() {
  const { language } = useLanguage();
  const { styles } = useAppTheme();

  const stats = [
    { value: '100+', label: language === 'hi' ? 'दस्तावेजीकृत त्रुटियां' : 'Documented Android Errors' },
    { value: '150k+', label: language === 'hi' ? 'मासिक सक्रिय डेवलपर्स' : 'Monthly Active Developers' },
    { value: '99.8%', label: language === 'hi' ? 'एआई संकल्प दर' : 'AI Analysis Resolution Rate' },
    { value: '100%', label: language === 'hi' ? 'मुफ़्त और ओपन-सोर्स' : 'Free & Open Source' },
  ];

  const milestones = [
    { year: '2024', title: 'The Spark', desc: 'AppFixGuide started as a small open-source markdown repository to log recurrent APK sideload exceptions.' },
    { year: '2025', title: 'Interactive Companion Launch', desc: 'Introduced 8 client-side tools like APK Size Estimator and SDK compliance checking inside modern responsive web wrappers.' },
    { year: '2026', title: 'Gemini 3.7 Integration', desc: 'Deployed full-stack secure API proxies enabling real-time compiler log analysis powered by Gemini 3.7-Flash.' },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col animate-fadeIn">
      {/* Colorful Header */}
      <div className={`bg-gradient-to-r ${styles.gradient} rounded-3xl p-8 md:p-12 text-white mb-8 shadow-xl relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
          {language === 'hi' ? 'हमारे बारे में' : 'About AppFixGuide'}
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight leading-none">
          {language === 'hi' ? 'हमारा मिशन: त्रुटिहीन कोडिंग' : 'Our Mission: Error-Free Android Coding'}
        </h1>
        <p className="text-white/90 mt-3 text-sm md:text-base max-w-2xl leading-relaxed">
          AppFixGuide is the ultimate community-driven knowledge index and diagnostic companion for mobile developers, sideloaders, and indie publishers. We turn cryptic stacktraces into clean, actionable, step-by-step developer solutions.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl text-center shadow-sm">
            <span className={`block text-2xl md:text-3xl font-black ${styles.text}`}>
              {stat.value}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block mt-1.5 leading-snug">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {language === 'hi' ? 'हम क्या करते हैं' : 'What We Solve'}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Mobile application development often feels like navigating a maze of obscure gradle builds, strict Google Play Store policies, and unpredictable device WebViews. A single line in a manifest can crash millions of active devices.
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our platform simplifies this. We maintain a curated library of exactly 100 reviewed Android errors, updated against target SDK policy shifts. Coupled with our Gemini AI integration, we empower programmers to locate and destroy bugs in seconds.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {language === 'hi' ? 'ओपन सोर्स के लिए प्रतिबद्धता' : 'Our Open-Source Commitment'}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We believe diagnostic tools should be universally accessible. All of our interactive helpers are client-side only, run fully in your sandbox browser environment, and require zero signup, cookies, or telemetry overheads.
          </p>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-850 flex gap-3 items-center">
            <span className="text-3xl">💻</span>
            <div>
              <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200">GitHub Open Community</h4>
              <p className="text-[10px] text-zinc-400 mt-0.5">AppFixGuide code and data sets are distributed under the MIT License.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive History Timeline */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-sm">
        <h3 className="font-bold text-lg text-zinc-950 dark:text-white mb-6 border-b pb-3">
          {language === 'hi' ? 'हमारा इतिहास' : 'Our Timeline & Milestones'}
        </h3>
        
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-6">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative pl-6">
              {/* Dot */}
              <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${styles.bg}`}></div>
              
              <div className="space-y-1">
                <span className={`text-xs font-black ${styles.text}`}>
                  {item.year}
                </span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
