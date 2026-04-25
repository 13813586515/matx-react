import { createContext, useState, useEffect, useMemo } from "react";
import enTranslations from "app/locales/en";
import zhTranslations from "app/locales/zh";

const LANGUAGE_KEY = "language";
const SUPPORTED_LANGUAGES = ["en", "zh"];

const LanguageContext = createContext({
  language: "en",
  t: (key) => key,
  setLanguage: () => {},
  isSupported: false
});

const translations = {
  en: enTranslations,
  zh: zhTranslations
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      return saved;
    }
    const browserLang = navigator.language.split("-")[0];
    return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : "en";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    }
  };

  const t = useMemo(() => {
    return (key, params = {}) => {
      const keys = key.split(".");
      let value = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      if (typeof value === "string") {
        return value.replace(/\{(\w+)\}/g, (_, k) => params[k] || `{${k}}`);
      }

      return key;
    };
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    isSupported: true
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
