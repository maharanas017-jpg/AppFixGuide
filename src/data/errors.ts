import { AndroidError } from '../types';

export const categories = {
  'android-errors': 'Android System Errors',
  'apk-errors': 'APK Installation Errors',
  'aab-errors': 'AAB & Bundle Errors',
  'webview-errors': 'WebView & Web App Errors',
  'gradle-errors': 'Gradle & Compilation Errors',
  'netlify-errors': 'Netlify & Web Hosting Errors',
  'permissions-errors': 'Android Permission Errors',
  'publishing-errors': 'App Store & Google Play Errors',
  'api-errors': 'API & Network Connection Errors',
  'sdk-errors': 'SDK & Android Version Errors'
};

export const errorsDatabase: AndroidError[] = [
  {
    id: '1',
    title: 'App Not Installed Error',
    hindiTitle: 'ऐप इंस्टॉल नहीं हुआ (App Not Installed) त्रुटि',
    slug: 'app-not-installed',
    category: 'apk-errors',
    summary: 'The target APK could not be installed because of compatibility, existing signature conflicts, or damaged build package.',
    hindiSummary: 'लक्षित एपीके (APK) संगतता (compatibility), मौजूदा हस्ताक्षर (signature) संघर्ष, या क्षतिग्रस्त पैकेज के कारण इंस्टॉल नहीं हो सका।',
    difficulty: 'Easy',
    estimatedTime: '5-10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'An existing version of the app with a different developer signature is already installed.',
      'The APK is corrupted or was compiled incorrectly.',
      'The APK is incompatible with the device\'s processor architecture (e.g. 64-bit only on older devices).',
      'The app target SDK version is higher than the device\'s operating system level.'
    ],
    hindiCauses: [
      'अलग डेवलपर सिग्नेचर वाले ऐप का एक पुराना वर्शन पहले से इंस्टॉल है।',
      'एपीके दूषित (corrupted) है या ठीक से संकलित (compile) नहीं किया गया है।',
      'एपीके डिवाइस के प्रोसेसर आर्किटेक्चर के साथ असंगत है।',
      'ऐप का टारगेट एसडीके (SDK) वर्शन डिवाइस के ऑपरेटिंग सिस्टम से अधिक है।'
    ],
    symptoms: [
      'A modal shows "App not installed" after tapping Install.',
      'Installation fails silently when installing via adb or external managers.'
    ],
    hindiSymptoms: [
      'इंस्टॉल पर टैप करने के बाद "ऐप इंस्टॉल नहीं हुआ" दिखाई देता है।',
      'adb या एक्सटर्नल मैनेजर के ज़रिए इंस्टॉल करने पर चुपचाप फेल हो जाता है।'
    ],
    solutions: [
      {
        title: 'Remove Conflicting Installed App',
        steps: [
          'Go to Settings > Apps on your Android device.',
          'Find the existing version of the application and tap Uninstall.',
          'If this is a work profile, make sure it is uninstalled for all users via Settings > Apps > App Info > Three Dots > Uninstall for all users.',
          'Re-attempt the installation of the new APK.'
        ]
      },
      {
        title: 'Enable Unknown Sources Permission',
        steps: [
          'Go to Settings > Security or Apps & Notifications.',
          'Select "Special app access" or "Install unknown apps".',
          'Toggle and enable permission for the browser or file explorer you are using to trigger the install.'
        ]
      }
    ],
    hindiSolutions: [
      {
        title: 'पुराने टकराव वाले ऐप को अनइंस्टॉल करें',
        steps: [
          'अपने एंड्रॉइड डिवाइस पर सेटिंग्स > ऐप्स में जाएं।',
          'मौजूदा ऐप खोजें और अनइंस्टॉल पर टैप करें।',
          'यदि वर्क प्रोफ़ाइल है, तो "सभी उपयोगकर्ताओं के लिए अनइंस्टॉल" (Uninstall for all users) विकल्प चुनें।',
          'अब नए एपीके को फिर से इंस्टॉल करें।'
        ]
      }
    ],
    prevention: [
      'Always sign consecutive builds with the same keystore file.',
      'Validate your target and minimum SDK properties in gradle configuration.',
      'Verify the APK payload isn\'t truncated during file transfer.'
    ],
    hindiPrevention: [
      'हमेशा एक ही कीस्टोर (keystore) फ़ाइल से सभी अपडेट्स को साइन करें।',
      'ग्रेडल (gradle) सेटिंग्स में मिनिमम और टारगेट एसडीके को सही रखें।'
    ],
    faq: [
      {
        q: 'Does "App Not Installed" mean the APK has a virus?',
        a: 'No, it is usually a signature mismatch or OS version incompatibility rather than a security threat.'
      }
    ],
    relatedErrors: ['parse-error', 'apk-not-installing', 'invalid-apk']
  },
  {
    id: '2',
    title: 'There Was a Problem Parsing the Package (Parse Error)',
    hindiTitle: 'पैकेज पार्स करने में समस्या (Parse Error)',
    slug: 'parse-error',
    category: 'apk-errors',
    summary: 'Occurs when the Android OS cannot read the package manifest or APK contents because the file is corrupted, incomplete, or meant for a newer Android version.',
    hindiSummary: 'यह तब होता है जब एंड्रॉइड ओएस पैकेज मैनिफेस्ट या एपीके सामग्री को नहीं पढ़ पाता क्योंकि फ़ाइल दूषित या अधूरी है।',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The APK download is incomplete or corrupted.',
      'The minimum SDK version in AndroidManifest.xml is higher than your device\'s Android OS version.',
      'The APK was signed with an unsupported scheme for the device\'s Android version.'
    ],
    hindiCauses: [
      'एपीके डाउनलोड अधूरा या दूषित है।',
      'AndroidManifest.xml में मिनिमम SDK वर्शन मोबाइल के एंड्रॉइड वर्शन से अधिक है।',
      'एपीके को मोबाइल ओएस के साथ असंगत स्कीम द्वारा साइन किया गया है।'
    ],
    symptoms: [
      'Error message displaying "There was a problem parsing the package" on-screen.'
    ],
    solutions: [
      {
        title: 'Verify File Integrity and Redownload',
        steps: [
          'Check the file size of your APK. If it is smaller than expected, the download was likely interrupted.',
          'Download the APK file again from a stable internet connection.',
          'Verify using an MD5 or SHA256 checksum if available.'
        ]
      },
      {
        title: 'Check Android Version Compatibility',
        steps: [
          'Check your phone\'s current Android version under Settings > About Phone.',
          'Verify the APK\'s minimum SDK requirements. If the app requires Android 13 (API 33) and you are on Android 11, the OS cannot parse the app.'
        ]
      }
    ],
    prevention: [
      'Set minSdkVersion to a reasonable lower bound (e.g. 24 or 26) during Gradle compilation.',
      'Ensure binary file transfer uploads complete completely before distributing.'
    ],
    faq: [
      {
        q: 'Can I bypass a parse error on an old phone?',
        a: 'Only if the developer lowers the minSdkVersion and recompiles. Otherwise, the app uses APIs that do not exist on your device.'
      }
    ],
    relatedErrors: ['app-not-installed', 'apk-not-installing', 'minimum-sdk-error']
  },
  {
    id: '3',
    title: 'APK Won\'t Install',
    hindiTitle: 'एपीके इंस्टॉल नहीं हो रहा (APK Won\'t Install)',
    slug: 'apk-not-installing',
    category: 'apk-errors',
    summary: 'A general failure where launching an APK installer results in a sudden crash of the package installer app, frozen screens, or instant rollbacks.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Insufficient storage space to unpack and install the APK.',
      'Google Play Protect blocks the install due to an unrecognized signature.',
      'File permissions on the active installer/file manager app are missing.'
    ],
    solutions: [
      {
        title: 'Temporarily Disable Play Protect',
        steps: [
          'Open the Google Play Store app.',
          'Tap your profile icon in the upper right.',
          'Select "Play Protect" and tap the gear icon in the top right.',
          'Turn off "Scan apps with Play Protect" and try installing again.'
        ]
      },
      {
        title: 'Free Up Local Storage Space',
        steps: [
          'Go to Settings > Storage.',
          'Ensure you have at least double the size of the APK free on your internal storage (required for cache unpacking).'
        ]
      }
    ],
    prevention: [
      'Submit your application to the Google Play Console play protect whitelist.',
      'Publish compiled builds with official release signing keys.'
    ],
    faq: [],
    relatedErrors: ['app-not-installed', 'parse-error', 'storage-full-error']
  },
  {
    id: '4',
    title: 'APK Installation Failed',
    slug: 'apk-installation-failed',
    category: 'apk-errors',
    summary: 'Low-level shell errors returned during package installer execution, such as INSTALL_FAILED_CONFLICTING_PROVIDER.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Conflicting Content Provider authorities inside AndroidManifest.',
      'Corrupt app compilation settings or broken resources.'
    ],
    solutions: [
      {
        title: 'Fix Content Provider Authorities Conflict',
        steps: [
          'If you copied code from another app, ensure your `android:authorities` in the `<provider>` tags of AndroidManifest.xml are unique.',
          'Prefix your provider authorities with your unique package name: `android:authorities="${applicationId}.provider"`'
        ]
      }
    ],
    prevention: ['Use dynamic package variables for manifest entries.'],
    faq: [],
    relatedErrors: ['package-name-conflict', 'manifest-merger-failed']
  },
  {
    id: '5',
    title: 'APK Is Not Compatible',
    slug: 'apk-is-not-compatible',
    category: 'apk-errors',
    summary: 'The target device CPU architecture or hardware capabilities do not meet the minimum criteria specified in the APK build.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'APK is built strictly for 64-bit systems (arm64-v8a) while the device has a 32-bit OS (armeabi-v7a).',
      'The app requires specific hardware features (e.g. Camera autofocus, GPS) which are missing on the target tablet/device.'
    ],
    solutions: [
      {
        title: 'Obtain Multi-architecture (Universal) APK',
        steps: [
          'Re-build the application in Android Studio with support for both 32-bit and 64-bit ABIs.',
          'Make sure `ndk.abiFilters` in your build.gradle includes `armeabi-v7a`, `arm64-v8a`, `x86`, and `x86_64`.'
        ]
      }
    ],
    prevention: ['Build universal splits or use Android App Bundles (AAB) which automate CPU split matching.'],
    faq: [],
    relatedErrors: ['aab-upload-failed', '64-bit-error']
  },
  {
    id: '6',
    title: 'App Keeps Crashing',
    slug: 'app-keeps-crashing',
    category: 'android-errors',
    summary: 'The application starts but shuts down instantly or randomly with an "App has stopped" alert dialogue box.',
    difficulty: 'Medium',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Null Pointer Exceptions in Java/Kotlin logic.',
      'Out of memory errors due to processing overly large assets.',
      'Unresolved database migrations or SQLite column changes.'
    ],
    solutions: [
      {
        title: 'Clear Cache and Force Stop',
        steps: [
          'Long press the app icon on your screen and select "App Info".',
          'Tap "Storage & Cache" and select "Clear Cache".',
          'Tap "Force Stop" and try reopening.'
        ]
      },
      {
        title: 'Debug with Logcat (Developers)',
        steps: [
          'Connect the device to Android Studio and open the Logcat tab.',
          'Filter by the keyword "FATAL EXCEPTION" to find the stack trace and lines of code causing the runtime crash.'
        ]
      }
    ],
    prevention: ['Write unit tests, handle optional state values, and wrap network calls with try/catch blocks.'],
    faq: [],
    relatedErrors: ['app-immediately-closes', 'out-of-memory-error']
  },
  {
    id: '7',
    title: 'App Opens and Immediately Closes',
    slug: 'app-immediately-closes',
    category: 'android-errors',
    summary: 'A sub-type of app crashing where the window renders for less than a second before closing immediately, often without an error message.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'MainActivity is missing in AndroidManifest.xml or does not have correct INTENT filters.',
      'Crashing inside the `onCreate` lifecycle hook before the window renders.'
    ],
    solutions: [
      {
        title: 'Inspect Intent Filters in Manifest',
        steps: [
          'Ensure your launcher activity has the correct intent filters inside `<activity>` block:',
          'Add `<intent-filter><action android:name="android.intent.action.MAIN" /><category android:name="android.intent.category.LAUNCHER" /></intent-filter>`'
        ]
      }
    ],
    prevention: ['Verify your custom Application classes do not perform block-heavy initialization during startup.'],
    faq: [],
    relatedErrors: ['app-keeps-crashing', 'manifest-merger-failed']
  },
  {
    id: '8',
    title: 'Android App Black Screen',
    slug: 'black-screen',
    category: 'android-errors',
    summary: 'The application launches, but displays only a dark/black solid screen. This usually points to rendering thread locks or heavy synchronous tasks on the UI thread.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The main layout fails to draw because a synchronous database request blocks the Main/UI thread.',
      'The splash screen activity fails to transition or redirect to the main dashboard.'
    ],
    solutions: [
      {
        title: 'Move Heavy Code to Background Thread',
        steps: [
          'Ensure database, network operations, and complex parsing run asynchronously inside Kotlin Coroutines, RxJava, or Executor services.',
          'Never run thread-blocking calls in standard layout drawing hooks.'
        ]
      }
    ],
    prevention: ['Use strict mode triggers to catch thread execution violations during debug builds.'],
    faq: [],
    relatedErrors: ['white-screen', 'webview-blank-screen']
  },
  {
    id: '9',
    title: 'Android App White Screen',
    slug: 'white-screen',
    category: 'android-errors',
    summary: 'The application loads a completely empty white window. Common in hybrid tools (React Native, Cordova, WebView) when local web assets fail to bundle.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Missing index.html inside the assets/www directory.',
      'JavaScript syntax errors blocking the initialization of React, Angular or Vue scripts on older Android browsers.'
    ],
    solutions: [
      {
        title: 'Verify Asset Bundling Paths',
        steps: [
          'Ensure your index.html is placed inside `src/main/assets/www` directory for Cordova/WebView.',
          'Check that asset resource pathways in HTML are relative (e.g. `./main.js` instead of `/main.js`).'
        ]
      }
    ],
    prevention: ['Configure absolute SPA paths to map relative directories inside target hybrid wrappers.'],
    faq: [],
    relatedErrors: ['black-screen', 'webview-blank-screen']
  },
  {
    id: '10',
    title: 'WebView Blank Screen',
    slug: 'webview-blank-screen',
    category: 'webview-errors',
    summary: 'A WebView displays a blank, white, or empty page, indicating that the target remote website failed to load or Javascript execution is disabled.',
    difficulty: 'Easy',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'JavaScript is not enabled in WebView settings.',
      'The device is offline or the target server URL is unreachable.',
      'The application blocks non-HTTPS (Cleartext HTTP) requests.'
    ],
    solutions: [
      {
        title: 'Enable Javascript in WebView Settings',
        steps: [
          'Locate your WebView instantiation code in your Java/Kotlin class.',
          'Add: `myWebView.getSettings().setJavaScriptEnabled(true);`',
          'Add setting to support local storage: `myWebView.getSettings().setDomStorageEnabled(true);`'
        ]
      },
      {
        title: 'Check Cleartext HTTP Configuration',
        steps: [
          'If trying to load an `http://` URL, remember Android 9+ blocks cleartext traffic.',
          'Convert your URLs to `https://` or configure a Network Security Config file.'
        ]
      }
    ],
    prevention: ['Always enable JavaScript and DOM Storage if wrapping modern dynamic web apps like React.'],
    faq: [],
    relatedErrors: ['webview-loading-error', 'cleartext-traffic-not-permitted']
  },
  {
    id: '11',
    title: 'WebView Loading Error',
    slug: 'webview-loading-error',
    category: 'webview-errors',
    summary: 'The WebView component displays native network errors (such as net::ERR_CONNECTION_REFUSED or net::ERR_NAME_NOT_RESOLVED).',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'DNS resolution failed for the host address.',
      'Missing internet permission in AndroidManifest.xml.'
    ],
    solutions: [
      {
        title: 'Check Internet Permissions',
        steps: [
          'Open your AndroidManifest.xml file.',
          'Verify that this line is included before the `<application>` tag:',
          '`<uses-permission android:name="android.permission.INTERNET" />`'
        ]
      }
    ],
    prevention: ['Always catch webview load errors using a custom `WebViewClient` and display a custom error page instead of a blank screen.'],
    faq: [],
    relatedErrors: ['webview-blank-screen', 'internet-permission-error']
  },
  {
    id: '12',
    title: 'WebView Page Not Loading',
    slug: 'webview-page-not-loading',
    category: 'webview-errors',
    summary: 'The WebView attempts to navigate, but nothing happens, and the progress bar remains stuck at 0% or stays blank.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Incorrect override in `shouldOverrideUrlLoading` blocking link redirection.',
      'Missing SSL or HTTP protocol prefix in the target URL string.'
    ],
    solutions: [
      {
        title: 'Fix URL Protocol Suffix',
        steps: [
          'Ensure your target loading string begins with `https://` or `http://`. Loading raw domain names like `google.com` will fail.',
          'Change: `myWebView.loadUrl("google.com");` to `myWebView.loadUrl("https://google.com");`'
        ]
      }
    ],
    prevention: ['Sanitize URL inputs prior to calling loadUrl.'],
    faq: [],
    relatedErrors: ['webview-loading-error', 'webview-blank-screen']
  },
  {
    id: '13',
    title: 'Internet Permission Error',
    slug: 'internet-permission-error',
    category: 'permissions-errors',
    summary: 'The application cannot connect to the internet, and throws java.lang.SecurityException: Permission denied (missing INTERNET).',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The developer forgot to request internet permissions in AndroidManifest.xml.'
    ],
    solutions: [
      {
        title: 'Add Manifest Internet Tag',
        steps: [
          'Open `/src/main/AndroidManifest.xml`.',
          'Add the following tag above `<application>`:',
          '`<uses-permission android:name="android.permission.INTERNET" />`'
        ]
      }
    ],
    prevention: ['Include the basic internet permission in all new Android templates by default.'],
    faq: [],
    relatedErrors: ['cleartext-traffic-not-permitted', 'webview-loading-error']
  },
  {
    id: '14',
    title: 'Network Security Configuration Error',
    slug: 'network-security-config-error',
    category: 'api-errors',
    summary: 'Occurs when customized trust-anchors or SSL configurations inside network-security-config are set up incorrectly, preventing HTTPS handshakes.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Typos or invalid XML syntax in the `network_security_config.xml` file.',
      'Blocking system user certificate authorities while trusting only custom non-existent ones.'
    ],
    solutions: [
      {
        title: 'Verify XML Formatting',
        steps: [
          'Navigate to `res/xml/network_security_config.xml` and ensure it uses a valid structure:',
          '`<network-security-config><base-config cleartextTrafficPermitted="true"><trust-anchors><certificates src="system" /><certificates src="user" /></trust-anchors></base-config></network-security-config>`'
        ]
      }
    ],
    prevention: ['Use default system network config files unless your company utilizes custom internal self-signed development certificates.'],
    faq: [],
    relatedErrors: ['cleartext-traffic-not-permitted', 'ssl-certificate-error']
  },
  {
    id: '15',
    title: 'SSL Certificate Error',
    slug: 'ssl-certificate-error',
    category: 'api-errors',
    summary: 'The client fails to establish a secure connection with the server because of an expired, invalid, or self-signed certificate.',
    difficulty: 'Hard',
    estimatedTime: '12 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The target server certificate has expired or is invalid.',
      'The device system time is incorrect, throwing off the certificate validity check.'
    ],
    solutions: [
      {
        title: 'Correct System Clock settings',
        steps: [
          'If this happens on a single test phone, go to Settings > Date & Time.',
          'Verify that "Set time automatically" is enabled.',
          'Restart the application.'
        ]
      }
    ],
    prevention: ['Always monitor certificates on production endpoints using automated warning systems.'],
    faq: [],
    relatedErrors: ['network-security-config-error', 'cleartext-traffic-not-permitted']
  },
  {
    id: '16',
    title: 'Cleartext HTTP Traffic Not Permitted',
    slug: 'cleartext-traffic-not-permitted',
    category: 'api-errors',
    summary: 'Android 9 (API 28) and above blocks unencrypted cleartext HTTP (http://) traffic by default to protect user data.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Making network API requests or loading web addresses that use unsecured `http://` protocols.'
    ],
    solutions: [
      {
        title: 'Upgrade Endpoint to Secure HTTPS',
        steps: [
          'Change the API base endpoint or loading URL scheme from `http://` to `https://`. This is the recommended secure industry standard.'
        ]
      },
      {
        title: 'Bypass restriction in AndroidManifest (For Local Testing)',
        steps: [
          'Open your AndroidManifest.xml file.',
          'Add: `android:usesCleartextTraffic="true"` inside the main `<application ...>` tag block.'
        ]
      }
    ],
    prevention: ['Enforce SSL encryption on backend web servers to route all inbound requests through HTTPS.'],
    faq: [],
    relatedErrors: ['webview-blank-screen', 'network-security-config-error']
  },
  {
    id: '17',
    title: 'Target SDK Error (Google Play Requirement)',
    slug: 'target-sdk-error',
    category: 'sdk-errors',
    summary: 'Google Play Console rejects the upload because the application does not target the latest required Android SDK version.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Using an outdated `targetSdkVersion` in your Gradle build config that falls below the current Google Play minimum threshold.'
    ],
    solutions: [
      {
        title: 'Update build.gradle Properties',
        steps: [
          'Open your app level `/android/app/build.gradle` file.',
          'Look for the `defaultConfig` or `android` block.',
          'Update `targetSdkVersion` to meet Play Store guidelines (e.g. `34` or `35`).',
          'Sync your Gradle changes and recompile the project.'
        ]
      }
    ],
    prevention: ['Keep up with annual Google Play target SDK announcements and update your builds accordingly.'],
    faq: [],
    relatedErrors: ['minimum-sdk-error', 'aab-upload-failed']
  },
  {
    id: '18',
    title: 'Minimum SDK Error (minSdkVersion Compatibility)',
    slug: 'minimum-sdk-error',
    category: 'sdk-errors',
    summary: 'The application cannot install or compilation fails because third-party library dependencies require a higherSdkVersion than defined in the app.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The app\'s `minSdkVersion` is 21, but an imported gradle dependency requires `minSdkVersion 24` or higher.'
    ],
    solutions: [
      {
        title: 'Increase App minSdkVersion',
        steps: [
          'Open `app/build.gradle`.',
          'Locate `minSdkVersion` inside `defaultConfig`.',
          'Increase the value to match the required dependency version (e.g. increase from 21 to 24).'
        ]
      }
    ],
    prevention: ['Review the compatibility matrix of any imported libraries prior to integration.'],
    faq: [],
    relatedErrors: ['target-sdk-error', 'gradle-build-failed']
  },
  {
    id: '19',
    title: '64-bit Requirement Error',
    slug: '64-bit-error',
    category: 'sdk-errors',
    summary: 'Google Play Console rejects compiled APK/AAB packages that do not contain native 64-bit libraries alongside 32-bit ones.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The application compiles and includes only 32-bit (.so) files under `lib/armeabi-v7a` or `lib/x86`.'
    ],
    solutions: [
      {
        title: 'Include 64-bit Native Architectures',
        steps: [
          'Open your `app/build.gradle` file.',
          'Under the `android > defaultConfig` block, check your `ndk.abiFilters`.',
          'Ensure the 64-bit counterparts are present: `ndk.abiFilters "armeabi-v7a", "arm64-v8a", "x86", "x86_64"`',
          'Sync Gradle and rebuild your project.'
        ]
      }
    ],
    prevention: ['Compile using Android Studio\'s automated bundle options which pack complete hardware architectures.'],
    faq: [],
    relatedErrors: ['apk-is-not-compatible', 'aab-upload-failed']
  },
  {
    id: '20',
    title: 'Gradle Build Failed',
    slug: 'gradle-build-failed',
    category: 'gradle-errors',
    summary: 'A general Android Studio compilation error triggered when task execution in Gradle fails due to syntax issues, broken caches, or wrong configurations.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Syntax errors in `build.gradle` or `settings.gradle`.',
      'Corrupt gradle cache or local build system errors.',
      'Incompatible Gradle Wrapper version and Android Gradle Plugin (AGP) version.'
    ],
    solutions: [
      {
        title: 'Run Gradle Clean and Sync',
        steps: [
          'In Android Studio, click "Build" on the top navigation menu.',
          'Select "Clean Project".',
          'Tap "File" > "Sync Project with Gradle Files" to clear out dynamic runtime cache conflicts.'
        ]
      },
      {
        title: 'Execute Gradle with Stacktrace',
        steps: [
          'If the build fails in a command terminal, run: `./gradlew assembleDebug --stacktrace` to view comprehensive error lines.'
        ]
      }
    ],
    prevention: ['Avoid manual changes to built-in Gradle properties unless following specific official documentation guidelines.'],
    faq: [],
    relatedErrors: ['gradle-sync-failed', 'duplicate-class-error']
  },
  {
    id: '21',
    title: 'Gradle Sync Failed',
    slug: 'gradle-sync-failed',
    category: 'gradle-errors',
    summary: 'The local build system cannot structure project tasks because Gradle files have syncing errors or cannot resolve dependencies from online repositories.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Missing or incorrect proxy settings blocking Android Studio from accessing maven central.',
      'Unresolved library versions specified in dependencies.'
    ],
    solutions: [
      {
        title: 'Check Repository Configuration',
        steps: [
          'Open your `settings.gradle` or root `build.gradle` file.',
          'Ensure `google()` and `mavenCentral()` are listed in both `buildscript` and `dependencyResolutionManagement` repositories blocks.'
        ]
      }
    ],
    prevention: ['Keep development environments connected to a stable, unrestricted network connection during sync.'],
    faq: [],
    relatedErrors: ['gradle-build-failed', 'duplicate-class-error']
  },
  {
    id: '22',
    title: 'Android Studio Build Error',
    slug: 'android-studio-build-error',
    category: 'gradle-errors',
    summary: 'A localized failure inside Android Studio where compilation stops unexpectedly or does not generate compiled assets.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Wrong JDK selection inside Android Studio settings.',
      'Corrupted workspace or internal configuration caches.'
    ],
    solutions: [
      {
        title: 'Change JDK Settings',
        steps: [
          'Go to File > Settings (or Android Studio > Settings on macOS).',
          'Select Build, Execution, Deployment > Build Tools > Gradle.',
          'Update "Gradle JDK" to match the correct Java version matching your target AGP.'
        ]
      }
    ],
    prevention: ['Use the standard recommended JDK bundle shipped within Android Studio.'],
    faq: [],
    relatedErrors: ['gradle-build-failed', 'java-heap-error']
  },
  {
    id: '23',
    title: 'Duplicate Class Error',
    slug: 'duplicate-class-error',
    category: 'gradle-errors',
    summary: 'The compiler fails due to duplicate classpath dependencies where different libraries import conflicting versions of the same packages.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Importing separate libraries that contain the exact same transitive packages.',
      'Mixing older support libraries with modern AndroidX packages.'
    ],
    solutions: [
      {
        title: 'Enable AndroidX Properties',
        steps: [
          'Open `gradle.properties` in your root project.',
          'Add the following lines:',
          '`android.useAndroidX=true`',
          '`android.enableJetifier=true` (This automatically migrates old libraries to AndroidX equivalents).'
        ]
      }
    ],
    prevention: ['Exclude redundant modules using standard Gradle exclude options inside build scripts.'],
    faq: [],
    relatedErrors: ['gradle-build-failed', 'manifest-merger-failed']
  },
  {
    id: '24',
    title: 'Manifest Merger Failed',
    slug: 'manifest-merger-failed',
    category: 'gradle-errors',
    summary: 'Occurs when the app manifest fails to merge with manifest files belonging to imported libraries due to attribute name conflicts or missing properties.',
    difficulty: 'Hard',
    estimatedTime: '12 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Two different components claim the same activity target or use incompatible values for parameters like `android:theme`.'
    ],
    solutions: [
      {
        title: 'Inspect Manifest Merger Log',
        steps: [
          'Look at the bottom of the Android Studio build failure console.',
          'Click on the "Manifest Merger Report" tab to view specific conflicting lines.',
          'Use the `tools:replace` attribute in your `<application>` tag to override conflicts.'
        ]
      }
    ],
    prevention: ['Set explicit custom attributes for application levels and match style properties.'],
    faq: [],
    relatedErrors: ['duplicate-class-error', 'gradle-build-failed']
  },
  {
    id: '25',
    title: 'Resource Not Found Error',
    slug: 'resource-not-found-error',
    category: 'gradle-errors',
    summary: 'Triggered when the compiler or runtime system tries to resolve an XML file or asset (like drawables, layouts, strings) which does not exist or has spelling errors.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Typos in XML resource names (e.g., trying to reference `@string/app_namee` instead of `app_name`).',
      'The asset was saved in the wrong res directory (like drawable-v24 instead of the base drawable).'
    ],
    solutions: [
      {
        title: 'Verify Asset Name and Folder Location',
        steps: [
          'Check the spelling of the requested resource in your code.',
          'Make sure your asset uses only lowercase letters, numbers, and underscores (Android resources do not support uppercase characters or special symbols).'
        ]
      }
    ],
    prevention: ['Use Android Studio\'s automated layout design view which highlights resource errors in real-time.'],
    faq: [],
    relatedErrors: ['aapt2-error', 'missing-resource-error']
  },
  {
    id: '26',
    title: 'AAPT2 Error',
    slug: 'aapt2-error',
    category: 'gradle-errors',
    summary: 'Android Asset Packaging Tool (AAPT2) compilation fails when it encounters bad resource XML syntax or illegal filenames inside drawables.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Resource filenames containing uppercase characters, spaces, or dashes.',
      'Unclosed XML brackets or syntax formatting errors in values/strings.xml.'
    ],
    solutions: [
      {
        title: 'Sanitize Resource File Names',
        steps: [
          'Scan files inside `res/drawable/` and `res/layout/`.',
          'Rename any file containing capitals or hyphens (e.g. rename `my-icon.png` to `my_icon.png`).'
        ]
      }
    ],
    prevention: ['Strictly adhere to lowercase-only naming conventions for all static assets.'],
    faq: [],
    relatedErrors: ['resource-not-found-error', 'missing-resource-error']
  },
  {
    id: '27',
    title: 'Missing Resource Error',
    slug: 'missing-resource-error',
    category: 'gradle-errors',
    summary: 'The application references static assets that were deleted or are missing in specific screen configuration folders.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Missing base version of drawables or strings (e.g. string is present only in values-hi but missing in the primary values/strings.xml).'
    ],
    solutions: [
      {
        title: 'Create Default Value Backups',
        steps: [
          'Verify that any string or drawable localized in a specific folder (like values-hi/ or layout-land/) is also defined in your default folder.'
        ]
      }
    ],
    prevention: ['Ensure base localization assets are fully populated before building.'],
    faq: [],
    relatedErrors: ['resource-not-found-error', 'aapt2-error']
  },
  {
    id: '28',
    title: 'Version Code Error',
    slug: 'version-code-error',
    category: 'publishing-errors',
    summary: 'Google Play rejects uploads of compiled app packages because the bundle has a Version Code that is equal to or lower than a previous deployment.',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The developer forgot to increment the version code integer inside build.gradle before recompiling.'
    ],
    solutions: [
      {
        title: 'Increment Version Code Integer',
        steps: [
          'Open your app-level `build.gradle` file.',
          'Locate `versionCode` in the `defaultConfig` block.',
          'Increment the integer value (e.g., if it is currently `15`, change it to `16`).',
          'Rebuild your APK/AAB package.'
        ]
      }
    ],
    prevention: ['Build version tracking systems or CI/CD pipelines to automate versionCode adjustments on release runs.'],
    faq: [],
    relatedErrors: ['version-name-error', 'aab-upload-failed']
  },
  {
    id: '29',
    title: 'Version Name Error',
    slug: 'version-name-error',
    category: 'publishing-errors',
    summary: 'Publishing failure occurring when version name configurations are invalid or mismatch release notes tags.',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Version names with invalid characters or mismatch formats compared to prior store builds.'
    ],
    solutions: [
      {
        title: 'Update versionName Parameter',
        steps: [
          'Update your `versionName` string in your gradle settings to a clean semantic string (e.g., "1.0.5").'
        ]
      }
    ],
    prevention: ['Adopt semantic versioning rules (Major.Minor.Patch) consistently.'],
    faq: [],
    relatedErrors: ['version-code-error', 'aab-upload-failed']
  },
  {
    id: '30',
    title: 'APK File Size Too Large',
    slug: 'apk-too-large',
    category: 'apk-errors',
    summary: 'The generated APK size is too large for distribution channels or exceeds play store maximum cellular download size alerts.',
    difficulty: 'Medium',
    estimatedTime: '12 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Including uncompressed media, images, or redundant CPU library configurations inside the APK package.'
    ],
    solutions: [
      {
        title: 'Enable Proguard and Code Shrinking',
        steps: [
          'Open your `app/build.gradle` file.',
          'Add properties inside release block:',
          '`minifyEnabled true`',
          '`shrinkResources true`'
        ]
      }
    ],
    prevention: ['Deploy builds using modern AAB bundles which deliver split, optimized layouts to users.'],
    faq: [],
    relatedErrors: ['aab-upload-failed', '64-bit-error']
  },
  {
    id: '31',
    title: 'AAB Upload Failed',
    slug: 'aab-upload-failed',
    category: 'aab-errors',
    summary: 'The Play Console displays general rejects or parsing crashes when uploading Android App Bundles (.aab).',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Corrupt app bundle signature.',
      'Package uses old targetSdkVersion.'
    ],
    solutions: [
      {
        title: 'Verify Signing Configuration',
        steps: [
          'Ensure you sign the App Bundle with your official release key prior to uploading.',
          'Verify using `jarsigner -verify -verbose my_app.aab`.'
        ]
      }
    ],
    prevention: ['Configure automated build.gradle signing configs to prevent un-signed packaging.'],
    faq: [],
    relatedErrors: ['app-bundle-error', 'target-sdk-error']
  },
  {
    id: '32',
    title: 'App Bundle Error (Split Assembly Failure)',
    slug: 'app-bundle-error',
    category: 'aab-errors',
    summary: 'Occurs when resources are not modularized correctly, preventing Google Play from generating device-specific APK splits from an AAB.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Bad dynamic-features structural setups or duplicate resource IDs in modular apps.'
    ],
    solutions: [
      {
        title: 'Enforce Unified Resource Naming',
        steps: [
          'Prefix your resource names in separate app modules to prevent collisions during split compilation.'
        ]
      }
    ],
    prevention: ['Use Gradle resource prefix rules inside modular module files.'],
    faq: [],
    relatedErrors: ['aab-upload-failed', 'duplicate-class-error']
  },
  {
    id: '33',
    title: 'Signing Error (APK Signing Scheme Missing)',
    slug: 'signing-error',
    category: 'apk-errors',
    summary: 'The APK cannot be installed on modern Android platforms because it lacks a required cryptographic signing scheme version (V2 or V3).',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The build compiled with only the ancient v1 (JAR signing) scheme.'
    ],
    solutions: [
      {
        title: 'Enable V2 & V3 Signing in Gradle',
        steps: [
          'Open your `app/build.gradle` and find `signingConfigs` under `android`.',
          'Add properties inside release configurations:',
          '`v2SigningEnabled true`',
          '`v3SigningEnabled true`',
          'Recompile and export the APK.'
        ]
      }
    ],
    prevention: ['Use Android Studio\'s official export signing UI checklist to check both v1 and v2 options.'],
    faq: [],
    relatedErrors: ['keystore-error', 'app-signature-conflict']
  },
  {
    id: '34',
    title: 'Keystore Error (Missing or Invalid Keystore)',
    slug: 'keystore-error',
    category: 'apk-errors',
    summary: 'Compilation fails with "Keystore file not found" or "Password verification failed" because of wrong keystore credentials.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The file path to the release `.jks` keystore is wrong.',
      'Typo in keystore password, key alias, or key password.'
    ],
    solutions: [
      {
        title: 'Verify Relative Path Configurations',
        steps: [
          'Place your `.jks` file inside the `android/app/` folder.',
          'Update your `build.gradle` reference: `storeFile file("my-release-key.jks")` (do not use hardcoded absolute system directory paths).'
        ]
      }
    ],
    prevention: ['Avoid committing your signing keystore passwords directly to git; use localized key properties instead.'],
    faq: [],
    relatedErrors: ['signing-error', 'app-signature-conflict']
  },
  {
    id: '35',
    title: 'Invalid APK File',
    slug: 'invalid-apk',
    category: 'apk-errors',
    summary: 'The Android device reports "Invalid APK" or fails instantly during side-load operations.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'The file extension is wrong or the APK download got interrupted.'
    ],
    solutions: [
      {
        title: 'Verify File Extension Suffix',
        steps: [
          'Ensure the file name ends precisely in `.apk`. If it got renamed to `.apk.zip` or `.bin`, rename it back.'
        ]
      }
    ],
    prevention: ['Avoid sending APK files via chat applications which might append extra metadata extensions.'],
    faq: [],
    relatedErrors: ['parse-error', 'app-not-installed']
  },
  {
    id: '36',
    title: 'Invalid AAB Package',
    slug: 'invalid-aab',
    category: 'aab-errors',
    summary: 'Google Play declares an upload "Invalid" because the package has structural problems or contains raw assets in the wrong folder structures.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Bundler structure contains invalid files or was exported from an unofficial tool.'
    ],
    solutions: [
      {
        title: 'Compile from Standard Android Studio Tooling',
        steps: [
          'Build and export packages via Build > Bundle(s) / APK(s) > Build Bundle(s) in Android Studio.'
        ]
      }
    ],
    prevention: ['Do not use manual zip tools to create AAB bundles from scratch.'],
    faq: [],
    relatedErrors: ['aab-upload-failed', 'app-bundle-error']
  },
  {
    id: '37',
    title: 'App Signature Conflict',
    slug: 'app-signature-conflict',
    category: 'apk-errors',
    summary: 'Android blocks an installation or update because the signature of the incoming app package does not match the signature of the app already on the device.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Upgrading a debug APK build with a release build, or installing an app build compiled by a separate team member using a different debug keystore.'
    ],
    solutions: [
      {
        title: 'Force Uninstall Existing Version',
        steps: [
          'Uninstall the current app on the device first.',
          'Verify that it is completely deleted from other user profiles if multi-profile is active.',
          'Install the new APK build.'
        ]
      }
    ],
    prevention: ['Distribute a shared developer debug keystore file across your team.'],
    faq: [],
    relatedErrors: ['app-not-installed', 'keystore-error']
  },
  {
    id: '38',
    title: 'Package Name Conflict',
    slug: 'package-name-conflict',
    category: 'publishing-errors',
    summary: 'Google Play or Amazon Appstore rejects an app upload because another app is already using that exact same Application ID.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Using common boilerplate package names (e.g., `com.example.myapp`) that are already registered on the store.'
    ],
    solutions: [
      {
        title: 'Change Application ID',
        steps: [
          'Open your app level `build.gradle` file.',
          'Change the `applicationId` property to a unique, reverse-domain identifier (e.g., `com.mycompany.uniquegoapp`).',
          'Sync Gradle and recompile the project.'
        ]
      }
    ],
    prevention: ['Always customize your application ID before setting up any external developer console registries.'],
    faq: [],
    relatedErrors: ['apk-installation-failed', 'version-code-error']
  },
  {
    id: '39',
    title: 'Permission Denied at Runtime',
    slug: 'permission-denied',
    category: 'permissions-errors',
    summary: 'The application crashes or fails silently because it does not prompt or handle permissions denied by the user.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Calling camera or location APIs without checking if runtime permission is granted.'
    ],
    solutions: [
      {
        title: 'Implement Runtime Permission Checks',
        steps: [
          'Before executing hardware code, call `ContextCompat.checkSelfPermission(...)`.',
          'If denied, request it using `ActivityCompat.requestPermissions(...)` and handle the user\'s response gracefully.'
        ]
      }
    ],
    prevention: ['Gracefully disable features that are denied permissions instead of crashing.'],
    faq: [],
    relatedErrors: ['storage-permission-error', 'camera-permission-error']
  },
  {
    id: '40',
    title: 'Storage Permission Error (Android 13+ Issues)',
    slug: 'storage-permission-error',
    category: 'permissions-errors',
    summary: 'File read/write operations fail, particularly on Android 13 and above, which deprecated the generic READ_EXTERNAL_STORAGE permission.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: [
      'Requesting legacy READ_EXTERNAL_STORAGE on Android 13 (API 33) or Android 14 (API 34) devices.'
    ],
    solutions: [
      {
        title: 'Use Android 13 Granular Permissions',
        steps: [
          'Update your permission request code for Android 13+.',
          'Replace generic read permission with: `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, or `READ_MEDIA_AUDIO`.'
        ]
      }
    ],
    prevention: ['Migrate local data operations to scoped storage or use system file pickers which do not require general permissions.'],
    faq: [],
    relatedErrors: ['permission-denied', 'file-access-error']
  },
  {
    id: '41',
    title: 'Camera Permission Error',
    slug: 'camera-permission-error',
    category: 'permissions-errors',
    summary: 'Opening camera feeds crashes or fails, showing security exceptions.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing camera permission declaration in the manifest or runtime permission checks.'],
    solutions: [
      {
        title: 'Add Camera Permissions',
        steps: [
          'Include `<uses-permission android:name="android.permission.CAMERA" />` in AndroidManifest.',
          'Request camera permissions dynamically at runtime.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['permission-denied', 'microphone-permission-error']
  },
  {
    id: '42',
    title: 'Microphone Permission Error',
    slug: 'microphone-permission-error',
    category: 'permissions-errors',
    summary: 'Audio recordings fail or result in silence.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing RECORD_AUDIO permission configuration.'],
    solutions: [
      {
        title: 'Add Record Audio Permissions',
        steps: [
          'Include `<uses-permission android:name="android.permission.RECORD_AUDIO" />` in your manifest.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['permission-denied', 'camera-permission-error']
  },
  {
    id: '43',
    title: 'Location Permission Error',
    slug: 'location-permission-error',
    category: 'permissions-errors',
    summary: 'App fails to fetch device coordinates or crashes on request.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION checks.'],
    solutions: [
      {
        title: 'Configure Location Tag',
        steps: [
          'Add permissions to manifest.',
          'Ensure users grant both fine and coarse location accuracy permissions.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['permission-denied']
  },
  {
    id: '44',
    title: 'Notification Permission Error (Android 13+)',
    slug: 'notification-permission-error',
    category: 'permissions-errors',
    summary: 'Push notifications are blocked or fail to display entirely on newer Android versions.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Android 13 requires explicit opt-in POST_NOTIFICATIONS permission.'],
    solutions: [
      {
        title: 'Add and Request Notification Permissions',
        steps: [
          'Declare: `<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>`',
          'Prompt user on app startup to allow notifications.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['push-notification-error', 'permission-denied']
  },
  {
    id: '45',
    title: 'File Access Error',
    slug: 'file-access-error',
    category: 'permissions-errors',
    summary: 'Attempts to open, read, or write custom files inside external directories fail with Access Denied.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Targeting Android 10+ and trying to access generic file system paths.'],
    solutions: [
      {
        title: 'Migrate to Scoped Storage',
        steps: [
          'Use `getExternalFilesDir(null)` for app-specific folder access.',
          'Use the Storage Access Framework (SAF) document picker for general file access.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['storage-permission-error', 'permission-denied']
  },
  {
    id: '46',
    title: 'Download Failed Error',
    slug: 'download-failed',
    category: 'api-errors',
    summary: 'App file downloads fail due to network drops, wrong directory configurations, or SSL issues.',
    difficulty: 'Easy',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Server unreachable or missing write storage permission.'],
    solutions: [
      {
        title: 'Verify Connection and Directory Access',
        steps: [
          'Verify internet connection.',
          'Use the Android DownloadManager API for secure background downloads.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['internet-permission-error', 'upload-failed']
  },
  {
    id: '47',
    title: 'Upload Failed Error',
    slug: 'upload-failed',
    category: 'api-errors',
    summary: 'Multipart form uploads of pictures or documents fail with timeout exceptions.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Overly small request timeout settings or slow cellular speeds.'],
    solutions: [
      {
        title: 'Increase Connection Timeout',
        steps: [
          'Configure your HTTP Client (like OkHttpClient) connection timeout to 60 seconds.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['timeout-error', 'download-failed']
  },
  {
    id: '48',
    title: 'API Connection Failed',
    slug: 'api-connection-failed',
    category: 'api-errors',
    summary: 'The application cannot communicate with remote API backends, yielding HTTP connection errors.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Offline device state or bad API base URLs.'],
    solutions: [
      {
        title: 'Sanitize Endpoint and Check State',
        steps: [
          'Verify client has dynamic connection.',
          'Check that API endpoint does not use trailing slash typos.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['internet-permission-error', 'timeout-error']
  },
  {
    id: '49',
    title: 'Timeout Error (SocketTimeoutException)',
    slug: 'timeout-error',
    category: 'api-errors',
    summary: 'Network requests are canceled because the host did not respond in time.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Slow server response or congested network routes.'],
    solutions: [
      {
        title: 'Configure Retry Interceptors',
        steps: [
          'Add retry logics inside HTTP requests.',
          'Optimize server database indices to speed up queries.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['api-connection-failed', 'dns-error']
  },
  {
    id: '50',
    title: 'DNS Error (UnknownHostException)',
    slug: 'dns-error',
    category: 'api-errors',
    summary: 'Device fails to resolve server domain names to IP addresses.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['DNS configuration on device is broken, or wrong server domains.'],
    solutions: [
      {
        title: 'Flush DNS and Verify Suffixes',
        steps: [
          'Verify endpoint is spelling correctly.',
          'Toggle WiFi connection or clear DNS cache.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['api-connection-failed', 'timeout-error']
  },
  {
    id: '51',
    title: 'HTTP 400 Bad Request',
    slug: 'http-400',
    category: 'api-errors',
    summary: 'The server rejected the request due to malformed payload syntax or missing headers.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['JSON structures missing required fields.'],
    solutions: [
      {
        title: 'Validate API Request Body',
        steps: [
          'Compare client payload structure with server expectations.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-401', 'json-parsing-error']
  },
  {
    id: '52',
    title: 'HTTP 401 Unauthorized',
    slug: 'http-401',
    category: 'api-errors',
    summary: 'API requests are denied due to missing or invalid bearer tokens/auth keys.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Expired authorization tokens.'],
    solutions: [
      {
        title: 'Refresh Token Credentials',
        steps: [
          'Implement automated refresh token headers on API client interceptors.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-403', 'authentication-error']
  },
  {
    id: '53',
    title: 'HTTP 403 Forbidden',
    slug: 'http-403',
    category: 'api-errors',
    summary: 'The credentials are valid but the authenticated user lacks permissions to view the resource.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Role mismatches or IP restrictions.'],
    solutions: [
      {
        title: 'Check User Privileges',
        steps: [
          'Verify scope levels on API settings.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-401', 'cors-error']
  },
  {
    id: '54',
    title: 'HTTP 404 Not Found',
    slug: 'http-404',
    category: 'api-errors',
    summary: 'The requested API endpoint or URL does not exist on the server.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Typo in URL parameters or deprecated endpoints.'],
    solutions: [
      {
        title: 'Verify URL Paths',
        steps: [
          'Check that the server-side route is mapped correctly and currently running.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-500', 'netlify-page-not-found']
  },
  {
    id: '55',
    title: 'HTTP 500 Internal Server Error',
    slug: 'http-500',
    category: 'api-errors',
    summary: 'The remote server encountered an unhandled exception and crashed.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Unhandled backend code crashes or database timeouts.'],
    solutions: [
      {
        title: 'Check Server-Side Logs',
        steps: [
          'Log in to your hosting server and check runtime log traces to fix the crash.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-404', 'api-connection-failed']
  },
  {
    id: '56',
    title: 'CORS Error (Cross-Origin Resource Sharing)',
    slug: 'cors-error',
    category: 'api-errors',
    summary: 'WebViews or web-based APKs cannot load APIs because the server does not allow cross-origin requests.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing Access-Control-Allow-Origin headers on server responses.'],
    solutions: [
      {
        title: 'Configure Server CORS Header',
        steps: [
          'Add `Access-Control-Allow-Origin: *` or your app\'s custom origin header to server responses.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-403', 'webview-blank-screen']
  },
  {
    id: '57',
    title: 'JavaScript Error in WebView',
    slug: 'javascript-error-in-webview',
    category: 'webview-errors',
    summary: 'Web app features fail silently inside WebView due to runtime JS exceptions.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Using ES6+ code syntax which the older WebView engine cannot run.'],
    solutions: [
      {
        title: 'Setup Custom WebChromeClient',
        steps: [
          'Add a custom `WebChromeClient` to capture and log JS exceptions to the standard Android Logcat console.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen', 'localstorage-error']
  },
  {
    id: '58',
    title: 'LocalStorage Error in WebView',
    slug: 'localstorage-error',
    category: 'webview-errors',
    summary: 'Web features fail because localStorage reads/writes throw SecurityErrors in Android WebView.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['DOM Storage is not enabled on WebView configuration.'],
    solutions: [
      {
        title: 'Enable DOM Storage Settings',
        steps: [
          'Add: `settings.setDomStorageEnabled(true);` on the WebView.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen', 'cookie-error']
  },
  {
    id: '59',
    title: 'Cookie Error in WebView',
    slug: 'cookie-error',
    category: 'webview-errors',
    summary: 'User sessions keep logging out because cookies fail to save.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Third-party cookies or general cookie storing is disabled.'],
    solutions: [
      {
        title: 'Activate Cookie Manager',
        steps: [
          'Initialize `CookieManager.getInstance().setAcceptCookie(true);`'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['localstorage-error', 'webview-blank-screen']
  },
  {
    id: '60',
    title: 'Mixed Content Error in WebView',
    slug: 'mixed-content-error',
    category: 'webview-errors',
    summary: 'Secure HTTPS websites fail to load unsecured HTTP media assets inside webviews.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Android blocking mixed content by default for security.'],
    solutions: [
      {
        title: 'Enable Mixed Content Mode',
        steps: [
          'Set compatibility flag: `settings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);`'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['cleartext-traffic-not-permitted', 'webview-blank-screen']
  },
  {
    id: '61',
    title: 'Netlify Page Not Found (404 on Refresh)',
    slug: 'netlify-page-not-found',
    category: 'netlify-errors',
    summary: 'Refreshing any sub-page of your single-page app (SPA) deployed on Netlify returns a generic "Page Not Found".',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    lastReviewed: 'August 2026',
    causes: ['Netlify tries to resolve client routes as server-side physical folders.'],
    solutions: [
      {
        title: 'Add Netlify Redirect Rules',
        steps: [
          'Create a file named `_redirects` inside your public dist folder.',
          'Add this rule: `/*  /index.html  200`'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['netlify-deploy-failed', 'http-404']
  },
  {
    id: '62',
    title: 'Netlify Deploy Failed',
    slug: 'netlify-deploy-failed',
    category: 'netlify-errors',
    summary: 'The deployment pipeline on Netlify aborts and fails.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Broken build scripts or package resolutions.'],
    solutions: [
      {
        title: 'Review Build Command settings',
        steps: [
          'Verify your build command on Netlify settings is `npm run build`.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['netlify-build-error', 'netlify-page-not-found']
  },
  {
    id: '63',
    title: 'Netlify Build Error',
    slug: 'netlify-build-error',
    category: 'netlify-errors',
    summary: 'Local scripts fail compiling on Netlify servers.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['TypeScript errors during compilation step.'],
    solutions: [
      {
        title: 'Run TypeScript Linter Locally',
        steps: [
          'Execute `npm run build` locally to find and fix TS/JS typing issues before committing.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['netlify-deploy-failed', 'gradle-build-failed']
  },
  {
    id: '64',
    title: 'Website Works but WebView Doesn\'t',
    slug: 'website-works-webview-fails',
    category: 'webview-errors',
    summary: 'The web app is perfect in standard mobile Chrome, but renders broken interfaces inside the APK WebView wrapper.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['WebView components run outdated rendering engines or disable required features.'],
    solutions: [
      {
        title: 'Configure WebSettings',
        steps: [
          'Configure WebView to use standard wide viewport and enable both Javascript and DOM storage.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen', 'javascript-error-in-webview']
  },
  {
    id: '65',
    title: 'HTTPS Certificate Handshake Error',
    slug: 'https-error',
    category: 'api-errors',
    summary: 'Connections to secure websites are closed during SSL handshake.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Server supports only deprecated TLS protocols (like TLS 1.0 or 1.1).'],
    solutions: [
      {
        title: 'Enforce Modern TLS 1.2 or 1.3',
        steps: [
          'Update your hosting server SSL protocol configurations.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['ssl-certificate-error', 'network-security-config-error']
  },
  {
    id: '66',
    title: 'Redirect Error in App Browser',
    slug: 'redirect-error',
    category: 'api-errors',
    summary: 'In-app web redirects enter infinite loops.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Circular link tracking setups.'],
    solutions: [
      {
        title: 'Clear redirect routing on URL overload',
        steps: [
          'Detect and stop redundant redirects inside the WebView Client client callbacks.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-loading-error']
  },
  {
    id: '67',
    title: 'Android Back Button Not Working (WebView App)',
    slug: 'back-button-not-working',
    category: 'webview-errors',
    summary: 'Pressing the physical hardware back button closes the app instead of going back a page inside the WebView.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['The activity does not override the default back button press logic.'],
    solutions: [
      {
        title: 'Override onBackPressed',
        steps: [
          'In your Activity class, override `onBackPressed()`:',
          'Check if WebView can go back: `if (myWebView.canGoBack()) { myWebView.goBack(); } else { super.onBackPressed(); }`'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen']
  },
  {
    id: '68',
    title: 'File Upload Not Working in WebView',
    slug: 'file-upload-not-working',
    category: 'webview-errors',
    summary: 'Tapping the "Choose File" button inside a WebView does nothing.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: ['Android WebView requires a custom WebChromeClient to handle HTML file selection inputs.'],
    solutions: [
      {
        title: 'Override File Chooser Callbacks',
        steps: [
          'Set up a custom `WebChromeClient` and override `onShowFileChooser(...)`.',
          'Launch a standard Android file intent, capture the result, and pass the data URI back to the WebView callback.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen', 'file-picker-not-opening']
  },
  {
    id: '69',
    title: 'Download Button Not Working in WebView',
    slug: 'download-button-not-working',
    category: 'webview-errors',
    summary: 'Tapping download links does nothing inside the wrapped APK.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['WebViews do not download files automatically; they require a download listener.'],
    solutions: [
      {
        title: 'Attach DownloadListener',
        steps: [
          'Set up a `DownloadListener` on your WebView.',
          'When triggered, delegate the request to the system `DownloadManager`.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['download-failed', 'webview-blank-screen']
  },
  {
    id: '70',
    title: 'APK Upload Stuck (Google Play Console)',
    slug: 'apk-upload-stuck',
    category: 'publishing-errors',
    summary: 'The upload progress bar freezes at 100% or fails silently during Play Store APK upload.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Temporary browser caching bugs or slow networks.'],
    solutions: [
      {
        title: 'Clear Cache and Upload in Incognito',
        steps: [
          'Open Google Play Console inside a private incognito tab and retry the upload.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['aab-upload-failed', 'app-store-upload-stuck']
  },
  {
    id: '71',
    title: 'App Store Upload Stuck (Amazon Developer Portal)',
    slug: 'app-store-upload-stuck',
    category: 'publishing-errors',
    summary: 'The portal fails to accept the binary package with processing errors.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Invalid package name or signature configurations.'],
    solutions: [
      {
        title: 'Check Package Identifier',
        steps: [
          'Verify that the package name is distinct and not currently owned by another company on Amazon.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['package-name-conflict']
  },
  {
    id: '72',
    title: 'App Rejected Because of SDK (Play Store Policy)',
    slug: 'app-rejected-due-to-sdk',
    category: 'publishing-errors',
    summary: 'Google Play rejects the app due to non-compliant or outdated SDK libraries.',
    difficulty: 'Easy',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Using deprecated SDKs or privacy-violating tracker modules.'],
    solutions: [
      {
        title: 'Upgrade Outdated SDK Libraries',
        steps: [
          'Identify and update the specific library causing the violation in your dependencies.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['app-rejected-permissions', 'target-sdk-error']
  },
  {
    id: '73',
    title: 'App Rejected Because of 64-bit Requirement',
    slug: 'app-rejected-due-to-64bit',
    category: 'publishing-errors',
    summary: 'Google Play Console refuses to list the application because it lacks required 64-bit binaries.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Uploading only 32-bit compiled architectures.'],
    solutions: [
      {
        title: 'Build Universal AAB',
        steps: [
          'Compile using standard Android App Bundles that wrap all necessary architectures.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['64-bit-error', 'apk-is-not-compatible']
  },
  {
    id: '74',
    title: 'App Rejected Because of Permissions',
    slug: 'app-rejected-permissions',
    category: 'publishing-errors',
    summary: 'The app store rejects the app submission because it requests high-risk or sensitive permissions without full justification.',
    difficulty: 'Medium',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: ['Requesting sensitive permissions like ACCESS_BACKGROUND_LOCATION or QUERY_ALL_PACKAGES.'],
    solutions: [
      {
        title: 'Remove Unnecessary Permissions',
        steps: [
          'Open your manifest file.',
          'Delete any sensitive permission tag you do not strictly require for your primary features.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['permission-denied']
  },
  {
    id: '75',
    title: 'App Crashes on Older Android Versions',
    slug: 'crashes-on-older-android',
    category: 'sdk-errors',
    summary: 'The application runs fine on new devices but crashes instantly on older ones.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Using Java 8+ features or newer API calls without enabling API desugaring.'],
    solutions: [
      {
        title: 'Enable Gradle Desugaring Support',
        steps: [
          'Open your `app/build.gradle`.',
          'Add `coreLibraryDesugaringEnabled true` under compilation options.',
          'Add desugar dependencies inside dependencies block.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['minimum-sdk-error', 'app-keeps-crashing']
  },
  {
    id: '76',
    title: 'App Crashes on Android 14 (API 34)',
    slug: 'crashes-on-android-14',
    category: 'sdk-errors',
    summary: 'The application crashes specifically on Android 14 due to updated security rules.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Launching implicit intent receivers without specifying export flags.'],
    solutions: [
      {
        title: 'Specify Broadcast Receiver Export Flags',
        steps: [
          'For any broadcast receiver registered dynamically, always specify `RECEIVER_EXPORTED` or `RECEIVER_NOT_EXPORTED`.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['target-sdk-error', 'crashes-on-android-15']
  },
  {
    id: '77',
    title: 'App Crashes on Android 15 (API 35)',
    slug: 'crashes-on-android-15',
    category: 'sdk-errors',
    summary: 'App crashes specifically on Android 15 due to stricter platform constraints.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Non-compliant foreground service setups.'],
    solutions: [
      {
        title: 'Declare Foreground Service Types',
        steps: [
          'Always declare explicit foreground service types inside manifest `<service>` tag.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['crashes-on-android-14', 'crashes-on-android-16']
  },
  {
    id: '78',
    title: 'App Crashes on Android 16 (API 36 Preview)',
    slug: 'crashes-on-android-16',
    category: 'sdk-errors',
    summary: 'Crashes on the upcoming Android 16 platform because of breaking security policies.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: ['Using deprecated platform internals.'],
    solutions: [
      {
        title: 'Update to Latest AGP',
        steps: [
          'Upgrade Android Gradle Plugin (AGP) and dependencies to preview channels.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['crashes-on-android-15']
  },
  {
    id: '79',
    title: 'Screen Doesn\'t Fit (Layout Display Bug)',
    slug: 'screen-does-not-fit',
    category: 'android-errors',
    summary: 'The UI overlaps or cuts off, particularly on notch-displays.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Ignoring system inset values during display drawing.'],
    solutions: [
      {
        title: 'Apply WindowInsets to Views',
        steps: [
          'Apply padding to handle top and bottom navigation system insets.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['keyboard-covers-input']
  },
  {
    id: '80',
    title: 'Keyboard Covers Input Field',
    slug: 'keyboard-covers-input',
    category: 'android-errors',
    summary: 'The soft keyboard slides up and covers active text input forms.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Incorrect adjustResize window configuration.'],
    solutions: [
      {
        title: 'Configure windowSoftInputMode',
        steps: [
          'Add `android:windowSoftInputMode="adjustResize"` to the activity tag inside AndroidManifest.xml.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['screen-does-not-fit']
  },
  {
    id: '81',
    title: 'App Orientation Problem (Screen Rotation Reset)',
    slug: 'orientation-problem',
    category: 'android-errors',
    summary: 'Rotating the device destroys active state, resetting layout interfaces.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['The activity is re-created entirely on orientation change.'],
    solutions: [
      {
        title: 'Handle Configuration Changes',
        steps: [
          'Add: `android:configChanges="orientation|screenSize"` to the activity tag in the manifest.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['app-keeps-crashing']
  },
  {
    id: '82',
    title: 'Dark Mode Problem (Unreadable Text)',
    slug: 'dark-mode-problem',
    category: 'android-errors',
    summary: 'The app shifts to dark mode, making elements with hardcoded colors unreadable.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Hardcoding dark text colors on transparent backgrounds.'],
    solutions: [
      {
        title: 'Use Dynamic Theme Attributes',
        steps: [
          'Replace static HEX color codes with dynamic Android color resources.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['screen-does-not-fit']
  },
  {
    id: '83',
    title: 'Notification Not Showing',
    slug: 'notification-not-showing',
    category: 'android-errors',
    summary: 'The application attempts to post a notification, but it fails to render.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Not specifying a required Notification Channel for Android 8+.'],
    solutions: [
      {
        title: 'Create Notification Channel',
        steps: [
          'Construct a `NotificationChannel` object programmatically and register it with the NotificationManager.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['notification-permission-error', 'push-notification-error']
  },
  {
    id: '84',
    title: 'Push Notification Error (FCM Token Missing)',
    slug: 'push-notification-error',
    category: 'android-errors',
    summary: 'Cloud messages are not delivered to target devices.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Failed FCM registration token generation.'],
    solutions: [
      {
        title: 'Check Play Services Connection',
        steps: [
          'Verify that Google Play Services is available and running on the target device.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['notification-not-showing', 'firebase-connection-error']
  },
  {
    id: '85',
    title: 'Firebase Connection Error',
    slug: 'firebase-connection-error',
    category: 'api-errors',
    summary: 'App fails to synchronize with Firebase Services, throwing API exceptions.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Using outdated google-services.json file details.'],
    solutions: [
      {
        title: 'Re-import google-services.json',
        steps: [
          'Download the latest config file from the Firebase developer dashboard and place it inside your project\'s `app/` folder.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['push-notification-error', 'api-key-error']
  },
  {
    id: '86',
    title: 'API Key Error (Invalid API Key)',
    slug: 'api-key-error',
    category: 'api-errors',
    summary: 'External service requests fail with unauthorized responses.',
    difficulty: 'Easy',
    estimatedTime: '3 mins',
    lastReviewed: 'August 2026',
    causes: ['Typos or expired API credentials.'],
    solutions: [
      {
        title: 'Verify Secret Env Keys',
        steps: [
          'Double check API credentials in your environment configurations.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['firebase-connection-error', 'http-401']
  },
  {
    id: '87',
    title: 'JSON Parsing Error (JSONException)',
    slug: 'json-parsing-error',
    category: 'api-errors',
    summary: 'The client crashes when processing server API payloads.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Mismatch in server response formats (e.g. receiving HTML instead of JSON).'],
    solutions: [
      {
        title: 'Inspect Raw Network Logs',
        steps: [
          'Use a network analyzer to verify that the server response is valid, well-formed JSON.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-400', 'api-connection-failed']
  },
  {
    id: '88',
    title: 'Authentication Error (Login Failed)',
    slug: 'authentication-error',
    category: 'api-errors',
    summary: 'User login attempts fail repeatedly.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Invalid token cache state on client devices.'],
    solutions: [
      {
        title: 'Clear Stored Auth Preferences',
        steps: [
          'Reset local Shared Preferences or cache values on login error.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['http-401', 'login-not-working']
  },
  {
    id: '89',
    title: 'Login Not Working (WebView Session Crash)',
    slug: 'login-not-working',
    category: 'webview-errors',
    summary: 'Login buttons inside your WebView wrapper do nothing.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Blocking OAuth popup windows.'],
    solutions: [
      {
        title: 'Enable Multiple Windows Support',
        steps: [
          'Enable window popup setting on the WebView inside your Java activity.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['webview-blank-screen', 'authentication-error']
  },
  {
    id: '90',
    title: 'Google Sign-In Error (Developer Console Config)',
    slug: 'google-signin-error',
    category: 'publishing-errors',
    summary: 'Google sign-in attempts fail with Developer Exception code 10.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing SHA-1 credential signatures in the Google Developer Console.'],
    solutions: [
      {
        title: 'Add SHA-1 Signature',
        steps: [
          'Generate SHA-1 signature using gradle signingReport.',
          'Paste signature into Firebase or Google Cloud settings.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['signing-error', 'keystore-error']
  },
  {
    id: '91',
    title: 'Image Not Loading (Empty Graphics)',
    slug: 'image-not-loading',
    category: 'android-errors',
    summary: 'Images inside list layouts remain blank.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Missing secure network policies or broken image URLs.'],
    solutions: [
      {
        title: 'Verify Image Loading Client',
        steps: [
          'Use popular optimized libraries like Glide or Picasso for smooth image caching and loading.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['cleartext-traffic-not-permitted']
  },
  {
    id: '92',
    title: 'Video Not Playing',
    slug: 'video-not-playing',
    category: 'android-errors',
    summary: 'Videos display only continuous spinner graphics or throw format errors.',
    difficulty: 'Medium',
    estimatedTime: '10 mins',
    lastReviewed: 'August 2026',
    causes: ['Un-supported video codecs or unencrypted content links.'],
    solutions: [
      {
        title: 'Use ExoPlayer Library',
        steps: [
          'Integrate standard ExoPlayer components for reliable media streaming.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['cleartext-traffic-not-permitted']
  },
  {
    id: '93',
    title: 'Audio Not Playing',
    slug: 'audio-not-playing',
    category: 'android-errors',
    summary: 'Sound clips fail to produce sound output.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Un-released media player resources or silent phone audio channels.'],
    solutions: [
      {
        title: 'Check Volume Channel Settings',
        steps: [
          'Ensure phone media volume is turned on.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['video-not-playing']
  },
  {
    id: '94',
    title: 'File Picker Not Opening',
    slug: 'file-picker-not-opening',
    category: 'android-errors',
    summary: 'The application freezes when requesting file uploads.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Using outdated, deprecated file picker libraries.'],
    solutions: [
      {
        title: 'Use Activity Result Launcher',
        steps: [
          'Migrate to standard ActivityResultContracts.GetContent() launchers.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['file-access-error', 'storage-permission-error']
  },
  {
    id: '95',
    title: 'Downloaded File Cannot Open',
    slug: 'downloaded-file-cannot-open',
    category: 'android-errors',
    summary: 'Tapping on a downloaded file from notifications results in "Cannot open file".',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Not using a FileProvider to share secure folders with secondary applications.'],
    solutions: [
      {
        title: 'Setup FileProvider Content Sharing',
        steps: [
          'Configure a safe `<provider>` block in AndroidManifest.xml.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['file-access-error']
  },
  {
    id: '96',
    title: 'Storage Full Error (Out of Disk Space)',
    slug: 'storage-full-error',
    category: 'android-errors',
    summary: 'The app halts because it cannot write data to internal folders.',
    difficulty: 'Easy',
    estimatedTime: '5 mins',
    lastReviewed: 'August 2026',
    causes: ['Low physical storage on the testing hardware.'],
    solutions: [
      {
        title: 'Clean Temp Cache Files',
        steps: [
          'Go to Settings > Storage and tap Free Up Space.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['apk-not-installing']
  },
  {
    id: '97',
    title: 'Out of Memory Error (Java OOM Exception)',
    slug: 'out-of-memory-error',
    category: 'gradle-errors',
    summary: 'The JVM heap allocation limits are exceeded, crashing the app.',
    difficulty: 'Hard',
    estimatedTime: '15 mins',
    lastReviewed: 'August 2026',
    causes: ['Memory leaks or loading overly high-resolution graphics.'],
    solutions: [
      {
        title: 'Request Large Heap Settings',
        steps: [
          'Add `android:largeHeap="true"` to your application tag.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['java-heap-error', 'app-keeps-crashing']
  },
  {
    id: '98',
    title: 'Java Heap Error (Gradle OutOfMemory)',
    slug: 'java-heap-error',
    category: 'gradle-errors',
    summary: 'Android Studio build fails because Gradle runs out of memory compile allocation.',
    difficulty: 'Medium',
    estimatedTime: '8 mins',
    lastReviewed: 'August 2026',
    causes: ['Low RAM allocations on gradle daemon parameters.'],
    solutions: [
      {
        title: 'Increase Gradle Daemon Heap',
        steps: [
          'Open `gradle.properties`.',
          'Add or update: `org.gradle.jvmargs=-Xmx2048m`'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['out-of-memory-error', 'android-studio-build-error']
  },
  {
    id: '99',
    title: 'App Performance Problem (Slow Rendering)',
    slug: 'slow-rendering',
    category: 'android-errors',
    summary: 'The user interface lags, drops frames, or triggers "App is not responding" (ANR).',
    difficulty: 'Hard',
    estimatedTime: '20 mins',
    lastReviewed: 'August 2026',
    causes: ['Heavy loops or main thread blockages.'],
    solutions: [
      {
        title: 'Profile App performance',
        steps: [
          'Launch CPU Profiler in Android Studio to isolate blocking tasks.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['slow-webview-app', 'black-screen']
  },
  {
    id: '100',
    title: 'Slow WebView App (Optimizing WebView Lag)',
    slug: 'slow-webview-app',
    category: 'webview-errors',
    summary: 'The wrapped hybrid webview application performs poorly compared to standard native builds.',
    difficulty: 'Medium',
    estimatedTime: '12 mins',
    lastReviewed: 'August 2026',
    causes: ['Hardware acceleration or layer caching is disabled.'],
    solutions: [
      {
        title: 'Turn On Hardware Acceleration',
        steps: [
          'Set hardware acceleration tag: `android:hardwareAccelerated="true"` in your manifest file.'
        ]
      }
    ],
    prevention: [],
    relatedErrors: ['slow-rendering', 'webview-blank-screen']
  }
];
