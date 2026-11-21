import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenShell } from '@/components/ui/screen-shell';
import { SurfaceCard } from '@/components/ui/wasl-card';
import { WaslButton } from '@/components/ui/wasl-button';
import { WaslGuideImage } from '@/components/ui/wasl-guide-image';
import { WaslIcon } from '@/components/ui/wasl-icon';
import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLayoutDirection } from '@/hooks/use-layout';
import { useLocalization } from '@/hooks/use-localization';

export default function WelcomeScreen() {
  const { t } = useLocalization();
  const { rowDirection, textAlign } = useLayoutDirection();

  return (
    <ScreenShell title={t('common.appName')} showBack={false} showBrand>
      <View style={styles.hero}>
        <View style={styles.guideFrame}>
          <WaslGuideImage width={112} height={150} accessibilityLabel={t('companion.sheetTitle')} />
        </View>
        <Text style={[Typography.title, styles.centered]} accessibilityRole="header">
          {t('welcome.title')}
        </Text>
        <Text style={[styles.heading, styles.centered]}>{t('welcome.heading')}</Text>
        <Text style={[Typography.body, styles.centered, styles.description]}>
          {t('welcome.description')}
        </Text>
      </View>

      <View style={styles.options}>
        <SurfaceCard style={styles.guestCard}>
          <Text style={[Typography.small, { textAlign }]}>{t('welcome.guest.desc')}</Text>
          <View style={styles.action}>
            <WaslButton
              label={t('welcome.guest.button')}
              icon="forward"
              fullWidth
              onPress={() => router.replace('/home')}
            />
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <Text style={[Typography.small, { textAlign }]}>{t('welcome.account.desc')}</Text>
          <View style={styles.action}>
            <WaslButton
              label={t('welcome.account.button')}
              icon="lock"
              variant="outline"
              fullWidth
              onPress={() => router.push('/account-soon')}
            />
          </View>
        </SurfaceCard>
      </View>

      <View style={[styles.privacy, { flexDirection: rowDirection }]}>
        <WaslIcon name="lock" size={18} color={Palette.primary} />
        <Text style={[Typography.small, styles.privacyText, { textAlign }]}>
          {t('welcome.privacy')}
        </Text>
      </View>

      <Text style={[styles.footer, styles.centered]}>{t('splash.slogan')}</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  centered: {
    textAlign: 'center',
  },
  guideFrame: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: Palette.surface,
    ...Shadows.card,
  },
  heading: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '700',
    color: Palette.primaryDeep,
  },
  description: {
    paddingHorizontal: Spacing.sm,
  },
  options: {
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  guestCard: {
    backgroundColor: Palette.primarySofter,
    borderColor: Palette.lilac,
  },
  action: {
    marginTop: Spacing.md,
  },
  privacy: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  privacyText: {
    flex: 1,
  },
  footer: {
    marginTop: Spacing.xl,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Palette.primary,
  },
});
