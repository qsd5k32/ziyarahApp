import i18next from "i18next";
import en from './en.json';
import ar from './ar.json';
import { initReactI18next } from "react-i18next";
import 'intl-pluralrules';

i18next.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: { translation: en },
        ar: { translation: ar },
    },
    react: {
        useSuspense: false,
    },
});

export default i18next;