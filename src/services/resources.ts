import type { TranslationKey } from '@/localization/translations';
import type { ServiceStatus } from '@/types';

export const RESOURCE_STATUS: ServiceStatus = 'sample-data';

export type CityId = 'casablanca' | 'rabat' | 'marrakech' | 'fes' | 'tangier';

export type SampleResource = {
  id: string;
  city: CityId;
  categoryKey: TranslationKey;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

export const CITY_OPTIONS: { id: CityId; labelKey: TranslationKey }[] = [
  { id: 'casablanca', labelKey: 'help.city.casablanca' },
  { id: 'rabat', labelKey: 'help.city.rabat' },
  { id: 'marrakech', labelKey: 'help.city.marrakech' },
  { id: 'fes', labelKey: 'help.city.fes' },
  { id: 'tangier', labelKey: 'help.city.tangier' },
];

export const SUPPORT_CATEGORY_KEYS: TranslationKey[] = [
  'help.category.legal',
  'help.category.health',
  'help.category.shelter',
  'help.category.digital',
  'help.category.community',
];

export const SAMPLE_RESOURCES: SampleResource[] = [
  {
    id: 'sample-a',
    city: 'casablanca',
    categoryKey: 'help.category.legal',
    titleKey: 'help.resource.one.title',
    descriptionKey: 'help.resource.one.desc',
  },
  {
    id: 'sample-b',
    city: 'rabat',
    categoryKey: 'help.category.health',
    titleKey: 'help.resource.two.title',
    descriptionKey: 'help.resource.two.desc',
  },
  {
    id: 'sample-c',
    city: 'marrakech',
    categoryKey: 'help.category.community',
    titleKey: 'help.resource.three.title',
    descriptionKey: 'help.resource.three.desc',
  },
];
