import React, { useState } from 'react';

interface HttpStatusDetail {
  code: number;
  title: string;
  category: string;
  meaning: string;
  androidImpact: string;
  solution: string;
}

const statusDatabase: Record<number, HttpStatusDetail> = {
  400: {
    code: 400,
    title: 'Bad Request',
    category: 'Client Error',
    meaning: 'The server could not understand the request due to invalid syntax, missing parameters, or corrupt payload formatting.',
    androidImpact: 'Typically triggers an HTTP Client exception inside Retrofit, Volley or OkHttp. Will trigger webview onReceivedError on older engines.',
    solution: 'Verify your JSON payload structure. Check that keys match server-side serialization classes exactly. Ensure content-type is set to "application/json".'
  },
  401: {
    code: 401,
    title: 'Unauthorized',
    category: 'Client Error',
    meaning: 'The request requires user authentication. Stored credentials have expired or are missing entirely.',
    androidImpact: 'Causes API connections to shut down, throwing HTTP 401. Inside WebViews, session cookies or local storage auth tokens are lost.',
    solution: 'Verify your Authorization header format (usually "Bearer <token>"). Check token expiration dates and implement an OkHttp Authenticator class to auto-refresh expired tokens.'
  },
  403: {
    code: 403,
    title: 'Forbidden',
    category: 'Client Error',
    meaning: 'The server understands who you are, but you do not have permission to access or write to this resource.',
    androidImpact: 'Retrofit raises an exception. WebViews might display raw server permissions warnings or blank windows.',
    solution: 'Verify your user role configurations. For Google APIs, ensure you registered your APK\'s SHA-1 signature fingerprint inside the Cloud Console developer registry.'
  },
  404: {
    code: 404,
    title: 'Not Found',
    category: 'Client Error',
    meaning: 'The resource or API endpoint requested does not exist on the hosting server.',
    androidImpact: 'Causes webviews to render ERR_FILE_NOT_FOUND or native 404 sheets. API endpoints return empty bodies.',
    solution: 'Check your API base URLs. Verify there are no duplicate slashes or spelling typos in path variables.'
  },
  500: {
    code: 500,
    title: 'Internal Server Error',
    category: 'Server Error',
    meaning: 'The server encountered an unexpected error on its end and crashed while trying to process the request.',
    androidImpact: 'Returns blank HTML or server logs inside Retrofit response bodies. WebViews will display blank screens.',
    solution: 'Verify your hosting server runtime logs. Ensure your database queries are optimized and do not timeout during heavy requests.'
  },
  502: {
    code: 502,
    title: 'Bad Gateway',
    category: 'Server Error',
    meaning: 'The gateway server received an invalid response from upstream servers.',
    androidImpact: 'API connections fail. Usually indicates hosting server is resetting or restarting.',
    solution: 'Check server hosting health panels. Ensure backend proxy servers (like Nginx) are configured correctly.'
  },
  503: {
    code: 503,
    title: 'Service Unavailable',
    category: 'Server Error',
    meaning: 'The server is temporarily overloaded or down for maintenance.',
    androidImpact: 'Connections timeout. App displays loading loops indefinitely.',
    solution: 'Implement exponential-backoff retries inside your Android HTTP client code so the app automatically retries when the server returns online.'
  }
};

export default function HttpStatusCodeChecker() {
  const [code, setCode] = useState<number>(404);

  const getDetail = (): HttpStatusDetail => {
    if (statusDatabase[code]) {
      return statusDatabase[code];
    }
    return {
      code,
      title: 'Custom HTTP Status',
      category: code >= 500 ? 'Server Error' : code >= 400 ? 'Client Error' : code >= 300 ? 'Redirect' : 'Success',
      meaning: 'Custom HTTP response code returned by your API.',
      androidImpact: 'May trigger fallback handlers or basic connection exceptions in your Android networking interfaces.',
      solution: `Check standard WCAG HTTP status code protocols. Verify endpoint outputs correspond to code ${code}.`
    };
  };

  const current = getDetail();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">HTTP Status Code Diagnostics</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Diagnose the meaning of specific HTTP status response codes inside Android, Retrofit connections, and WebView configurations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
            Enter HTTP Status Code
          </label>
          <input 
            type="number" min="100" max="599" value={code} 
            onChange={(e) => setCode(parseInt(e.target.value) || 404)}
            className="w-full px-4 py-2 text-lg font-bold border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          
          <div className="mt-4 space-y-2">
            <span className="text-xs font-semibold text-zinc-400 block">Quick Examples:</span>
            <div className="flex flex-wrap gap-2">
              {[400, 401, 403, 404, 500, 503].map((c) => (
                <button 
                  key={c} onClick={() => setCode(c)}
                  className="px-2 py-1 text-xs border rounded bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 transition"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-xl border border-zinc-150 dark:border-zinc-850 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center">
              <span className="font-mono bg-zinc-200 dark:bg-zinc-900 px-3 py-1 rounded text-emerald-500 mr-2">{current.code}</span>
              {current.title}
            </h4>
            <span className="text-xs uppercase font-bold text-zinc-400">{current.category}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-zinc-400 block uppercase">What it means:</span>
            <p className="text-sm text-zinc-700 dark:text-zinc-350">{current.meaning}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-zinc-400 block uppercase">Android App / WebView Impact:</span>
            <p className="text-sm text-zinc-700 dark:text-zinc-350">{current.androidImpact}</p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded-lg">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block uppercase mb-1">How to fix on Android:</span>
            <p className="text-sm text-emerald-800 dark:text-emerald-300">{current.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
