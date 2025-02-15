import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON  files
import enTranslation from './locales/en.json';
import alTranslation from './locales/al.json';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: enTranslation },
      al: { translation: alTranslation }
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'], 
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
