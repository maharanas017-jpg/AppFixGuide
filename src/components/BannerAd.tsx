import React, { useEffect, useRef } from 'react';

export default function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Unique ID for the script to prevent duplicate injections on hot reload/routing
    const scriptId = 'ad-script-c074a0988d3233d9710f0d349d345622';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30879557.effectivecpmnetwork.com/c074a0988d3233d9710f0d349d345622/invoke.js';
      document.body.appendChild(script);
    }

    return () => {
      // Keep script in body to avoid re-triggering script loaders unnecessarily on navigation
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm relative overflow-hidden transition-all duration-300">
      <div className="absolute top-1.5 right-3 text-[8px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
        Sponsored Ad
      </div>
      
      <div className="pt-2 w-full flex justify-center">
        {/* The specific target element where the ad platform's invoke.js will mount the native banner layout */}
        <div 
          id="container-c074a0988d3233d9710f0d349d345622" 
          ref={containerRef}
          className="w-full flex items-center justify-center min-h-[90px] overflow-x-auto"
        ></div>
      </div>
    </div>
  );
}
