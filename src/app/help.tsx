import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { CITY_OPTIONS, SAMPLE_RESOURCES, SUPPORT_CATEGORY_KEYS, type CityId } from '@/services/resources';
import type { TranslationKey } from '@/localization/translations';

import { NoticeCard, StatusBadge } from '@/components/ui/status-badge';
import { ScreenShell } from '@/components/ui/screen-shell';
import { FilterChip, SearchField, SectionTitle } from '@/components/ui/search-field';
import { SurfaceCard } from '@/components/ui/wasl-card';

export default function HelpScreen() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<CityId | null>(null);
  const [category, setCategory] = useState<TranslationKey | null>(null);

  const resources = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return SAMPLE_RESOURCES.filter((resource) => {
      const matchesCity = !city || resource.city === city;
      const matchesCategory = !category || resource.categoryKey === category;
      const matchesQuery =
        normalized.length === 0 ||
        t(resource.titleKey).toLowerCase().includes(normalized) ||
        t(resource.descriptionKey).toLowerCase().includes(normalized);
      return matchesCity && matchesCategory && matchesQuery;
    });
  }, [query, city, category, t]);

  return (
    <ScreenShell title={t('nav.help')} subtitle={t('help.subtitle')}>
      <View style={styles.section}>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder={t('help.searchPlaceholder')}
          accessibilityLabel={t('help.searchPlaceholder')}
        />
      </View>

      <View style={styles.section}>
        <SectionTitle>{t('help.cityLabel')}</SectionTitle>
        <View style={styles.chips}>
          <FilterChip label={t('common.all')} selected={city === null} onPress={() => setCity(null)} />
          {CITY_OPTIONS.map((option) => (
            <FilterChip
              key={option.id}
              label={t(option.labelKey)}
              selected={city === option.id}
              onPress={() => setCity(city === option.id ? null : option.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle>{t('help.categoriesTitle')}</SectionTitle>
        <View style={styles.chips}>
          {SUPPORT_CATEGORY_KEYS.map((key) => (
            <FilterChip
              key={key}
              label={t(key)}
              selected={category === key}
              onPress={() => setCategory(category === key ? null : key)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('common.sample')}
          message={t('help.sampleNotice')}
          tone="amber"
          icon="info"
        />
      </View>

      <View style={styles.section}>
        <SectionTitle>{t('help.resourcesTitle')}</SectionTitle>
        {resources.length === 0 ? (
          <Text style={[Typography.small, { textAlign }]}>{t('common.searchEmpty')}</Text>
        ) : null}
        <View style={styles.cards}>
          {resources.map((resource) => (
            <SurfaceCard key={resource.id}>
              <StatusBadge label={t('common.sample')} tone="amber" icon="info" />
              <Text style={[Typography.heading, { textAlign, marginTop: Spacing.md }]}>
                {t(resource.titleKey)}
              </Text>
              <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
                {t(resource.descriptionKey)}
              </Text>
              <View style={styles.meta}>
                <Text style={[Typography.small, { textAlign }]}>{t(resource.categoryKey)}</Text>
                <Text style={[Typography.small, { textAlign }]}>{t('help.contact')}</Text>
                <Text style={[Typography.small, { textAlign }]}>{t('help.website')}</Text>
              </View>
            </SurfaceCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('help.officialTitle')}
          message={t('help.officialBody')}
          tone="soft"
          icon="globe"
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cards: {
    gap: Spacing.md,
  },
  meta: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Palette.surfaceMuted,
    gap: Spacing.xs,
  },
});
