import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
const isRealApiKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '';

if (isRealApiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini API client initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize Gemini API client:', err);
  }
} else {
  console.log('Using simulated fallback mode for AI Error Analyzer (No valid GEMINI_API_KEY set).');
}

// 1. AI ANALYZER API ENDPOINT
app.post('/api/analyze-error', async (req, res) => {
  const { errorMessage, deviceVersion, appType, description } = req.body;

  if (!errorMessage) {
    return res.status(400).json({ error: 'Error message is required for analysis' });
  }

  // If real API key is active, use Gemini 3.7-Flash
  if (ai) {
    try {
      const prompt = `You are AppFixGuide AI, a senior Android developer, compiler engineer, and troubleshooting specialist. 
Analyze the following Android application error and compile failure details:
- Raw Error/Logcat: "${errorMessage}"
- Device / Android Version: "${deviceVersion || 'Unknown'}"
- App Wrapper / Tech Stack: "${appType || 'Unknown'}"
- User Description: "${description || 'None'}"

Provide a structured analysis in JSON format matching the schema below. 
Do not include any Markdown or formatting wraps (like \`\`\`json). Just return the raw JSON object.

Schema:
{
  "title": "A short, precise title for the error",
  "meaning": "What this error actually means in simple terms",
  "cause": "A detailed explanation of the likely root cause",
  "steps": ["Step 1...", "Step 2...", "Step 3..."],
  "alternatives": ["Alternative approach 1...", "Alternative approach 2..."],
  "prevention": ["Prevention tip 1...", "Prevention tip 2..."],
  "related": ["Related Android error name 1", "Related Android error name 2"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText.trim());
        return res.json({ ...parsed, isFallback: false });
      } catch (parseErr) {
        console.error('Failed to parse Gemini JSON output, sending raw:', responseText);
        // Fallback JSON packaging
        return res.json({
          title: 'Android Error Analysis Complete',
          meaning: 'We processed the error log, but formatting issues occurred.',
          cause: responseText,
          steps: ['Check network endpoints', 'Verify target SDK compilations'],
          alternatives: [],
          prevention: [],
          related: [],
          isFallback: false
        });
      }
    } catch (apiErr: any) {
      console.error('Gemini API error occurred, falling back to local solver:', apiErr);
    }
  }

  // HIGH-FIDELITY FALLBACK / SIMULATION SOLVER (If key missing or API down)
  const lowerMsg = errorMessage.toLowerCase();
  let fallbackData = {
    title: 'General Android Compilation Exception',
    meaning: 'The application build or run task encountered an unclassified exception, common during dependencies resolution.',
    cause: 'The active build script cannot assemble dependencies, or there is an unhandled resource syntax issue in your manifest.',
    steps: [
      'Clean and sync the project files: run "./gradlew clean" then "Sync Project with Gradle Files" inside Android Studio.',
      'Check that your targetSdkVersion in app/build.gradle is 34 or above.',
      'Examine the manifest merger logs to isolate any duplicate activity mappings or style collisions.'
    ],
    alternatives: [
      'Temporarily disable custom third-party plugins in build.gradle to identify which library is crashing compiler.'
    ],
    prevention: [
      'Always keep dependencies updated to stable release versions rather than alpha/beta channels.',
      'Build using Android App Bundles (AAB) to ensure universal layout matching.'
    ],
    related: ['Gradle Build Failed', 'Manifest Merger Failed'],
    isFallback: true
  };

  if (lowerMsg.includes('not installed') || lowerMsg.includes('sideload') || lowerMsg.includes('install_failed')) {
    fallbackData = {
      title: 'App Not Installed Error (Sideload Conflict)',
      meaning: 'Your device blocks the APK from installing because of signing certificate mismatches, storage leaks, or architecture issues.',
      cause: 'An existing version of this app signed with a different certificate is already on your device, or the phone runs a 64-bit-only processor while the APK was compiled for 32-bit only.',
      steps: [
        'Completely uninstall any existing version of the app (including any work profiles or dual apps).',
        'Check Settings > Storage to verify you have at least 500MB of free disk space.',
        'Open Google Play Store > Play Protect > Gear icon, and temporarily disable Play Protect scans to bypass unrecognized signature warnings.'
      ],
      alternatives: [
        'Install the application via ADB shell commands: run "adb install -r -d my_app.apk" to view low-level installation abort codes.'
      ],
      prevention: [
        'Always sign consecutivel releases with the same release Keystore file.',
        'Adopt AAB bundles so Google Play compiles matching architectures for each user.'
      ],
      related: ['APK Installation Failed', 'Parse Error', '64-bit Requirement Error'],
      isFallback: true
    };
  } else if (lowerMsg.includes('parse') || lowerMsg.includes('parsing')) {
    fallbackData = {
      title: 'Parse Error: There Was a Problem Parsing the Package',
      meaning: 'The Android system installer cannot decode the APK\'s manifest or archive files.',
      cause: 'The download is incomplete, the file got corrupted, or the app\'s minSdkVersion requires a newer Android version than your device supports.',
      steps: [
        'Redownload the APK on a stable, fast internet connection and verify the file size matches perfectly.',
        'Check the phone\'s Android version under Settings > About Phone, and verify it is equal to or higher than the app\'s required minSdkVersion.',
        'Check that the file ends precisely in .apk (rename it if it ended up as .apk.zip).'
      ],
      alternatives: [
        'Ask the developer to lower the minSdkVersion to 21 or 24 and compile a fresh build.'
      ],
      prevention: [
        'Enforce minSdkVersion 21 or 24 as a reliable lower-bound standard.',
        'Avoid interrupting file uploads when distributing binaries.'
      ],
      related: ['App Not Installed', 'APK Is Not Compatible', 'Minimum SDK Error'],
      isFallback: true
    };
  } else if (lowerMsg.includes('webview') || lowerMsg.includes('blank') || lowerMsg.includes('white screen')) {
    fallbackData = {
      title: 'WebView Rendering Exception (Blank Screen)',
      meaning: 'The embedded WebView component instantiated successfully but remains completely empty, white, or fails to execute JavaScript.',
      cause: 'JavaScript is disabled by default in Android WebViews, or the target web application makes requests to insecure http:// endpoints blocked by modern security rules.',
      steps: [
        'In your Java/Kotlin Activity file, ensure JavaScript is explicitly enabled: "webView.getSettings().setJavaScriptEnabled(true);".',
        'Enable DOM storage support: "webView.getSettings().setDomStorageEnabled(true);".',
        'Confirm the device is connected to the internet and check if you added "<uses-permission android:name=\\"android.permission.INTERNET\\" />" to your manifest.'
      ],
      alternatives: [
        'Upgrade all HTTP URLs inside your loading strings to secure HTTPS protocols to bypass Cleartext rules.'
      ],
      prevention: [
        'Always configure custom WebChromeClient alerts to catch JavaScript execution logs.',
        'Enable hardware acceleration in AndroidManifest: set android:hardwareAccelerated="true".'
      ],
      related: ['WebView Loading Error', 'Cleartext HTTP Traffic Not Permitted', 'LocalStorage Error in WebView'],
      isFallback: true
    };
  } else if (lowerMsg.includes('gradle') || lowerMsg.includes('build failed') || lowerMsg.includes('compile')) {
    fallbackData = {
      title: 'Gradle Compilation Task Failure',
      meaning: 'The Gradle build engine encountered a compile-time block or dependency conflict.',
      cause: 'Outdated build tool wrappers, syntax errors inside build.gradle scripts, or duplicate classpath imports under transitive dependencies.',
      steps: [
        'In Android Studio, click Build > Clean Project, then select File > Sync Project with Gradle Files.',
        'If using Kotlin/Java, verify your JDK version under Settings > Build Tools > Gradle matches your AGP expectations (e.g. JDK 17 for AGP 8).',
        'Add "android.enableJetifier=true" and "android.useAndroidX=true" inside your gradle.properties file.'
      ],
      alternatives: [
        'In terminal, compile with full logging active: run "./gradlew assembleDebug --stacktrace --info" to see exact crashing files.'
      ],
      prevention: [
        'Avoid manual configurations inside generated build files.',
        'Keep Gradle and Android Gradle Plugin versions closely synchronized.'
      ],
      related: ['Gradle Sync Failed', 'Duplicate Class Error', 'Android Studio Build Error'],
      isFallback: true
    };
  }

  return res.json(fallbackData);
});

// 2. ROBOTS.TXT ENDPOINT
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

# Exclude dynamic/internal API routes from indexation
Disallow: /api/
Disallow: /admin

Sitemap: https://appfixguide.com/sitemap.xml
`);
});

// 3. SITEMAP.XML ENDPOINT
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://appfixguide.com/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Categories -->
  <url>
    <loc>https://appfixguide.com/errors/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Tools -->
  <url>
    <loc>https://appfixguide.com/tools/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Guides -->
  <url>
    <loc>https://appfixguide.com/guides/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- AI Analyzer -->
  <url>
    <loc>https://appfixguide.com/ai-analyzer/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Submit Error -->
  <url>
    <loc>https://appfixguide.com/submit-error/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Popular Error Pages -->
  <url>
    <loc>https://appfixguide.com/android-errors/app-not-installed/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://appfixguide.com/android-errors/parse-error/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://appfixguide.com/webview-errors/blank-screen/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`);
});

// 4. MANIFEST.JSON (PWA Setup)
app.get('/manifest.json', (req, res) => {
  res.json({
    short_name: 'AppFixGuide',
    name: 'AppFixGuide - Android & APK Error Solutions',
    icons: [
      {
        src: 'https://cdn-icons-png.flaticon.com/512/3437/3437364.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: 'https://cdn-icons-png.flaticon.com/512/3437/3437364.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    start_url: '/',
    background_color: '#09090b',
    theme_color: '#10b981',
    display: 'standalone',
    orientation: 'portrait'
  });
});

// Vite Middleware for Development vs. Production static delivery
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AppFixGuide Server running on port ${PORT}`);
  });
};

startServer();
