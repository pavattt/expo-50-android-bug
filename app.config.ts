import { ConfigContext, ExpoConfig } from '@expo/config';
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Test',
  slug: 'test',
  owner: 'test',
  version: '1.00',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  splash: {
    backgroundColor: '#3f3981',
  },
  jsEngine: 'hermes',
  android: {
    package: 'com.test.test',
    versionCode: Math.floor(Date.now() / 1000),
    adaptiveIcon: {
      foregroundImage: './assets/app-icons/adaptive-icon.png',
      backgroundColor: '#3f3981',
    },
  },
  ios: {
    supportsTablet: true,
    buildNumber: Math.floor(Date.now() / 1000).toString(),
    bundleIdentifier: 'com.test.test',
    config: {
      usesNonExemptEncryption: false,
    },
  },
  assetBundlePatterns: ['**/*'],
  plugins: ['sentry-expo', 'expo-localization', 'expo-secure-store'],
  scheme: 'tictai',
});
