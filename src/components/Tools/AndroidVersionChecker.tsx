import React, { useState } from 'react';

interface AndroidVersion {
  api: number;
  name: string;
  codename: string;
  releaseDate: string;
  playStoreReq: string;
  status: 'Active' | 'Deprecated' | 'Unsupported';
  description: string;
}

const versions: AndroidVersion[] = [
  { api: 36, name: 'Android 16', codename: 'Baklava', releaseDate: 'Q2 2025 (Preview)', playStoreReq: 'Future Target SDK (2026)', status: 'Active', description: 'Introduces advanced notification controls, stricter foreground service type declarations, and refined sandboxing rules.' },
  { api: 35, name: 'Android 15', codename: 'Vanilla Ice Cream', releaseDate: 'August 2024', playStoreReq: 'Mandatory Target SDK starting Aug 2025', status: 'Active', description: 'Enforces edge-to-edge layout drawing, improved single-tap NFC flows, and detailed storage permissions.' },
  { api: 34, name: 'Android 14', codename: 'Upside Down Cake', releaseDate: 'October 2023', playStoreReq: 'Current Minimum Target SDK (Aug 2024 - Aug 2025)', status: 'Active', description: 'Introduces strict dynamic broadcast receiver registrations and exact alarm policies.' },
  { api: 33, name: 'Android 13', codename: 'Tiramisu', releaseDate: 'August 2022', playStoreReq: 'Legacy Target SDK', status: 'Active', description: 'Splits media permissions into images, video, and audio; introduces POST_NOTIFICATIONS runtime prompts.' },
  { api: 32, name: 'Android 12L', codename: 'Snow Cone v2', releaseDate: 'March 2022', playStoreReq: 'Unsupported Target SDK', status: 'Deprecated', description: 'Optimizations for foldable devices, tablets, and large displays.' },
  { api: 31, name: 'Android 12', codename: 'Snow Cone', releaseDate: 'October 2021', playStoreReq: 'Unsupported Target SDK', status: 'Deprecated', description: 'Material You UI engines, splashscreen API integration, and Bluetooth permissions splits.' },
  { api: 30, name: 'Android 11', codename: 'Red Velvet Cake', releaseDate: 'September 2020', playStoreReq: 'Unsupported Target SDK', status: 'Deprecated', description: 'Enforces Scoped Storage files rules and dynamic one-time runtime permission controls.' },
  { api: 29, name: 'Android 10', codename: 'Quince Tart', releaseDate: 'September 2019', playStoreReq: 'Unsupported Target SDK', status: 'Deprecated', description: 'Introduces system-wide Dark Theme toggles and storage permissions pivots.' },
  { api: 28, name: 'Android 9', codename: 'Pie', releaseDate: 'August 2018', playStoreReq: 'Unsupported Target SDK', status: 'Unsupported', description: 'Blocks cleartext HTTP unencrypted networks by default; introduces Wi-Fi RTT tracking.' },
  { api: 26, name: 'Android 8.0 / 8.1', codename: 'Oreo', releaseDate: 'August 2017', playStoreReq: 'Unsupported Target SDK', status: 'Unsupported', description: 'Introduces Notification Channels, background services limits, and autofill.' }
];

export default function AndroidVersionChecker() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = versions.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.codename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.api.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">Android Version & API Level Matrix</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Quickly cross-reference Android OS versions, numeric API levels, internal dessert codenames, release dates, and Google Play target policies.
      </p>

      <div className="mb-4">
        <input 
          type="text"
          placeholder="Filter by API Level, Version, Codename (e.g., 34, Android 15, Cake)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <th className="py-3 px-4 font-semibold">API Level</th>
              <th className="py-3 px-4 font-semibold">OS Version</th>
              <th className="py-3 px-4 font-semibold">Codename</th>
              <th className="py-3 px-4 font-semibold">Release Date</th>
              <th className="py-3 px-4 font-semibold">Play Store Policy</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
            {filtered.map((v) => (
              <tr key={v.api} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition">
                <td className="py-4 px-4 font-mono font-bold text-zinc-900 dark:text-white">{v.api}</td>
                <td className="py-4 px-4 font-medium text-zinc-800 dark:text-zinc-200">{v.name}</td>
                <td className="py-4 px-4 text-zinc-500 dark:text-zinc-400">{v.codename}</td>
                <td className="py-4 px-4 text-zinc-500 dark:text-zinc-400">{v.releaseDate}</td>
                <td className="py-4 px-4 text-xs text-zinc-600 dark:text-zinc-350">{v.playStoreReq}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    v.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' :
                    v.status === 'Deprecated' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300' :
                    'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
