module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'hi', 'pt', 'it', 'ja', 'ko', 'zh', 'ar']
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
}; 