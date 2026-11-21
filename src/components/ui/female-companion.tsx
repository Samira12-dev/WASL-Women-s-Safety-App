import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';

import { WaslButton } from './wasl-button';
import { WaslGuideImage } from './wasl-guide-image';

export function FemaleCompanion() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();
  const open = () => router.push('/companion');

  return (
    <Pressable
      onPress={open}
      accessibilityRole="button"
      accessibilityLabel={`${t('companion.sheetTitle')}. ${t('home.companionDisclaimer')}`}
      accessibilityHint={t('home.companionButton')}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <WaslGuideImage width={104} height={140} accessibilityLabel={t('companion.sheetTitle')} />
      </View>

      <View style={styles.copy}>
        <Text style={[Typography.heading, { textAlign }]}>{t('home.companionTitle')}</Text>
        <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
          {t('home.companionIntro')}
        </Text>
        <Text
          style={[
            Typography.caption,
            { color: Palette.primary, textAlign, marginTop: Spacing.md },
          ]}>
          {t('home.companionDisclaimer')}
        </Text>
        <View style={styles.buttonWrap}>
          <WaslButton
            label={t('home.companionButton')}
            icon="chat"
            onPress={open}
            accessibilityLabel={t('home.companionButton')}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.lg,
    ...Shadows.lifted,
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    backgroundColor: Palette.surfaceMuted,
    paddingVertical: Spacing.sm,
  },
  copy: {
    flex: 1,
  },
  buttonWrap: {
    marginTop: Spacing.lg,
  },
  pressed: {
    opacity: 0.78,
  },
});
