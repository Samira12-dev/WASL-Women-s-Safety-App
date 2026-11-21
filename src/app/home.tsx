import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BottomNav } from '@/components/ui/bottom-nav';
import { FemaleCompanion } from '@/components/ui/female-companion';
import { ScreenShell } from '@/components/ui/screen-shell';
import { SectionTitle } from '@/components/ui/search-field';
import { WaslCard } from '@/components/ui/wasl-card';
import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';

const DESTINATIONS = [
  {
    route: '/rights',
    titleKey: 'home.card.rights.title',
    descKey: 'home.card.rights.desc',
    icon: 'book',
    tone: 'primary',
  },
  {
    route: '/assistant',
    titleKey: 'home.card.assistant.title',
    descKey: 'home.card.assistant.desc',
    icon: 'chat',
    tone: 'blush',
  },
  {
    route: '/help',
    titleKey: 'home.card.help.title',
    descKey: 'home.card.help.desc',
    icon: 'support',
    tone: 'mint',
  },
  {
    route: '/safe-space',
    titleKey: 'home.card.safeSpace.title',
    descKey: 'home.card.safeSpace.desc',
    icon: 'lock',
    tone: 'amber',
  },
  {
    route: '/safety',
    titleKey: 'home.card.safety.title',
    descKey: 'home.card.safety.desc',
    icon: 'shield',
    tone: 'primary',
  },
] as const;

export default function HomeScreen() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();

  const renderCard = (index: number, compact: boolean) => {
    const item = DESTINATIONS[index];
    return (
      <WaslCard
        key={item.route}
        title={t(item.titleKey)}
        description={t(item.descKey)}
        icon={item.icon}
        tone={item.tone}
        compact={compact}
        onPress={() => router.push(item.route)}
      />
    );
  };

  return (
    <View style={styles.root}>
      <ScreenShell title={t('common.appName')} showBack={false} showBrand>
        <View style={styles.hero}>
          <Text style={[styles.greeting, { textAlign }]}>{t('home.welcome')}</Text>
          <Text style={[Typography.body, { textAlign, marginTop: Spacing.xs }]}>
            {t('home.subtitle')}
          </Text>
        </View>

        <View style={styles.companion}>
          <FemaleCompanion />
        </View>

        <View style={styles.section}>
          <SectionTitle>{t('home.sectionTitle')}</SectionTitle>
          <View style={styles.grid}>
            {[0, 1, 2, 3].map((index) => (
              <View key={DESTINATIONS[index].route} style={styles.gridItem}>
                {renderCard(index, true)}
              </View>
            ))}
          </View>
          <View style={styles.fullItem}>{renderCard(4, false)}</View>
        </View>
      </ScreenShell>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  hero: {
    paddingHorizontal: Spacing.sm,
  },
  greeting: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    color: Palette.text,
  },
  companion: {
    marginTop: Spacing.lg,
  },
  section: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  gridItem: {
    width: '48%',
    borderRadius: Radius.lg,
    ...Shadows.card,
  },
  fullItem: {
    borderRadius: Radius.lg,
    ...Shadows.card,
  },
});
