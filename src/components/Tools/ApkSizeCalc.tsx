import React, { useState } from 'react';

export default function ApkSizeCalc() {
  const [imagesSize, setImagesSize] = useState<number>(5); // MB
  const [librariesSize, setLibrariesSize] = useState<number>(3); // MB
  const [dexSize, setDexSize] = useState<number>(2); // MB
  const [resourcesSize, setResourcesSize] = useState<number>(1.5); // MB
  const [assetsSize, setAssetsSize] = useState<number>(1); // MB
  const [minify, setMinify] = useState<boolean>(true);
  const [shrink, setShrink] = useState<boolean>(true);

  // Estimations
  const rawTotal = imagesSize + librariesSize + dexSize + resourcesSize + assetsSize;
  const reductionFactor = (minify ? 0.45 : 0) + (shrink ? 0.25 : 0);
  const codeOverhead = librariesSize + dexSize;
  const compressedCode = codeOverhead * (1 - (minify ? 0.35 : 0));
  const compressedImages = imagesSize * (1 - (shrink ? 0.5 : 0.1)); // Compress pngs
  const compressedAssets = assetsSize * 0.95; // Assets are compressed in zip
  const compressedResources = resourcesSize * (1 - (shrink ? 0.3 : 0.05));
  
  const estimatedApkSize = compressedCode + compressedImages + compressedAssets + compressedResources;
  const savings = rawTotal - estimatedApkSize;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-zinc-950 dark:text-white">APK Size Estimator & Optimizer</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Simulate your Android build sizes and estimate how compiling with Proguard, R8 Code Shrinker, and modern image formats (WebP) affects final file sizes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input sliders */}
        <div className="space-y-4">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm border-b pb-2">App Component Weights (MB)</h4>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">Images & Drawables: {imagesSize} MB</span>
            </div>
            <input 
              type="range" min="0" max="50" step="0.5" value={imagesSize} 
              onChange={(e) => setImagesSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">Native Libraries (.so / C++): {librariesSize} MB</span>
            </div>
            <input 
              type="range" min="0" max="50" step="0.5" value={librariesSize} 
              onChange={(e) => setLibrariesSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">Compiled Code (DEX files): {dexSize} MB</span>
            </div>
            <input 
              type="range" min="0.5" max="20" step="0.5" value={dexSize} 
              onChange={(e) => setDexSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">XML Layouts & Resources: {resourcesSize} MB</span>
            </div>
            <input 
              type="range" min="0.1" max="10" step="0.1" value={resourcesSize} 
              onChange={(e) => setResourcesSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">Static Web Assets (www / HTML / JS): {assetsSize} MB</span>
            </div>
            <input 
              type="range" min="0" max="50" step="0.5" value={assetsSize} 
              onChange={(e) => setAssetsSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded"
            />
          </div>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm border-b pt-2 pb-2">Optimization Flags</h4>
          <div className="space-y-2">
            <label className="flex items-center text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input 
                type="checkbox" checked={minify} 
                onChange={(e) => setMinify(e.target.checked)}
                className="rounded text-emerald-500 mr-2 border-zinc-300 focus:ring-emerald-500"
              />
              Enable Proguard / R8 Minification (Shrink code & rename symbols)
            </label>
            <label className="flex items-center text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input 
                type="checkbox" checked={shrink} 
                onChange={(e) => setShrink(e.target.checked)}
                className="rounded text-emerald-500 mr-2 border-zinc-300 focus:ring-emerald-500"
              />
              Enable shrinkResources & WebP Compression (Removes unused XML)
            </label>
          </div>
        </div>

        {/* Results display */}
        <div className="flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 p-6 rounded-xl border border-zinc-150 dark:border-zinc-850">
          <div>
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-4">Estimated APK Build Breakdown</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Uncompressed Total:</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{rawTotal.toFixed(2)} MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Estimated ZIP Compression Savings:</span>
                <span className="font-medium text-emerald-600">-{savings.toFixed(2)} MB</span>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-800 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-zinc-900 dark:text-white">Estimated .APK Size:</span>
                <span className="text-emerald-500">{estimatedApkSize.toFixed(2)} MB</span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
              <span className="font-bold block mb-1">🔥 AppFixGuide Recommendation:</span>
              {estimatedApkSize > 50 ? (
                <span>Your estimated size exceeds 50MB. We recommend converting your media resources to WebP/MP3 format and hosting larger media assets online rather than inside the local APK directory. Use Android App Bundles (AAB) to let Play Store strip extra CPU architectures.</span>
              ) : (
                <span>Your estimated APK size looks great and is safe for high download conversion rates in target countries (India, US, etc.)! Ensure your release builds keep minifyEnabled active.</span>
              )}
            </div>
          </div>

          <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-4 text-center">
            * This is an automated mathematical simulation based on compiler compression ratios.
          </div>
        </div>
      </div>
    </div>
  );
}
