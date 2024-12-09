import i18n from "i18next";
import Cookies from "js-cookie";
import enTranslations from "./messages/en.json";
import deTranslations from "./messages/de.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    de: { translation: deTranslations },
  },
  lng: Cookies.get("language") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
