import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, Typography } from '@/constants/design';
import { useLayoutDirection } from '@/hooks/use-layout';
import type { IconName } from '@/types';

import { WaslIcon } from './wasl-icon';

type StatusTone = 'soft' | 'blush' | 'mint' | 'amber';

const TONE_STYLES: Record<StatusTone, { background: string; ink: string }> = {
  soft: { background: Palette.primarySoft, ink: Palette.onSoft },
  blush: { background: Palette.blush, ink: Palette.blushInk },
  mint: { background: Palette.mint, ink: Palette.mintInk },
  amber: { background: Palette.amber, ink: Palette.amberInk },
};

export function StatusBadge({
  label,
  tone = 'soft',
  icon,
}: {
  label: string;
  tone?: StatusTone;
  icon?: IconName;
}) {
  const colors = TONE_STYLES[tone];
  const { rowDirection, textAlign } = useLayoutDirection();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.background, flexDirection: rowDirection },
      ]}
      accessible
      accessibilityLabel={label}>
      {icon ? <WaslIcon name={icon} size={16} color={colors.ink} /> : null}
      <Text style={[Typography.caption, { color: colors.ink, textAlign }]}>{label}</Text>
    </View>
  );
}

export function NoticeCard({
  title,
  message,
  tone = 'soft',
  icon = 'info',
}: {
  title: string;
  message: string;
  tone?: StatusTone;
  icon?: IconName;
}) {
  const colors = TONE_STYLES[tone];
  const { rowDirection, textAlign } = useLayoutDirection();

  return (
    <View
      style={[styles.notice, { backgroundColor: colors.background, flexDirection: rowDirection }]}
      accessible
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${title}. ${message}`}>
      <View style={styles.noticeIcon}>
        <WaslIcon name={icon} size={22} color={colors.ink} />
      </View>
      <View style={styles.noticeBody}>
        <Text style={[Typography.smallStrong, { color: colors.ink, textAlign }]}>{title}</Text>
        <Text style={[Typography.small, { color: colors.ink, textAlign, marginTop: Spacing.xs }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    minHeight: 36,
  },
  notice: {
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    ...Shadows.card,
  },
  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeBody: {
    flex: 1,
  },
});
