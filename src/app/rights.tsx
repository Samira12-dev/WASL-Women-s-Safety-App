import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { useNotice } from '@/hooks/use-notice';
import { LEGAL_ARTICLES, LEGAL_CATEGORY_KEYS } from '@/services/legal-content';
import type { TranslationKey } from '@/localization/translations';

import { NoticeCard, StatusBadge } from '@/components/ui/status-badge';
import { ScreenShell } from '@/components/ui/screen-shell';
import { FilterChip, SearchField, SectionTitle } from '@/components/ui/search-field';
import { SurfaceCard } from '@/components/ui/wasl-card';
import { WaslButton } from '@/components/ui/wasl-button';

export default function RightsScreen() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();
  const { notice, showNotice } = useNotice();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TranslationKey | null>(null);

  const articles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return LEGAL_ARTICLES.filter((article) => {
      const matchesCategory = !category || article.categoryKey === category;
      const matchesQuery =
        normalized.length === 0 ||
        t(article.titleKey).toLowerCase().includes(normalized) ||
        t(article.descriptionKey).toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, t]);

  return (
    <ScreenShell title={t('nav.rights')} subtitle={t('rights.subtitle')}>
      <View style={styles.section}>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder={t('rights.searchPlaceholder')}
          accessibilityLabel={t('rights.searchPlaceholder')}
        />
      </View>

      <View style={styles.section}>
        <SectionTitle>{t('rights.categoriesTitle')}</SectionTitle>
        <View style={styles.chips}>
          <FilterChip
            label={t('common.all')}
            selected={category === null}
            onPress={() => setCategory(null)}
          />
          {LEGAL_CATEGORY_KEYS.map((key) => (
            <FilterChip
              key={key}
              label={t(key)}
              selected={category === key}
              onPress={() => setCategory(category === key ? null : key)}
            />
          ))}
        </View>
      </View>

      {notice ? (
        <View style={styles.section}>
          <NoticeCard
            title={t('common.comingSoon')}
            message={notice}
            tone="amber"
            icon="sparkle"
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionTitle>{t('rights.articlesTitle')}</SectionTitle>
        {articles.length === 0 ? (
          <Text style={[Typography.small, { textAlign }]}>{t('common.searchEmpty')}</Text>
        ) : null}
        <View style={styles.articles}>
          {articles.map((article) => (
            <SurfaceCard key={article.id}>
              <StatusBadge label={t('common.notVerified')} tone="blush" icon="info" />
              <Text style={[Typography.heading, { textAlign, marginTop: Spacing.md }]}>
                {t(article.titleKey)}
              </Text>
              <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
                {t(article.descriptionKey)}
              </Text>
              <View style={styles.audioWrap}>
                <WaslButton
                  label={t('rights.audioButton')}
                  icon="audio"
                  variant="soft"
                  onPress={() => showNotice(t('common.featureUnavailable'))}
                />
              </View>
            </SurfaceCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('rights.statusTitle')}
          message={t('rights.statusBody')}
          tone="blush"
          icon="info"
        />
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('rights.sourcesTitle')}
          message={t('rights.sourcesBody')}
          tone="amber"
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
  articles: {
    gap: Spacing.md,
  },
  audioWrap: {
    marginTop: Spacing.lg,
  },
});
