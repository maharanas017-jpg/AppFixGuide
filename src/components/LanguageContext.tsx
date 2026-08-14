import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Navigation
    logoName: 'AppFixGuide',
    tagline: 'Find the Android Error. Fix It Fast.',
    home: 'Home',
    errors: 'Errors',
    tools: 'Tools',
    guides: 'Guides',
    aiAnalyzer: 'AI Analyzer',
    submitError: 'Submit Error',
    admin: 'Admin Panel',
    
    // Homepage Hero
    heroTitle: 'Having an Android or APK Error?',
    heroSub: 'Search the error and get a simple step-by-step solution.',
    searchPlaceholder: 'Search error, e.g. App not installed, Parse error, APK upload failed...',
    searchBtn: 'Search Error',
    browseAllBtn: 'Browse All Errors',
    popularSearches: 'Popular searches',
    
    // Homepage Content
    categoriesTitle: 'Browse Errors by Category',
    categoriesSub: 'Select a category to explore common issues and professional debugging steps.',
    viewCategory: 'View Errors',
    recentTitle: 'Recently Reviewed Errors',
    viewAllErrors: 'View All Errors',
    
    // Search Results
    searchResults: 'Search Results',
    noResults: 'No errors found matching your query. Try searching with other terms or use our AI Error Analyzer.',
    difficulty: 'Difficulty',
    estTime: 'Fix Time',
    reviewed: 'Reviewed',
    
    // Error Page Detail
    quickAnswer: 'Quick Answer',
    whatItMeans: 'What the Error Means',
    commonCauses: 'Common Causes',
    symptoms: 'Symptoms',
    stepSolutions: 'Step-by-Step Solutions',
    preventionTips: 'Prevention Tips',
    faq: 'Frequently Asked Questions',
    related: 'Related Errors',
    lastReviewedLabel: 'Last Reviewed',
    helpfulQ: 'Was this guide helpful?',
    yes: 'Yes',
    no: 'No',
    copied: 'Solution copied to clipboard!',
    copyBtn: 'Copy Solution',
    shareBtn: 'Share',
    disclaimerLabel: 'Disclaimer',
    disclaimerText: 'AppFixGuide provides general technical troubleshooting information. Solutions may vary depending on the device, Android version, app configuration, and software environment.',
    
    // Tools List Page
    toolsTitle: 'Android Developer & Publisher Tools',
    toolsSub: 'Free browser-based companion tools to generate configurations, calculate sizes, and validate structures.',
    
    // Submit Error Page
    submitTitle: 'Can\'t find your error?',
    submitSub: 'Submit your issue here. Our community moderators will review it and add a troubleshooting guide soon.',
    formTitle: 'Error Title',
    formMsg: 'Error Message / Logcat output',
    formDevice: 'Device / Android Version (e.g. Pixel 8, Android 14)',
    formAppType: 'App Wrapper Type (e.g. Native Java/Kotlin, WebView, React Native)',
    formDesc: 'Describe when and how this error occurs',
    formSubmit: 'Submit Error for Moderation',
    submitSuccess: 'Error submitted successfully! A moderator will review this request. (Saved to sandbox dashboard)',
    
    // AI Analyzer Page
    aiTitle: 'AI Android Error Analyzer',
    aiSub: 'Paste your Android logcat, compile failure, or error message, and our model will instantly generate an in-depth debugging report.',
    aiPlaceholder: 'Paste Logcat stacktrace or error description here...',
    aiAnalyzeBtn: 'Analyze Error with Gemini',
    aiAnalyzing: 'Analyzing using Gemini 3.7-Flash...',
    aiResultTitle: 'Gemini Analysis Report',
    aiResultDisclaimer: 'AI-generated reports can serve as rapid debugging guidance. Verify paths and security rules before making production code modifications.',
    aiOfflineFallback: 'Note: Gemini is running in high-performance simulation mode. For full API-guided outputs, ensure GEMINI_API_KEY is configured.',
    
    // Footer
    footerColProduct: 'Product',
    footerColResources: 'Resources',
    footerColCompany: 'Company',
    footerColLegal: 'Legal',
    legalAbout: 'About AppFixGuide',
    legalPrivacy: 'Privacy Policy',
    legalTerms: 'Terms of Use',
    legalDisclaimer: 'Disclaimer Policy',
    legalCookie: 'Cookie Policy',
    legalContact: 'Contact Us',
    footerCopyright: '© 2026 AppFixGuide. All rights reserved.'
  },
  hi: {
    // Header & Navigation
    logoName: 'AppFixGuide',
    tagline: 'एंड्रॉइड एरर खोजें। तुरंत ठीक करें।',
    home: 'मुख्य पृष्ठ',
    errors: 'त्रुटियाँ (Errors)',
    tools: 'टूल्स',
    guides: 'गाइड्स',
    aiAnalyzer: 'एआई विश्लेषक (AI Analyzer)',
    submitError: 'एरर सबमिट करें',
    admin: 'एडमिन पैनल',
    
    // Homepage Hero
    heroTitle: 'क्या आपके एंड्रॉइड या एपीके में एरर है?',
    heroSub: 'त्रुटि (Error) खोजें और आसान चरण-दर-चरण समाधान प्राप्त करें।',
    searchPlaceholder: 'त्रुटि खोजें, जैसे App not installed, Parse error, WebView blank screen...',
    searchBtn: 'एरर खोजें',
    browseAllBtn: 'सभी एरर देखें',
    popularSearches: 'लोकप्रिय खोजें',
    
    // Homepage Content
    categoriesTitle: 'श्रेणी (Category) के अनुसार एरर खोजें',
    categoriesSub: 'सामान्य समस्याओं और पेशेवर डिबगिंग चरणों का पता लगाने के लिए श्रेणी चुनें।',
    viewCategory: 'एरर देखें',
    recentTitle: 'हाल ही में समीक्षा की गई त्रुटियां',
    viewAllErrors: 'सभी त्रुटियाँ देखें',
    
    // Search Results
    searchResults: 'खोज के परिणाम',
    noResults: 'आपकी खोज से मेल खाती कोई त्रुटि नहीं मिली। अन्य शब्दों के साथ खोजें या हमारे एआई विश्लेषक का उपयोग करें।',
    difficulty: 'कठिनाई',
    estTime: 'समाधान समय',
    reviewed: 'समीक्षित',
    
    // Error Page Detail
    quickAnswer: 'त्वरित उत्तर',
    whatItMeans: 'त्रुटि का क्या अर्थ है',
    commonCauses: 'सामान्य कारण',
    symptoms: 'लक्षण',
    stepSolutions: 'चरण-दर-चरण समाधान',
    preventionTips: 'बचाव के उपाय',
    faq: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    related: 'संबंधित त्रुटियां',
    lastReviewedLabel: 'अंतिम समीक्षा',
    helpfulQ: 'क्या यह गाइड मददगार थी?',
    yes: 'हाँ',
    no: 'नहीं',
    copied: 'समाधान क्लिपबोर्ड पर कॉपी हो गया!',
    copyBtn: 'समाधान कॉपी करें',
    shareBtn: 'शेयर करें',
    disclaimerLabel: 'अस्वीकरण (Disclaimer)',
    disclaimerText: 'AppFixGuide सामान्य तकनीकी समस्या निवारण जानकारी प्रदान करता है। समाधान आपके डिवाइस, एंड्रॉइड वर्जन और ऐप कॉन्फ़िगरेशन के आधार पर भिन्न हो सकते हैं।',
    
    // Tools List Page
    toolsTitle: 'एंड्रॉइड डेवलपर और पब्लिशर टूल्स',
    toolsSub: 'कॉन्फ़िगरेशन जेनरेट करने, साइज की गणना करने और संरचनाओं को मान्य करने के लिए मुफ्त ब्राउज़र-आधारित टूल्स।',
    
    // Submit Error Page
    submitTitle: 'अपनी त्रुटि नहीं मिल रही है?',
    submitSub: 'अपनी समस्या यहाँ सबमिट करें। हमारे समुदाय मॉडरेटर इसकी समीक्षा करेंगे और जल्द ही एक गाइड जोड़ेंगे।',
    formTitle: 'एरर का शीर्षक',
    formMsg: 'त्रुटि संदेश / Logcat आउटपुट',
    formDevice: 'डिवाइस / एंड्रॉइड संस्करण (जैसे Pixel 8, Android 14)',
    formAppType: 'ऐप रैपर प्रकार (जैसे Native Java, WebView, React Native)',
    formDesc: 'वर्णन करें कि यह त्रुटि कब और कैसे होती है',
    formSubmit: 'समीक्षा के लिए एरर सबमिट करें',
    submitSuccess: 'त्रुटि सफलतापूर्वक सबमिट हो गई! मॉडरेटर जल्द ही इसकी समीक्षा करेंगे।',
    
    // AI Analyzer Page
    aiTitle: 'एआई एंड्रॉइड एरर एनालाइजर',
    aiSub: 'अपने एंड्रॉइड लॉगकैट, कंपाइल फेलियर, या एरर मैसेज को पेस्ट करें, और हमारा एआई मॉडल तुरंत एक गहन डिबगिंग रिपोर्ट तैयार करेगा।',
    aiPlaceholder: 'लॉगकैट स्टैकट्रेस या त्रुटि विवरण यहाँ पेस्ट करें...',
    aiAnalyzeBtn: 'जेमिनी (Gemini) से विश्लेषण करें',
    aiAnalyzing: 'जेमिनी 3.7-फ्लैश का उपयोग करके विश्लेषण किया जा रहा है...',
    aiResultTitle: 'जेमिनी विश्लेषण रिपोर्ट',
    aiResultDisclaimer: 'एआई-जनरेटेड रिपोर्ट रैपिड डिबगिंग मार्गदर्शन के रूप में काम कर सकती है। कोड मॉडिफिकेशन से पहले पाथ और नियमों को सत्यापित करें।',
    aiOfflineFallback: 'नोट: जेमिनी हाई-परफॉर्मेंस सिमुलेशन मोड में चल रहा है। पूर्ण एपीआई रिपोर्ट के लिए GEMINI_API_KEY को सक्रिय करें।',
    
    // Footer
    footerColProduct: 'उत्पाद',
    footerColResources: 'संसाधन',
    footerColCompany: 'कंपनी',
    footerColLegal: 'कानूनी',
    legalAbout: 'हमारे बारे में',
    legalPrivacy: 'गोपनीयता नीति',
    legalTerms: 'उपयोग की शर्तें',
    legalDisclaimer: 'अस्वीकरण नीति',
    legalCookie: 'कुकी नीति',
    legalContact: 'संपर्क करें',
    footerCopyright: '© 2026 AppFixGuide. सभी अधिकार सुरक्षित।'
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('appfix_lang');
    return (saved === 'hi' ? 'hi' : 'en') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appfix_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
