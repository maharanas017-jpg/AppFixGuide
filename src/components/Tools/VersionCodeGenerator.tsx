import React, { useState } from 'react';

export default function VersionCodeGenerator() {
  const [major, setMajor] = useState<number>(1);
  const [minor, setMinor] = useState<number>(0);
  const [patch, setPatch] = useState<number>(0);
  const [buildType, setBuildType] = useState<'standard' | 'dateBased'>('standard');
  const [revision, setRevision] = useState<number>(1);

  // Math calculations
  // Standard Code: Major * 1000000 + Minor * 10000 + Patch * 100 + Revision
  const standardCode = major * 1000000 + minor * 10000 + patch * 100 + revision;
  const versionName = `${major}.${minor}.${patch}${revision > 1 ? `-rev${revision}` : ''}`;

  // Date based Code: YYYYMMDDxx
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;
  const dateCode = parseInt(`${dateStr}${String(revision).padStart(2, '0')}`);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">App Version Code Generator</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Generate professional monotonically-increasing versionCode integers and semantic versionName tags for your Android releases.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex space-x-2 border-b pb-3 mb-3">
            <button 
              onClick={() => setBuildType('standard')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                buildType === 'standard' ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Standard Semantic Version
            </button>
            <button 
              onClick={() => setBuildType('dateBased')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                buildType === 'dateBased' ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Date-Based Versioning (Play Store Safe)
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1">Major Version</label>
              <input 
                type="number" min="0" value={major} 
                onChange={(e) => setMajor(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1">Minor Version</label>
              <input 
                type="number" min="0" value={minor} 
                onChange={(e) => setMinor(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1">Patch</label>
              <input 
                type="number" min="0" value={patch} 
                onChange={(e) => setPatch(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 mb-1">Daily Build / Revision Suffix (xx)</label>
            <input 
              type="number" min="1" max="99" value={revision} 
              onChange={(e) => setRevision(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-4">Generated Android Properties</h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">versionCode:</span>
                <span className="font-mono text-base font-bold text-emerald-500">
                  {buildType === 'standard' ? standardCode : dateCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">versionName:</span>
                <span className="font-mono text-base font-bold text-zinc-900 dark:text-white">
                  {buildType === 'standard' ? versionName : `${major}.${minor}.${patch}-${dateStr}`}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="text-xs font-semibold block mb-1 text-zinc-500">How to use inside build.gradle:</span>
            <pre className="text-xs font-mono bg-zinc-200 dark:bg-zinc-900 p-3 rounded text-zinc-800 dark:text-zinc-200 overflow-x-auto">
{`defaultConfig {
    versionCode ${buildType === 'standard' ? standardCode : dateCode}
    versionName "${buildType === 'standard' ? versionName : `${major}.${minor}.${patch}-${dateStr}`}"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
