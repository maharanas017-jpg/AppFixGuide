import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import ApkSizeCalc from '../components/Tools/ApkSizeCalc';
import SdkVersionHelper from '../components/Tools/SdkVersionHelper';
import PackageNameGenerator from '../components/Tools/PackageNameGenerator';
import HttpStatusCodeChecker from '../components/Tools/HttpStatusCodeChecker';
import JsonFormatter from '../components/Tools/JsonFormatter';
import Base64Tool from '../components/Tools/Base64Tool';
import UrlTool from '../components/Tools/UrlTool';
import UserAgentTester from '../components/Tools/UserAgentTester';

export default function ToolsView() {
  const { t, language } = useLanguage();
  const [activeTool, setActiveTool] = useState<string>('apk-calc');

  const tools = [
    { id: 'apk-calc', name: 'APK Size Estimator', desc: 'Simulate file size savings & compressions', icon: '📦' },
    { id: 'sdk-helper', name: 'SDK Compliance Helper', desc: 'Check targetSdk/minSdk policies', icon: '🤖' },
    { id: 'pkg-gen', name: 'Package ID Generator', desc: 'Create unique Android Application IDs', icon: '🆔' },
    { id: 'http-diag', name: 'HTTP Status Diagnostics', desc: 'Troubleshoot WebView & network APIs', icon: '🌐' },
    { id: 'json-format', name: 'JSON Formatter', desc: 'Validate configuration payloads', icon: '⚙️' },
    { id: 'base64', name: 'Base64 Encoder', desc: 'Encode credentials & auth headers', icon: '🔒' },
    { id: 'url-tool', name: 'URL Query Tool', desc: 'Sanitize deep links and parameters', icon: '🔗' },
    { id: 'ua-tester', name: 'User-Agent Tester', desc: 'Inspect Android WebView user agents', icon: '📱' }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-8 flex-1 flex flex-col">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {t('toolsTitle')}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          {t('toolsSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Navigation (Tool List) */}
        <div className="lg:col-span-4 space-y-2">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-center space-x-3 text-left ${
                activeTool === tool.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-950 dark:text-emerald-300'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-900 dark:text-white'
              }`}
            >
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{tool.name}</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side (Active Tool Rendering) */}
        <div className="lg:col-span-8">
          {activeTool === 'apk-calc' && <ApkSizeCalc />}
          {activeTool === 'sdk-helper' && <SdkVersionHelper />}
          {activeTool === 'pkg-gen' && <PackageNameGenerator />}
          {activeTool === 'http-diag' && <HttpStatusCodeChecker />}
          {activeTool === 'json-format' && <JsonFormatter />}
          {activeTool === 'base64' && <Base64Tool />}
          {activeTool === 'url-tool' && <UrlTool />}
          {activeTool === 'ua-tester' && <UserAgentTester />}
        </div>
      </div>
    </div>
  );
}
