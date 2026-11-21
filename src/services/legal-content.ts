import type { TranslationKey } from '@/localization/translations';
import type { ServiceStatus } from '@/types';

export const LEGAL_CONTENT_STATUS: ServiceStatus = 'sample-data';

export const LEGAL_CATEGORY_KEYS: TranslationKey[] = [
  'rights.category.general',
  'rights.category.work',
  'rights.category.family',
  'rights.category.physical',
  'rights.category.psychological',
  'rights.category.digital',
];

export const LEGAL_ARTICLES: {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  categoryKey: TranslationKey;
}[] = [
  {
    id: 'sample-1',
    titleKey: 'rights.article.one.title',
    descriptionKey: 'rights.article.one.desc',
    categoryKey: 'rights.category.general',
  },
  {
    id: 'sample-2',
    titleKey: 'rights.article.two.title',
    descriptionKey: 'rights.article.two.desc',
    categoryKey: 'rights.category.family',
  },
  {
    id: 'sample-3',
    titleKey: 'rights.article.three.title',
    descriptionKey: 'rights.article.three.desc',
    categoryKey: 'rights.category.digital',
  },
];
