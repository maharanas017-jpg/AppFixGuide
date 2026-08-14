import React, { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState<string>('{"app_name":"AppFixGuide","version":1.0,"features":["analyzer","tools"]}');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const formatJson = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">JSON Formatter & Validator</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Validate and beautify your configuration payloads (e.g. `google-services.json`, API headers, config scripts).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Raw JSON Input</label>
          <textarea 
            rows={8} value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full font-mono text-xs p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder='Paste your JSON code here...'
          />
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={formatJson}
              className="px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition"
            >
              Format Beautify
            </button>
            <button 
              onClick={minifyJson}
              className="px-4 py-2 text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold rounded-lg transition"
            >
              Minify
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between">
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Output Result</label>
            {error ? (
              <div className="p-3 border border-red-200 bg-red-50 text-red-700 rounded-lg text-xs font-mono break-all">
                ❌ {error}
              </div>
            ) : (
              <textarea 
                readOnly rows={8} value={output} 
                className="w-full font-mono text-xs p-3 border border-zinc-200 dark:border-zinc-850 bg-zinc-100 dark:bg-zinc-950 text-emerald-600 dark:text-emerald-400 rounded-lg focus:outline-none"
                placeholder="Formatted JSON will display here..."
              />
            )}
          </div>

          {!error && output && (
            <button 
              onClick={() => {
                navigator.clipboard.writeText(output);
                alert('Copied output to clipboard!');
              }}
              className="w-full mt-2 py-2 border border-zinc-200 hover:border-emerald-500 dark:border-zinc-800 text-xs font-bold rounded-lg transition text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900"
            >
              Copy Formatted Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
