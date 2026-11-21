import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { useNotice } from '@/hooks/use-notice';
import type { IconName } from '@/types';
import type { TranslationKey } from '@/localization/translations';

import { NoticeCard, StatusBadge } from '@/components/ui/status-badge';
import { ScreenShell } from '@/components/ui/screen-shell';
import { SectionTitle } from '@/components/ui/search-field';
import { SurfaceCard } from '@/components/ui/wasl-card';
import { WaslButton } from '@/components/ui/wasl-button';

const FEATURES: {
  id: string;
  icon: IconName;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  statusKey: TranslationKey;
}[] = [
  {
    id: 'planning',
    icon: 'note',
    titleKey: 'safety.planning.title',
    descKey: 'safety.planning.desc',
    statusKey: 'common.notImplemented',
  },
  {
    id: 'contacts',
    icon: 'contacts',
    titleKey: 'safety.contacts.title',
    descKey: 'safety.contacts.desc',
    statusKey: 'common.notImplemented',
  },
  {
    id: 'guardian',
    icon: 'bell',
    titleKey: 'safety.guardian.title',
    descKey: 'safety.guardian.desc',
    statusKey: 'common.notImplemented',
  },
  {
    id: 'sos',
    icon: 'sos',
    titleKey: 'safety.sos.title',
    descKey: 'safety.sos.desc',
    statusKey: 'common.notImplemented',
  },
];

export default function SafetyScreen() {
  const { t } = useLocalization();
  const { rowDirection, textAlign } = useLayoutDirection();
  const { notice, showNotice } = useNotice();

  const handleFeaturePress = (id: string) => {
    if (id === 'sos') {
      showNotice(t('safety.sosNotice'));
      return;
    }
    if (id === 'guardian') {
      showNotice(t('safety.guardianNotice'));
      return;
    }
    showNotice(t('common.comingSoon'));
  };

  return (
    <ScreenShell title={t('nav.safety')} subtitle={t('safety.subtitle')}>
      {notice ? (
        <View style={styles.section}>
          <NoticeCard title={t('common.comingSoon')} message={notice} tone="amber" icon="sparkle" />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionTitle>{t('nav.safety')}</SectionTitle>
        <View style={styles.cards}>
          {FEATURES.map((feature) => (
            <SurfaceCard key={feature.id}>
              <View style={[styles.cardHeader, { flexDirection: rowDirection }]}>
                <Text style={[Typography.bodyStrong, { textAlign, flex: 1 }]}>
                  {t(feature.titleKey)}
                </Text>
                <StatusBadge label={t(feature.statusKey)} tone="blush" />
              </View>
              <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
                {t(feature.descKey)}
              </Text>
              <View style={styles.actionWrap}>
                <WaslButton
                  label={t(feature.id === 'sos' ? 'common.open' : 'common.comingSoon')}
                  icon={feature.icon}
                  variant="soft"
                  onPress={() => handleFeaturePress(feature.id)}
                />
              </View>
            </SurfaceCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SurfaceCard>
          <View style={[styles.cardHeader, { flexDirection: rowDirection }]}>
            <Text style={[Typography.bodyStrong, { textAlign, flex: 1 }]}>
              {t('safety.quickExit.title')}
            </Text>
            <StatusBadge label={t('safety.quickExit.status')} tone="mint" icon="check" />
          </View>
          <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
            {t('safety.quickExit.desc')}
          </Text>
          <View style={styles.actionWrap}>
            <WaslButton
              label={t('safety.quickExit.title')}
              icon="home"
              onPress={() => router.navigate('/home')}
            />
          </View>
        </SurfaceCard>
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('safety.sosNotice')}
          message={t('safety.guardianNotice')}
          tone="blush"
          icon="info"
        />
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('safety.sos.title')}
          message={t('safety.emergencyNote')}
          tone="amber"
          icon="sos"
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
  cards: {
    gap: Spacing.md,
  },
  cardHeader: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  actionWrap: {
    marginTop: Spacing.lg,
  },
});
