/**
 * Entrypoint for all internationalization stuff
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import i18n from 'i18next';

import en from './en';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

i18n.init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    nsMode: 'default',
  },
  resources: {
    en: {
      translation: en,
    },
  },
});

export default i18n;
