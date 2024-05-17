// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// json
import ptTranslations from '../locales/pt.json';
import enTranslations from '../locales/en.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslations },
        pt: { translation: ptTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
