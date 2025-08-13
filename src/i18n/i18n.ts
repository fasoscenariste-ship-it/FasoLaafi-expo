import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../services/content/locales/fr.json';
import wo from '../services/content/locales/wo.json';
import bm from '../services/content/locales/bm.json';
import ff from '../services/content/locales/ff.json';
import yo from '../services/content/locales/yo.json';
import fon from '../services/content/locales/fon.json';
import en from '../services/content/locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: { fr: { translation: fr }, wo: { translation: wo }, bm: { translation: bm }, ff: { translation: ff }, yo: { translation: yo }, fon: { translation: fon }, en: { translation: en } },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false }
  });

export default i18n;
