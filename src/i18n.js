import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON translation files
import enTranslation from './locales/en.json';
import alTranslation from './locales/al.json';

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Initializes i18next with React
  .init({
    resources: {
      en: { translation: enTranslation },
      al: { translation: alTranslation }
    },
    fallbackLng: 'en', // Default language
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'], // Saves the selected language in localStorage
    },
    interpolation: {
      escapeValue: false, // Prevents XSS since React escapes content by default
    },
  });

export default i18n;
