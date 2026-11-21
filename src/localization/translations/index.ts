import type { Language } from '@/types';

import { arabic } from './arabic';
import { darija } from './darija';
import { english } from './english';
import { french } from './french';

export type TranslationKey = keyof typeof arabic;
export type Dictionary = Record<TranslationKey, string>;

export const dictionaries: Record<Language, Dictionary> = {
  ar: arabic,
  darija,
  fr: french,
  en: english,
};

export const LANGUAGE_OPTIONS: { code: Language; labelKey: TranslationKey }[] = [
  { code: 'darija', labelKey: 'common.lang.darija' },
  { code: 'ar', labelKey: 'common.lang.ar' },
  { code: 'en', labelKey: 'common.lang.en' },
  { code: 'fr', labelKey: 'common.lang.fr' },
];

export { arabic, darija, english, french };
