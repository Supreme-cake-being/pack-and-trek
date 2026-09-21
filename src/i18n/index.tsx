import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { en } from "./locales/en";
import { uk } from "./locales/uk";

export const translations = {
  uk,
  en,
} as const;

export type Language = keyof typeof translations;

export type Translation = {
  [key: string]: string | Translation;
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string) => string;
};

const DEFAULT_LANGUAGE: Language = "uk";

const LANGUAGE_STORAGE_KEY = "@pack_and_trek/language";

const I18nContext = createContext<I18nContextValue | null>(null);

function getTranslation(translation: Translation, key: string): string {
  const keys = key.split(".");

  let value: string | Translation = translation;

  for (const part of keys) {
    if (typeof value !== "object" || value === null || !(part in value)) {
      return key;
    }

    value = value[part];
  }

  return typeof value === "string" ? value : key;
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    async function loadLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (savedLanguage === "uk" || savedLanguage === "en") {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load language:", error);
      }
    }

    loadLanguage();
  }, []);

  const setLanguage = async (nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch (error) {
      console.error("Failed to save language:", error);
    }
  };

  const value = useMemo<I18nContextValue>(() => {
    const currentTranslations = translations[language] as Translation;

    return {
      language,
      setLanguage,
      t: (key: string) => getTranslation(currentTranslations, key),
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
