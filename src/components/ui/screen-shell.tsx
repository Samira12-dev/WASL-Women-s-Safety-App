import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Palette, Shadows, Spacing, TouchTarget, Typography, MaxContentWidth } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';

import { LanguageSelector } from './language-selector';
import { WaslIcon } from './wasl-icon';

export function WaslMark({ size = 44 }: { size?: number }) {
  return (
    <View style={[styles.mark, { width: size, height: size, borderRadius: size / 2 }]}>
      <WaslIcon name="sparkle" size={size * 0.52} color={Palette.onPrimary} />
    </View>
  );
}

export function WaslHeader({
  title,
  subtitle,
  showBack = false,
  showBrand = false,
  trailing,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showBrand?: boolean;
  trailing?: ReactNode;
}) {
  const { t } = useLocalization();
  const { direction, rowDirection, textAlign } = useLayoutDirection();

  return (
    <View style={[styles.header, { flexDirection: rowDirection }]}>
      <View style={styles.headerStart}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t('common.back')}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <WaslIcon
              name="back"
              size={23}
              color={Palette.primary}
              style={direction === 'rtl' ? styles.flipIcon : undefined}
            />
            <Text style={[Typography.smallStrong, { color: Palette.primary }]}>
              {t('common.back')}
            </Text>
          </Pressable>
        ) : showBrand ? (
          <View style={[styles.brand, { flexDirection: rowDirection }]}>
            <WaslMark />
            <Text style={styles.brandText}>WASL</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.headerCenter}>
        <Text style={[Typography.heading, { textAlign }]} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[Typography.small, { textAlign, marginTop: Spacing.xs }]} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.headerEnd}>{trailing ?? <LanguageSelector compact />}</View>
    </View>
  );
}

export function ScreenShell({
  title,
  subtitle,
  showBack = true,
  showBrand = false,
  trailing,
  children,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showBrand?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={styles.decor} pointerEvents="none">
        <View style={styles.blobLarge} />
        <View style={styles.blobSmall} />
      </View>
      <View style={[styles.headerWrap, { paddingTop: insets.top }]}>
        <View style={styles.headerInner}>
          <WaslHeader
            title={title}
            subtitle={subtitle}
            showBack={showBack}
            showBrand={showBrand}
            trailing={trailing}
          />
        </View>
      </View>
      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={[
          styles.contentInner,
          { paddingBottom: insets.bottom + Spacing.xxxl },
        ]}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  decor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    overflow: 'hidden',
  },
  blobLarge: {
    position: 'absolute',
    top: -130,
    left: -70,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Palette.primarySofter,
  },
  blobSmall: {
    position: 'absolute',
    top: -40,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Palette.blush,
    opacity: 0.55,
  },
  headerWrap: {
    backgroundColor: Palette.transparent,
  },
  headerInner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.sm,
    minHeight: TouchTarget.minHeight,
  },
  headerStart: {
    minWidth: 62,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
  },
  headerEnd: {
    minWidth: 108,
    alignItems: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: TouchTarget.minHeight,
    paddingRight: Spacing.sm,
  },
  brand: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brandText: {
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 1,
    color: Palette.primaryDeep,
  },
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.primary,
    ...Shadows.card,
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  pressed: {
    opacity: 0.7,
  },
  scrollWrap: {
    flex: 1,
  },
  contentInner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
});
