import React, { useState } from 'react';

export default function SdkVersionHelper() {
  const [minSdk, setMinSdk] = useState<number>(24);
  const [targetSdk, setTargetSdk] = useState<number>(34);

  const checkCompliance = () => {
    const feedback: string[] = [];
    let isPlayStoreCompliant = true;

    // targetSdk checks
    if (targetSdk < 34) {
      isPlayStoreCompliant = false;
      feedback.push('❌ NON-COMPLIANT: Google Play Console requires uploading new apps and updates targeting at least Android 14 (API 34). Target SDKs lower than 34 will be rejected.');
    } else if (targetSdk === 34) {
      feedback.push('⚠️ WARNING: API 34 is currently compliant, but Google Play will soon require API 35 (Android 15) for all releases by late 2025.');
    } else if (targetSdk === 35) {
      feedback.push('✅ FULLY COMPLIANT: API 35 (Android 15) meets or exceeds all current Google Play Store guidelines. Note: Android 15 forces Edge-to-Edge display mode for all wrapped layouts.');
    } else if (targetSdk >= 36) {
      feedback.push('🚀 BLEEDING EDGE: Targeting API 36 (Android 16 preview). Ensure you use unstable gradle wrapper versions.');
    }

    // minSdk checks
    if (minSdk < 21) {
      feedback.push('💡 RECOMMENDATION: Your minSdkVersion is set very low (<21). This adds compilation bloated overrides for ancient devices. Raising it to 21 (Android 5.0) or 24 (Android 7.0) will shrink your final APK size.');
    } else if (minSdk >= 21 && minSdk <= 24) {
      feedback.push('✅ BALANCED: A minSdkVersion of 21-24 covers over 98% of active global devices while supporting modern Java features.');
    } else if (minSdk > 26) {
      feedback.push('ℹ️ DENSE CORES: A minSdkVersion greater than 26 means you only support Android 8.0+ devices. Great for modern internal apps, but will cut off about 5-10% of global users in developing countries like India.');
    }

    return { compliant: isPlayStoreCompliant, alerts: feedback };
  };

  const { compliant, alerts } = checkCompliance();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">Google Play SDK Compliance Helper</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Validate your app\'s minSdkVersion and targetSdkVersion values to ensure they comply with Google Play Console policies and Android OS compatibility limits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              Minimum SDK (minSdkVersion)
            </label>
            <input 
              type="number" min="15" max="35" value={minSdk} 
              onChange={(e) => setMinSdk(parseInt(e.target.value) || 24)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-xs text-zinc-400">Specifies the minimum Android OS level required to run your app.</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              Target SDK (targetSdkVersion)
            </label>
            <input 
              type="number" min="21" max="36" value={targetSdk} 
              onChange={(e) => setTargetSdk(parseInt(e.target.value) || 34)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-xs text-zinc-400">Specifies the API level your app is fully tested against and optimized for.</span>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-400">Store Compatibility:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                compliant ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
              }`}>
                {compliant ? 'STORE READY' : 'STORE REJECTED'}
              </span>
            </div>

            <div className="space-y-2">
              {alerts.map((alert, idx) => (
                <div key={idx} className="text-sm text-zinc-700 dark:text-zinc-300">
                  {alert}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold block mb-1 text-zinc-500">Corresponding build.gradle Snippet:</span>
            <pre className="text-xs font-mono bg-zinc-200 dark:bg-zinc-900 p-3 rounded text-zinc-800 dark:text-zinc-200 overflow-x-auto">
{`defaultConfig {
    minSdkVersion ${minSdk}
    targetSdkVersion ${targetSdk}
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
