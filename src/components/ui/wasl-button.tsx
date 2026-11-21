import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, TouchTarget, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import type { IconName } from '@/types';

import { WaslIcon } from './wasl-icon';

type WaslButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'soft' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function WaslButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  accessibilityLabel,
}: WaslButtonProps) {
  const { direction, rowDirection, textAlign } = useLayoutDirection();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      <View style={[styles.content, { flexDirection: rowDirection }]}>
        {icon ? (
          <WaslIcon
            name={icon}
            size={21}
            color={variant === 'primary' ? Palette.onPrimary : Palette.primary}
            style={direction === 'rtl' ? styles.rtlIcon : undefined}
          />
        ) : null}
        <Text
          style={[
            Typography.button,
            { textAlign },
            variant === 'primary' ? styles.textPrimary : styles.textSecondary,
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function QuietButton({
  label,
  onPress,
  icon,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  icon?: IconName;
  accessibilityLabel?: string;
}) {
  const { rowDirection, textAlign } = useLayoutDirection();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [styles.quiet, pressed && styles.pressed]}>
      <View style={[styles.content, { flexDirection: rowDirection }]}>
        {icon ? <WaslIcon name={icon} size={20} color={Palette.primary} /> : null}
        <Text style={[Typography.smallStrong, { color: Palette.primary, textAlign }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function PlaceholderButton({
  onPress,
  label,
}: {
  onPress: () => void;
  label?: string;
}) {
  const { t } = useLocalization();

  return (
    <WaslButton
      label={label ?? t('common.comingSoon')}
      onPress={onPress}
      variant="soft"
      icon="sparkle"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: TouchTarget.minHeight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lifted,
  },
  primary: {
    backgroundColor: Palette.primary,
  },
  soft: {
    backgroundColor: Palette.primarySoft,
  },
  outline: {
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.primary,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  textPrimary: {
    color: Palette.onPrimary,
  },
  textSecondary: {
    color: Palette.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.78,
  },
  rtlIcon: {
    transform: [{ scaleX: -1 }],
  },
  quiet: {
    minHeight: TouchTarget.minHeight,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
});
