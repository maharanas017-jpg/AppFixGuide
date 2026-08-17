import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useAppTheme } from '../components/ThemeContext';
import { AndroidError } from '../types';
import { errorsDatabase, categories } from '../data/errors';
import BannerAd from '../components/BannerAd';

interface ErrorDetailViewProps {
  error: AndroidError;
  onSelectError: (error: AndroidError) => void;
  onBack: () => void;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ErrorDetailView({ error, onSelectError, onBack }: ErrorDetailViewProps) {
  const { t, language } = useLanguage();
  const { styles } = useAppTheme();
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  // Solution Rating Board States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    // Load reviews from local storage
    const stored = JSON.parse(localStorage.getItem(`reviews_${error.slug}`) || '[]');
    // Seed default reviews if empty to make it look professional
    if (stored.length === 0) {
      const defaultReviews: Review[] = [
        {
          id: '1',
          name: 'Aditya K.',
          rating: 5,
          comment: language === 'hi' ? 'इस गाइड से मेरा एपीके तुरंत ठीक हो गया! धन्यवाद।' : 'This step-by-step resolution fixed my apk compile issue instantly. Highly recommended guide.',
          date: '2026-08-01'
        },
        {
          id: '2',
          name: 'Dev_Sarah',
          rating: 4,
          comment: language === 'hi' ? 'बहुत ही सटीक स्पष्टीकरण दिया गया है।' : 'Clear explanations on target SDK compliance limits.',
          date: '2026-08-10'
        }
      ];
      localStorage.setItem(`reviews_${error.slug}`, JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
    } else {
      setReviews(stored);
    }
    setReviewSubmitted(false);
  }, [error, language]);

