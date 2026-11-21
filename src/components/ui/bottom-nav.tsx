import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Palette, Spacing, TouchTarget } from '@/constants/design';
import { useLocalization, type Translate } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import type { IconName } from '@/types';

import { WaslIcon } from './wasl-icon';

type NavItem = {
  route: '/home' | '/rights' | '/companion' | '/help' | '/safety';
  labelKey: Parameters<Translate>[0];
  icon: IconName;
};

const NAV_ITEMS: NavItem[] = [
  { route: '/home', labelKey: 'common.home', icon: 'home' },
  { route: '/rights', labelKey: 'nav.rights', icon: 'book' },
  { route: '/companion', labelKey: 'nav.assistant', icon: 'chat' },
  { route: '/help', labelKey: 'nav.help', icon: 'support' },
  { route: '/safety', labelKey: 'nav.safety', icon: 'shield' },
];

export function BottomNav() {
  const { t } = useLocalization();
  const { rowDirection, textAlign } = useLayoutDirection();
  const insets = useSafeAreaInsets();

  const open = (route: NavItem['route']) => {
    if (route === '/home') {
      router.replace('/home');
      return;
    }
    router.push(route);
  };

  return (
    <View
      style={[
        styles.bar,
        { flexDirection: rowDirection, paddingBottom: insets.bottom || Spacing.sm },
      ]}>
      {NAV_ITEMS.map((item) => (
        <Pressable
          key={item.route}
          onPress={() => open(item.route)}
          accessibilityRole="tab"
          accessibilityLabel={t(item.labelKey)}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
          <WaslIcon name={item.icon} size={21} color={Palette.primary} />
          <Text style={[styles.label, { textAlign }]} numberOfLines={1}>
            {t(item.labelKey)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: TouchTarget.minHeight,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    backgroundColor: Palette.surface,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  item: {
    flex: 1,
    minHeight: TouchTarget.compact,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  pressed: {
    opacity: 0.65,
  },
});
