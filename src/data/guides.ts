import { Guide } from '../types';

export const guides: Guide[] = [
  {
    slug: 'how-to-install-apk',
    title: 'How to Install APK Files on Android (Complete Guide)',
    hindiTitle: 'एंड्रॉइड पर एपीके (APK) फ़ाइलें कैसे इंस्टॉल करें (पूर्ण गाइड)',
    summary: 'A step-by-step beginner guide to safely sideload and install APK files on any Android smartphone, including handling permissions.',
    hindiSummary: 'एंड्रॉइड स्मार्टफोन पर एपीके (APK) फ़ाइलों को सुरक्षित रूप से इंस्टॉल करने का आसान तरीका।',
    category: 'Guides',
    estimatedTime: '5 mins',
    lastUpdated: 'August 2026',
    content: `Installing an APK (Android Package) file is a straightforward process, but Android restricts it by default for safety. Follow this step-by-step guide to do it properly.

### Step 1: Enable 'Install Unknown Apps' Permission
Since Android 8.0 Oreo, permission is granted on an app-by-app basis.
1. Open Settings on your Android device.
2. Tap Apps or Apps & Notifications.
3. Select Special app access (usually located in Advanced settings).
4. Tap Install unknown apps.
5. Select the browser (e.g., Chrome) or file explorer you will use to download/open the APK, and toggle Allow from this source to ON.

### Step 2: Download and Verify the APK File
1. Download the APK file only from trusted sources (like APKMirror, official developer portals).
2. Avoid modified (modded) APKs as they can contain malware.

### Step 3: Open and Run Sideload
1. Launch your File Manager app and navigate to your Downloads folder.
2. Tap on the '.apk' file.
3. A system pop-up will ask, 'Do you want to install this application?'.
4. Tap Install and wait for the completion message.
5. Tap Open to launch your newly sideloaded app.`
  },
  {
    slug: 'how-to-create-aab',
    title: 'How to Generate and Sign Android App Bundles (AAB) in Android Studio',
    hindiTitle: 'एंड्रॉइड स्टूडियो में एंड्रॉइड ऐप बंडल (AAB) कैसे बनाएं और साइन करें',
    summary: 'A guide for developers to compile, sign, and export secure Android App Bundles for publishing to the Google Play Store.',
    hindiSummary: 'डेवलपर्स के लिए प्ले स्टोर पर पब्लिश करने हेतु एंड्रॉइड ऐप बंडल (AAB) संकलित और साइन करने की विधि।',
    category: 'Guides',
    estimatedTime: '8 mins',
    lastUpdated: 'August 2026',
    content: `The Android App Bundle (.aab) is the mandatory publishing format for Google Play. Google Play uses it to generate and serve optimized APK splits tailored to each device's configuration.

### Step 1: Configure App Level build.gradle
Ensure your package names, signing config blocks, and version metrics are properly configured.

android {
    compileSdk 34
    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
}

### Step 2: Generate Signed Bundle
1. Open your project inside Android Studio.
2. From the top menu, go to Build > Generate Signed Bundle / APK...
3. Select Android App Bundle and click Next.
4. Create a new Keystore file ('.jks') or locate your existing developer key.
5. Provide secure passwords, define key alias names, and tap Next.
6. Set the Destination folder and select release build variant.
7. Click Create!

### Step 3: Uploading AAB to Play Console
1. Log in to the Google Play Console.
2. Go to your active Application, navigate to Production or Testing.
3. Create a new Release, and drag-and-drop the generated '.aab' bundle from your destination folder.
4. Verify signature parsing completes successfully.`
  },
  {
    slug: 'how-to-fix-webview',
    title: 'How to Fix Common Android WebView Rendering & Loading Errors',
    hindiTitle: 'एंड्रॉइड वेबव्यू (WebView) रेंडरिंग और लोडिंग त्रुटियों को कैसे ठीक करें',
    summary: 'A technical troubleshooting article for hybrid app developers explaining blank screens, security exceptions, and local assets loading failures inside WebViews.',
    hindiSummary: 'हाइब्रिड ऐप डेवलपर्स के लिए वेबव्यू ब्लैंक स्क्रीन, सिक्योरिटी एक्सेप्शन और लोकल एसेट्स की लोडिंग समस्याओं का निवारण।',
    category: 'Guides',
    estimatedTime: '10 mins',
    lastUpdated: 'August 2026',
    content: `WebViews are standard container wrappers that render HTML, CSS, and JS web content inside native Android app wrappers. They are widely used but can be highly temperamental. Here is how to fix common bugs.

### 1. Enabling Critical Web Settings
By default, the Android WebView blocks JavaScript execution, which breaks modern web frameworks like React or Vue.

WebView webView = findViewById(R.id.webview);
WebSettings settings = webView.getSettings();

// Must enable Javascript for modern client frameworks
settings.setJavaScriptEnabled(true);

// Must enable DOM Storage for LocalStorage and SessionStorage hooks
settings.setDomStorageEnabled(true);

### 2. Handling the 'Cleartext HTTP Traffic Not Permitted' Error
If your web assets or API URLs run on http:// protocols, Android 9+ blocks loading for security.
* Recommended solution: Upgrade server endpoint routes to secure https:// SSL.
* Bypass configuration (Local testing only): Add android:usesCleartextTraffic="true" to the <application> block of AndroidManifest.xml.

### 3. Setting Up a Custom WebViewClient for Loading State
Always use a custom client to capture redirects or show custom error pages to avoid blank screens.

webView.setWebViewClient(new WebViewClient() {
    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        // Load custom local fallback page instead of native browser crash page
        view.loadUrl("file:///android_asset/offline_fallback.html");
    }
});

### 4. Hardware Acceleration for Laggy Rendering
If scrolling or CSS transitions feel sluggish inside your app, enable hardware acceleration in the manifest:

<application
    android:hardwareAccelerated="true"
    ... >`
  }
];