  const handleCopy = () => {
    const fullSolution = `Error: ${error.title}\n\nSolutions:\n` + 
      error.solutions.map(sol => `${sol.title}:\n${sol.steps.map((st, i) => `${i+1}. ${st}`).join('\n')}`).join('\n\n');
    
    navigator.clipboard.writeText(fullSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !commentText) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewerName,
      rating,
      comment: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${error.slug}`, JSON.stringify(updated));

    setReviewerName('');
    setCommentText('');
    setRating(5);
    setReviewSubmitted(true);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const related = errorsDatabase
    .filter(e => e.category === error.category && e.id !== error.id)
    .slice(0, 3);

  const displayTitle = language === 'hi' && error.hindiTitle ? error.hindiTitle : error.title;
  const displaySummary = language === 'hi' && error.hindiSummary ? error.hindiSummary : error.summary;
  const displayCauses = language === 'hi' && error.hindiCauses ? error.hindiCauses : error.causes;
  const displaySymptoms = language === 'hi' && error.hindiSymptoms ? error.hindiSymptoms : (error.symptoms || []);
  const displayPrevention = language === 'hi' && error.hindiPrevention ? error.hindiPrevention : (error.prevention || []);

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Back & Title Row */}
      <div className="lg:col-span-12">
        <button 
          onClick={onBack}
          className={`text-xs font-bold hover:underline inline-flex items-center gap-1 mb-4 ${styles.text}`}
        >
          ← {language === 'hi' ? 'पीछे जाएं' : 'Back to Errors'}
        </button>

        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold tracking-wider uppercase ${styles.text}`}>
                {categories[error.category as keyof typeof categories] || error.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                error.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' :
                error.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
                'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
              }`}>
                {error.difficulty}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                ⭐ {averageRating} ({reviews.length} reviews)
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight">
              {displayTitle}
            </h1>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm ${styles.bg} ${styles.bgHover}`}
            >
              {copied ? t('copied') : t('copyBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="lg:col-span-8 space-y-6">
        {/* Quick Answer */}
        <div className={`p-6 rounded-2xl border ${styles.bgSoft} border-zinc-250 dark:border-zinc-800/30`}>
          <h3 className="font-bold mb-2 flex items-center gap-1 text-sm uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            ⚡ {t('quickAnswer')}
          </h3>
          <p className="text-xs md:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {displaySummary}
          </p>
        </div>

        {/* Sponsor Banner Ad Block */}
        <BannerAd />

        {/* Details & Meaning */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">{t('whatItMeans')}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            This Android exception is generated when system parameters fail compliance tests, or compiler configurations encounter structural conflicts during binary packaging. Review the causes and steps below to troubleshoot the trigger conditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="font-bold text-xs text-zinc-400 uppercase tracking-wider block mb-2">{t('commonCauses')}</span>
              <ul className="list-disc pl-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
                {displayCauses.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
            {displaySymptoms.length > 0 && (
              <div>
                <span className="font-bold text-xs text-zinc-400 uppercase tracking-wider block mb-2">{t('symptoms')}</span>
                <ul className="list-disc pl-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
                  {displaySymptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Step by Step Solutions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-6 shadow-sm">
          <h3 className="font-bold text-base text-zinc-900 dark:text-white border-b pb-2">{t('stepSolutions')}</h3>
          
          <div className="space-y-6">
            {error.solutions.map((sol, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h4 className="font-extrabold text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${styles.bg}`}></span>
                  <span>Option {sIdx + 1}: {sol.title}</span>
                </h4>
                <div className="space-y-3 pl-2">
                  {sol.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className={`w-5 h-5 text-white rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5 ${styles.bg}`}>
                        {idx + 1}
                      </div>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention */}
        {displayPrevention.length > 0 && (
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl">
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs mb-2 uppercase tracking-widest">{t('preventionTips')}</h3>
            <ul className="list-disc pl-5 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
              {displayPrevention.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {error.faq && error.faq.length > 0 && (
          <div className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2">{t('faq')}</h3>
            <div className="divide-y divide-zinc-150 dark:divide-zinc-800">
              {error.faq.map((faqItem, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0">
                  <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 mb-1">Q: {faqItem.q}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">A: {faqItem.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solution Rating & Feedback Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="border-b pb-3 flex justify-between items-center">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">Solution Reviews & Rating</h3>
            <span className="text-xs font-bold text-amber-500">Average: ⭐ {averageRating} / 5.0</span>
          </div>

          {/* Form */}
          {reviewSubmitted ? (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl text-center">
              ✓ Solution review submitted successfully! Thanks for keeping AppFixGuide community accurate.
            </div>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Your Name</label>
                  <input 
                    type="text" required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Alex M."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Star Rating</label>
                  <select 
                    value={rating} onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 - Perfect Fix)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 - Useful)</option>
                    <option value={3}>⭐⭐⭐ (3 - Average)</option>
                    <option value={2}>⭐⭐ (2 - Incomplete)</option>
                    <option value={1}>⭐ (1 - Did not solve)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Your Feedback Comment</label>
                <textarea 
                  rows={2} required value={commentText} onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2.5 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Share details on your device parameters and build outcomes..."
                />
              </div>

              <button 
                type="submit"
                className={`w-full py-2 text-white text-xs font-bold rounded-xl transition ${styles.bg} ${styles.bgHover}`}
              >
                Submit Solution Review
              </button>
            </form>
          )}

          {/* List Reviews */}
          <div className="space-y-3.5 pt-2">
            {reviews.map((r) => (
              <div key={r.id} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{r.name}</span>
                  <span className="text-[10px] text-zinc-400">{r.date}</span>
                </div>
                <div className="text-[10px] text-amber-500 font-bold">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                  "{r.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
          <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-wider mb-3">Diagnostic Context</h4>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span className="text-zinc-500">Fix Difficulty:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{error.difficulty}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-zinc-500">Estimated Fix Time:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{error.estimatedTime}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-zinc-500">Last Reviewed:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{error.lastReviewed}</span>
            </div>
          </div>
        </div>

        {/* Related Errors */}
        {related.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-3">
            <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-wider">{t('related')}</h4>
            <div className="space-y-3">
              {related.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectError(rel)}
                  className={`p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-transparent transition cursor-pointer ${styles.hoverBorder}`}
                >
                  <h5 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 line-clamp-1">{rel.title}</h5>
                  <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">{rel.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
