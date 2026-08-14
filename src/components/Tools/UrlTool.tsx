import React, { useState } from 'react';

export default function UrlTool() {
  const [input, setInput] = useState<string>('https://appfixguide.com/android-errors/app-not-installed/?source=play console&verified=true');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEncode = () => {
    try {
      setError('');
      setOutput(encodeURIComponent(input));
    } catch (err) {
      setError('Encoding failed.');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      setOutput(decodeURIComponent(input));
    } catch (err) {
      setError('Decoding failed: Invalid URL query sequence.');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">URL Query Encoder & Decoder</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Easily encode redirect paths, parameters, callback URLs, and Android deep link structures to ensure safe transfer across web layers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Raw / Encoded URL Input</label>
          <textarea 
            rows={5} value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full font-mono text-sm p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Type URL or query parameter here..."
          />
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={handleEncode}
              className="px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition"
            >
              URL Encode
            </button>
            <button 
              onClick={handleDecode}
              className="px-4 py-2 text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold rounded-lg transition"
            >
              URL Decode
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between">
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Result</label>
            {error ? (
              <div className="p-3 border border-red-250 bg-red-50 text-red-700 rounded-lg text-xs font-mono">
                ⚠ {error}
              </div>
            ) : (
              <textarea 
                readOnly rows={5} value={output} 
                className="w-full font-mono text-sm p-3 border border-zinc-200 dark:border-zinc-850 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-350 rounded-lg focus:outline-none"
                placeholder="Encoded or decoded output will display here..."
              />
            )}
          </div>

          {!error && output && (
            <button 
              onClick={() => {
                navigator.clipboard.writeText(output);
                alert('Copied to clipboard!');
              }}
              className="w-full mt-2 py-2 border border-zinc-200 hover:border-emerald-500 dark:border-zinc-800 text-xs font-bold rounded-lg transition text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900"
            >
              Copy Output Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
