import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';

export default function PrivacyPolicyView() {
  const { language } = useLanguage();
  const { styles } = useAppTheme();

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col animate-fadeIn">
      {/* Colorful Header */}
      <div className={`bg-gradient-to-r ${styles.gradient} rounded-3xl p-8 md:p-12 text-white mb-8 shadow-xl relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
          {language === 'hi' ? 'कानूनी नीति' : 'Legal & Compliance'}
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight leading-none">
          {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
        </h1>
        <p className="text-white/90 mt-3 text-sm md:text-base max-w-2xl leading-relaxed">
          Last updated: August 14, 2026 • We operate on a decentralized, private local sandbox model. Your diagnostic logs and preference configurations belong entirely to you.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">1. Introduction & Scope</h2>
          <p className="text-xs">
            Welcome to AppFixGuide. We respect your privacy and are committed to safeguarding your information. This Privacy Policy details the types of information we process when you browse our Android compilation troubleshooting repository, interact with our diagnostic compilers, use local storage sandboxes, or analyze logs using our server-side Gemini AI.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">2. Information Collection & Usage</h2>
          <p className="text-xs">
            AppFixGuide operates on a decentralized, privacy-focused client model. Most companion features require no account signup or external transmission:
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1.5">
            <li>
              <strong>Local Storage Persistence:</strong> User submissions, solutions feedback ratings, customized active themes, and approved community moderator records are persisted strictly on your browser device using the industry-standard <code>localStorage</code> API. We do not access, sync, or transmit this.
            </li>
            <li>
              <strong>Diagnostic Calculators:</strong> All diagnostic tools (APK Estimator, SDK Checkers, Base64 converter) execute code fully in your local browser container. Input payloads never leave your computer.
            </li>
            <li>
              <strong>Gemini AI Error Analyzer:</strong> When you submit stacktraces via the AI Analyzer, we transmit the text safely via SSL encryption to our server-side proxy which calls the Google Gemini API. This data is exclusively used to return actionable code steps and is never rented or sold.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">3. Third-Party Services & Cookies</h2>
          <p className="text-xs">
            We do not load invasive marketing cookies, trackers, or pixel logs. If you click third-party links or export bundles, those portals may utilize their own privacy policies. We encourage you to inspect developer terms when visiting external sites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">4. Children's Online Privacy</h2>
          <p className="text-xs">
            Our diagnostic platform is designed for professional software engineers, hobbyists, and application testers. We do not knowingly solicit or collect data from children under the age of 13.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">5. GDPR & CCPA Compliance Rights</h2>
          <p className="text-xs">
            Depending on your physical location, you have rights to view, erase, or download your data. Because all community reports, sandbox logs, and preferences are saved locally on your client machine, you may exercise your 'Right to be Forgotten' at any moment by clearing your browser cache and cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">6. Changes to this Policy</h2>
          <p className="text-xs">
            We may occasionally modify our policies as Android target SDK requirements change. Any revisions will be logged immediately on this view with updated timestamps.
          </p>
        </section>

        <section className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">7. Contact Information</h2>
          <p className="text-xs text-zinc-500">
            For secure queries regarding data deletion, community open-source publishing rights, or terms of licensing, reach out to the AppFixGuide Core team at: <code>maharanas017@gmail.com</code> or submit a help ticket directly via our Ask an Expert support section.
          </p>
        </section>
      </div>
    </div>
  );
}
