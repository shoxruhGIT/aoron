import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("i18nextLng") || "en";

i18next
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: language,
    debugger: true,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  });
