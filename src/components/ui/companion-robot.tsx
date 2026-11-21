import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';

import { WaslButton } from './wasl-button';

export function CompanionRobot() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();

  return (
    <View style={styles.card}>
      <View style={styles.robotColumn}>
        <View style={styles.antenna}>
          <View style={styles.antennaDot} />
        </View>
        <View style={styles.head} accessible accessibilityLabel={t('home.companionDisclaimer')}>
          <View style={styles.face}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.smile} />
          <View style={[styles.cheek, styles.cheekStart]} />
          <View style={[styles.cheek, styles.cheekEnd]} />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyBadge}>
            <Text style={styles.bodyBadgeText}>W</Text>
          </View>
        </View>
        <View style={styles.feet}>
          <View style={styles.foot} />
          <View style={styles.foot} />
        </View>
      </View>

      <View style={styles.copy}>
        <Text style={[Typography.heading, { textAlign }]}>{t('home.companionTitle')}</Text>
        <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
          {t('home.companionIntro')}
        </Text>
        <Text style={[Typography.caption, { color: Palette.primary, textAlign, marginTop: Spacing.md }]}>
          {t('home.companionDisclaimer')}
        </Text>
        <View style={styles.buttonWrap}>
          <WaslButton
            label={t('home.companionButton')}
            icon="chat"
            onPress={() => router.push('/assistant')}
            accessibilityLabel={t('home.companionButton')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
    ...Shadows.lifted,
  },
  robotColumn: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  antenna: {
    width: 3,
    height: 18,
    backgroundColor: Palette.lilac,
    alignItems: 'center',
  },
  antennaDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Palette.primary,
    marginTop: -7,
  },
  head: {
    width: 108,
    height: 84,
    borderRadius: Radius.lg,
    backgroundColor: Palette.primarySoft,
    borderWidth: 2,
    borderColor: Palette.lilac,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.card,
  },
  face: {
    flexDirection: 'row',
    gap: 26,
  },
  eye: {
    width: 14,
    height: 16,
    borderRadius: 8,
    backgroundColor: Palette.primaryDeep,
  },
  smile: {
    width: 34,
    height: 16,
    borderRadius: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: Palette.primaryDeep,
    marginTop: Spacing.sm,
  },
  cheek: {
    position: 'absolute',
    bottom: 12,
    width: 12,
    height: 8,
    borderRadius: 6,
    backgroundColor: Palette.blush,
  },
  cheekStart: { left: 14 },
  cheekEnd: { right: 14 },
  body: {
    marginTop: Spacing.sm,
    width: 84,
    height: 62,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderBottomLeftRadius: Radius.md,
    borderBottomRightRadius: Radius.md,
    backgroundColor: Palette.surfaceMuted,
    borderWidth: 2,
    borderColor: Palette.lilac,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyBadgeText: {
    color: Palette.onPrimary,
    fontSize: 19,
    fontWeight: '800',
  },
  feet: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.xs,
  },
  foot: {
    width: 22,
    height: 9,
    borderRadius: 6,
    backgroundColor: Palette.lilac,
  },
  copy: {
    flex: 1,
  },
  buttonWrap: {
    marginTop: Spacing.lg,
  },
});
