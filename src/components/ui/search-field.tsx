import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Palette, Radius, Spacing, TouchTarget, Typography } from '@/constants/design';
import { useLayoutDirection } from '@/hooks/use-layout';

import { WaslIcon } from './wasl-icon';

export function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}) {
  const { rowDirection, textAlign } = useLayoutDirection();

  return (
    <View style={[styles.field, { flexDirection: rowDirection }]}>
      <WaslIcon name="search" size={21} color={Palette.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Palette.textSecondary}
        accessibilityLabel={accessibilityLabel}
        accessible
        style={[styles.input, { textAlign }]}
        returnKeyType="search"
        autoCorrect={false}
      />
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  const { textAlign } = useLayoutDirection();

  return <Text style={[Typography.heading, { textAlign }]}>{children}</Text>;
}

export function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { textAlign } = useLayoutDirection();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}>
      <Text
        style={[
          Typography.smallStrong,
          { textAlign },
          selected ? styles.chipTextSelected : styles.chipTextIdle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: TouchTarget.minHeight,
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Palette.text,
    paddingVertical: Spacing.md,
  },
  chip: {
    minHeight: TouchTarget.minHeight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  chipTextSelected: {
    color: Palette.onPrimary,
  },
  chipTextIdle: {
    color: Palette.textSecondary,
  },
  pressed: {
    opacity: 0.75,
  },
});
