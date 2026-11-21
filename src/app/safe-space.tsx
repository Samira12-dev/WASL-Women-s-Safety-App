import { StyleSheet, Text, View } from 'react-native';

import { Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { useNotice } from '@/hooks/use-notice';
import { EVIDENCE_KINDS } from '@/services/evidence-storage';
import type { TranslationKey } from '@/localization/translations';

import { NoticeCard, StatusBadge } from '@/components/ui/status-badge';
import { ScreenShell } from '@/components/ui/screen-shell';
import { SectionTitle } from '@/components/ui/search-field';
import { SurfaceCard } from '@/components/ui/wasl-card';
import { WaslButton } from '@/components/ui/wasl-button';

const ITEM_KEYS: Record<
  (typeof EVIDENCE_KINDS)[number],
  { title: TranslationKey; description: TranslationKey }
> = {
  photo: { title: 'safe.item.photos', description: 'safe.item.photos.desc' },
  screenshot: { title: 'safe.item.screenshots', description: 'safe.item.screenshots.desc' },
  document: { title: 'safe.item.documents', description: 'safe.item.documents.desc' },
  audio: { title: 'safe.item.audio', description: 'safe.item.audio.desc' },
  note: { title: 'safe.item.notes', description: 'safe.item.notes.desc' },
};

export default function SafeSpaceScreen() {
  const { t } = useLocalization();
  const { rowDirection, textAlign } = useLayoutDirection();
  const { notice, showNotice } = useNotice();

  return (
    <ScreenShell title={t('nav.safeSpace')} subtitle={t('safe.subtitle')}>
      <View style={styles.section}>
        <NoticeCard
          title={t('safe.privacyTitle')}
          message={t('safe.privacyBody')}
          tone="soft"
          icon="lock"
        />
      </View>

      {notice ? (
        <View style={styles.section}>
          <NoticeCard title={t('common.comingSoon')} message={notice} tone="amber" icon="sparkle" />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionTitle>{t('safe.itemsTitle')}</SectionTitle>
        <View style={styles.items}>
          {EVIDENCE_KINDS.map((kind) => (
            <SurfaceCard key={kind}>
              <View style={[styles.itemHeader, { flexDirection: rowDirection }]}>
                <Text style={[Typography.bodyStrong, { textAlign, flex: 1 }]}>
                  {t(ITEM_KEYS[kind].title)}
                </Text>
                <StatusBadge label={t('common.notImplemented')} tone="blush" />
              </View>
              <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
                {t(ITEM_KEYS[kind].description)}
              </Text>
            </SurfaceCard>
          ))}
        </View>
        <View style={styles.addWrap}>
          <WaslButton
            label={t('safe.addButton')}
            icon="attachment"
            variant="soft"
            onPress={() => showNotice(t('common.featureUnavailable'))}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SurfaceCard>
          <SectionTitle>{t('safe.encryptionStatus')}</SectionTitle>
          <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
            {t('safe.backupStatus')}
          </Text>
        </SurfaceCard>
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('safe.futureTitle')}
          message={t('safe.futureBody')}
          tone="mint"
          icon="shield"
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
  items: {
    gap: Spacing.md,
  },
  itemHeader: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  addWrap: {
    marginTop: Spacing.md,
  },
});
