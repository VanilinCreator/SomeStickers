import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vanilincreator.somestickers',
  appName: 'SomeStickers',
  webDir: 'www',
  server: {
    url: 'https://vanilincreator.github.io/SomeStickers/',
    cleartext: false,
    allowNavigation: ['*']
  }
};

export default config;
