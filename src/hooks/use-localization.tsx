import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Direction, Language } from '@/types';

import { dictionaries, type TranslationKey } from '@/localization/translations';

export type Translate = (key: TranslationKey) => string;

type LocalizationContextValue = {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  isReady: boolean;
  setLanguage: (language: Language) => void;
  t: Translate;
};

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

const DEFAULT_LANGUAGE: Language = 'darija';
const LANGUAGE_STORAGE_KEY = 'wasl.language';

function isLanguage(value: string | null): value is Language {
  return value === 'ar' || value === 'darija' || value === 'fr' || value === 'en';
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY)
      .then((saved) => {
        if (active && isLanguage(saved)) {
          setLanguageState(saved);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setIsReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, next).catch(() => undefined);
  }, []);

  const value = useMemo<LocalizationContextValue>(() => {
    const direction: Direction = language === 'ar' || language === 'darija' ? 'rtl' : 'ltr';
    const dictionary = dictionaries[language];
    const fallback = dictionaries[DEFAULT_LANGUAGE];

    return {
      language,
      direction,
      isRTL: direction === 'rtl',
      isReady,
      setLanguage,
      t: (key: TranslationKey) => dictionary[key] ?? fallback[key],
    };
  }, [language, isReady, setLanguage]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  const value = useContext(LocalizationContext);

  if (!value) {
    throw new Error('useLocalization must be used inside LocalizationProvider');
  }

  return value;
}
