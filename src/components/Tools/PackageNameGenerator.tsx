import React, { useState } from 'react';

export default function PackageNameGenerator() {
  const [company, setCompany] = useState<string>('mycompany');
  const [appName, setAppName] = useState<string>('coolapp');
  const [domain, setDomain] = useState<string>('com');

  // Reserved keywords in Java
  const reservedKeywords = [
    'abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized',
    'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw',
    'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient',
    'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void',
    'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while'
  ];

  const sanitizeSegment = (segment: string) => {
    return segment
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '') // remove illegal characters
      .replace(/^[0-9_]+/g, ''); // segment cannot start with numbers/underscores in standard structures
  };

  const cleanCompany = sanitizeSegment(company) || 'company';
  const cleanApp = sanitizeSegment(appName) || 'app';
  const finalPackage = `${domain}.${cleanCompany}.${cleanApp}`;

  const checkValidity = () => {
    const segments = finalPackage.split('.');
    for (const segment of segments) {
      if (reservedKeywords.includes(segment)) {
        return { valid: false, reason: `The word "${segment}" is a Java reserved keyword and cannot be used as a package segment.` };
      }
      if (!segment) {
        return { valid: false, reason: 'Package segments cannot be empty.' };
      }
    }
    return { valid: true };
  };

  const validation = checkValidity();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">Android Package Name (Application ID) Generator</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Generate standard reverse-domain application IDs. Ensure your package names comply with Java namespace validation rules before registering them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1">Domain Prefix</label>
              <select 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-2 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg"
              >
                <option value="com">com</option>
                <option value="org">org</option>
                <option value="net">net</option>
                <option value="apps">apps</option>
                <option value="io">io</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-zinc-500 mb-1">Company / Developer Name</label>
              <input 
                type="text" value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              App Name
            </label>
            <input 
              type="text" value={appName} 
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-zinc-400 block mb-2">Generated Application ID:</span>
            <div className="bg-zinc-200 dark:bg-zinc-900 px-4 py-3 rounded-lg font-mono text-base font-bold text-zinc-950 dark:text-white break-all flex justify-between items-center">
              <span>{finalPackage}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(finalPackage);
                  alert('Package Name copied!');
                }}
                className="text-xs text-emerald-500 font-bold ml-2 hover:underline"
              >
                Copy
              </button>
            </div>

            <div className="mt-4">
              {validation.valid ? (
                <div className="text-xs bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg">
                  ✓ Valid: This package structure is structurally correct and safe to use inside Android Studio manifest files.
                </div>
              ) : (
                <div className="text-xs bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-3 rounded-lg">
                  ⚠ Error: {validation.reason}
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-zinc-400 mt-4">
            * Once published to the Play Store, your Package Name becomes permanent and cannot be modified under any circumstances.
          </div>
        </div>
      </div>
    </div>
  );
}
