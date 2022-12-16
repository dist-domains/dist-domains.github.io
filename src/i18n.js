import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEn from "./locales/en-lang.json";
import translationDe from "./locales/de-lang.json";
import translationEs from "./locales/es-lang.json";
import translationFr from "./locales/fr-lang.json";
import translationZh from "./locales/zh-lang.json";
import translationAr from "./locales/ar-lang.json";
import translationRu from "./locales/ru-lang.json";
import translationJa from "./locales/ja-lang.json";

// the translations
const resources = {
  en: { translation: translationEn },
  de: { translation: translationDe },
  es: { translation: translationEs },
  fr: { translation: translationFr },
  zh: { translation: translationZh },
  ar: { translation: translationAr },
  ru: { translation: translationRu },
  ja: { translation: translationJa }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
