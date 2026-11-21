import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLayoutDirection } from '@/hooks/use-layout';
import type { IconName } from '@/types';

import { WaslIcon } from './wasl-icon';

type Tone = 'primary' | 'blush' | 'mint' | 'amber';

const TONES: Record<Tone, { background: string; ink: string }> = {
  primary: { background: Palette.primarySoft, ink: Palette.primary },
  blush: { background: Palette.blush, ink: Palette.blushInk },
  mint: { background: Palette.mint, ink: Palette.mintInk },
  amber: { background: Palette.amber, ink: Palette.amberInk },
};

export function WaslCard({
  title,
  description,
  icon,
  onPress,
  tone = 'primary',
  badge,
  compact = false,
}: {
  title: string;
  description: string;
  icon: IconName;
  onPress: () => void;
  tone?: Tone;
  badge?: string;
  compact?: boolean;
}) {
  const colors = TONES[tone];
  const { direction, rowDirection, textAlign } = useLayoutDirection();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      style={({ pressed }) => [styles.card, compact && styles.compactCard, pressed && styles.pressed]}>
      <View style={[styles.cardRow, compact && styles.compactRow, { flexDirection: rowDirection }]}>
        <View style={[styles.iconWell, compact && styles.compactIconWell, { backgroundColor: colors.background }]}>
          <WaslIcon name={icon} size={compact ? 22 : 27} color={colors.ink} />
        </View>
        <View style={styles.cardBody}>
          <Text style={[compact ? styles.compactTitle : Typography.heading, { textAlign }]}>
            {title}
          </Text>
          <Text
            style={[
              compact ? styles.compactDescription : Typography.small,
              { textAlign, marginTop: Spacing.xs },
            ]}>
            {description}
          </Text>
          {badge ? (
            <Text style={[Typography.caption, { color: colors.ink, textAlign, marginTop: Spacing.sm }]}>
              {badge}
            </Text>
          ) : null}
        </View>
        {!compact ? (
          <WaslIcon
            name="forward"
            size={21}
            color={Palette.primary}
            style={direction === 'ltr' ? styles.chevronLtr : styles.chevronRtl}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

export function SurfaceCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    minHeight: 112,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  compactCard: {
    minHeight: 96,
    padding: Spacing.md,
  },
  cardRow: {
    alignItems: 'center',
    gap: Spacing.lg,
  },
  compactRow: {
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  cardBody: {
    flex: 1,
  },
  iconWell: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactIconWell: {
    width: 42,
    height: 42,
    borderRadius: Radius.sm,
  },
  compactTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: Palette.text,
  },
  compactDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: Palette.textSecondary,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  surface: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  chevronLtr: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRtl: {
    transform: [{ rotate: '180deg' }],
  },
});
