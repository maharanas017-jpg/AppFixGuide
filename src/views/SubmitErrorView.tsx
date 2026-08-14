import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';

export default function SubmitErrorView() {
  const { t, language } = useLanguage();
  const { styles } = useAppTheme();
  const [title, setTitle] = useState('');
  const [logs, setLogs] = useState('');
  const [device, setDevice] = useState('');
  const [appType, setAppType] = useState('Native Java/Kotlin');
  const [desc, setDesc] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !logs) {
      alert('Please fill out the Error Title and Log message');
      return;
    }

    const submission = {
      id: Date.now().toString(),
      title,
      logs,
      device,
      appType,
      desc,
      submittedAt: new Date().toLocaleDateString(),
      status: 'Pending'
    };

    // Store in localStorage for Admin Panel moderation
    const existing = JSON.parse(localStorage.getItem('submitted_errors') || '[]');
    existing.push(submission);
    localStorage.setItem('submitted_errors', JSON.stringify(existing));

    setSuccess(true);
    setTitle('');
    setLogs('');
    setDevice('');
    setDesc('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col justify-center">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {t('submitTitle')}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          {t('submitSub')}
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl mb-6 text-sm font-medium">
          ✓ {t('submitSuccess')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {t('formTitle')} *
          </label>
          <input 
            type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            placeholder="e.g., App not installed on Android 14"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {t('formMsg')} *
          </label>
          <textarea 
            required rows={4} value={logs} onChange={(e) => setLogs(e.target.value)}
            className="w-full font-mono text-xs p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste your raw crash log, Logcat exception or gradle errors here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              {t('formDevice')}
            </label>
            <input 
              type="text" value={device} onChange={(e) => setDevice(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              placeholder="e.g., OnePlus 11, Android 13"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              {t('formAppType')}
            </label>
            <select 
              value={appType} onChange={(e) => setAppType(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            >
              <option value="Native Java/Kotlin">Native Java/Kotlin</option>
              <option value="WebView Container / Hybrid">WebView Container / Hybrid</option>
              <option value="React Native">React Native</option>
              <option value="Flutter">Flutter</option>
              <option value="Unity Game Wrapper">Unity Game Wrapper</option>
              <option value="Other / Web App">Other / Web App</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {t('formDesc')}
          </label>
          <textarea 
            rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            placeholder="Help us understand under what specific situations this error is triggered..."
          />
        </div>

        <button 
          type="submit"
          className={`w-full py-3 text-white font-bold rounded-xl transition shadow-md ${styles.bg} ${styles.bgHover} ${styles.shadow}`}
        >
          {t('formSubmit')}
        </button>
      </form>
    </div>
  );
}
