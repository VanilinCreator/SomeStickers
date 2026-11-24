# SomeStickers Android 1.0

The Android app is built with Capacitor and loads the hosted SomeStickers website inside the app.

## Requirements

- Node.js 22
- Java 21
- Android SDK 35 (installed by Android Studio)

## Build locally

```bash
npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

The debug APK is generated at:

`android/app/build/outputs/apk/debug/app-debug.apk`

The app loads:

`https://vanilincreator.github.io/SomeStickers/`

Capacitor navigation is configured to keep web destinations inside the app WebView. The Android system can still close the app normally.
