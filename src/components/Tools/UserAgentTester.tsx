import React, { useState, useEffect } from 'react';

export default function UserAgentTester() {
  const [userAgent, setUserAgent] = useState<string>('');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  const parseUA = () => {
    const ua = userAgent.toLowerCase();
    let os = 'Unknown OS';
    let version = 'Unknown Version';
    let device = 'Unknown Device';
    let isWebView = false;
    let browser = 'Unknown Browser';

    // Parse OS
    if (ua.includes('android')) {
      os = 'Android';
      const match = ua.match(/android\s([0-9\.]+)/);
      if (match) version = `Android ${match[1]}`;
    } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
      os = 'iOS';
      const match = ua.match(/os\s([0-9_]+)/);
      if (match) version = `iOS ${match[1].replace(/_/g, '.')}`;
    } else if (ua.includes('windows')) {
      os = 'Windows';
    } else if (ua.includes('macintosh')) {
      os = 'macOS';
    } else if (ua.includes('linux')) {
      os = 'Linux';
    }

    // Parse Device
    if (ua.includes('android')) {
      const match = userAgent.match(/Android\s[0-9\.]+;\s([^;\)]+)/);
      if (match) {
        device = match[1];
      }
    } else if (ua.includes('iphone')) {
      device = 'iPhone';
    } else if (ua.includes('ipad')) {
      device = 'iPad';
    }

    // Parse Browser and WebView
    if (ua.includes('wv') || ua.includes('version/4.0')) {
      isWebView = true;
      browser = 'Android WebView Container';
    } else if (ua.includes('chrome') && !ua.includes('chromium')) {
      browser = 'Google Chrome';
    } else if (ua.includes('firefox')) {
      browser = 'Mozilla Firefox';
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      browser = 'Apple Safari';
    }

    return { os, version, device, isWebView, browser };
  };

  const parsed = parseUA();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">Android User-Agent Tester</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Paste a mobile User-Agent header string to inspect device models, OS levels, and detect if it is running inside an isolated native WebView wrapper.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
              User-Agent String
            </label>
            <textarea 
              rows={5} value={userAgent} 
              onChange={(e) => setUserAgent(e.target.value)}
              className="w-full font-mono text-xs p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Paste custom User-Agent here..."
            />
            
            <button 
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  setUserAgent(navigator.userAgent);
                }
              }}
              className="mt-2 text-xs text-emerald-500 font-bold hover:underline block"
            >
              🔄 Reset to current browser agent
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-xl border border-zinc-150 dark:border-zinc-850 space-y-4">
          <h4 className="font-bold text-zinc-950 dark:text-white border-b pb-2 text-sm uppercase tracking-wide text-zinc-400">
            Parsed User-Agent Metadata
          </h4>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block uppercase">Operating System:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{parsed.os}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 block uppercase">System Version:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{parsed.version}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 block uppercase">Device Hardware:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{parsed.device}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 block uppercase">Detected Browser:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{parsed.browser}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 block uppercase mb-1">WebView Wrapper Detection:</span>
            {parsed.isWebView ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-amber-800 dark:text-amber-400 p-3 rounded-lg text-xs">
                ⚠️ WebView Detected! This request originates inside a native mobile container. Ensure JavaScript cookies and local storage compatibility permissions are fully configured on your Java/Kotlin class.
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-800 dark:text-emerald-400 p-3 rounded-lg text-xs">
                ✓ Standard Browser: This request originates from a default web browser window (not trapped inside an unconfigured APK WebView container).
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
