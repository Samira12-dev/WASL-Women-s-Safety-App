import { router } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WaslMark } from '@/components/ui/screen-shell';
import { Radius, Spacing } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';

export default function SplashScreenRoute() {
  const { t } = useLocalization();
  const { textAlign } = useLayoutDirection();
  const insets = useSafeAreaInsets();
  const entering = useRef(false);

  const enter = () => {
    if (entering.current) return;
    entering.current = true;
    router.replace('/welcome');
  };

  return (
    <Pressable
      onPress={enter}
      accessibilityRole="button"
      accessibilityLabel={t('splash.tapToStart')}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
      <View style={[styles.content, { paddingTop: insets.top + Spacing.xxxl }]}>
        <View style={styles.brand}>
          <WaslMark size={82} />
          <Text style={[styles.brandName, { textAlign }]}>{t('common.appName')}</Text>
          <Text style={styles.brandLatin}>WASL</Text>
          <Text style={[styles.slogan, { textAlign }]}>{t('splash.slogan')}</Text>
          <Text style={[styles.descriptor, { textAlign }]}>{t('splash.descriptor')}</Text>
        </View>

        <View style={styles.promptWrap}>
          <View style={styles.promptPill}>
            <Text style={[styles.prompt, { textAlign }]}>{t('splash.tapToStart')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.landscape} pointerEvents="none">
        <View style={styles.hillBack} />
        <View style={styles.hillMid} />
        <View style={styles.buildingA} />
        <View style={styles.buildingB} />
        <View style={styles.buildingC} />
        <View style={styles.buildingD} />
        <View style={styles.hillFront} />
        <View style={styles.ground} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FBF7FF',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.96,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  brand: {
    alignItems: 'center',
    marginTop: '8%',
  },
  brandName: {
    marginTop: Spacing.lg,
    fontSize: 54,
    lineHeight: 64,
    fontWeight: '800',
    color: '#4B2491',
  },
  brandLatin: {
    marginTop: Spacing.xs,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: 6,
    color: '#7F4FC2',
  },
  slogan: {
    marginTop: Spacing.xl,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    color: '#4B2491',
  },
  descriptor: {
    marginTop: Spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: '#7F6B9D',
  },
  promptWrap: {
    marginTop: 'auto',
    marginBottom: 132,
  },
  promptPill: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: '#E4D5FA',
  },
  prompt: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#5B457F',
  },
  landscape: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 190,
  },
  hillBack: {
    position: 'absolute',
    bottom: 46,
    left: -40,
    width: '76%',
    height: 92,
    borderRadius: 160,
    backgroundColor: '#E7D7FA',
    transform: [{ rotate: '-8deg' }],
  },
  hillMid: {
    position: 'absolute',
    bottom: 30,
    right: -50,
    width: '82%',
    height: 104,
    borderRadius: 180,
    backgroundColor: '#D8C1F6',
    transform: [{ rotate: '7deg' }],
  },
  buildingA: {
    position: 'absolute',
    bottom: 38,
    left: '8%',
    width: 26,
    height: 64,
    backgroundColor: '#B99BE8',
  },
  buildingB: {
    position: 'absolute',
    bottom: 38,
    left: '22%',
    width: 34,
    height: 94,
    backgroundColor: '#A987DF',
  },
  buildingC: {
    position: 'absolute',
    bottom: 38,
    right: '24%',
    width: 30,
    height: 74,
    backgroundColor: '#C0A6EA',
  },
  buildingD: {
    position: 'absolute',
    bottom: 38,
    right: '9%',
    width: 38,
    height: 108,
    backgroundColor: '#9F7BD8',
  },
  hillFront: {
    position: 'absolute',
    bottom: 12,
    left: -20,
    right: -20,
    height: 70,
    borderRadius: 140,
    backgroundColor: '#EADDF9',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 28,
    backgroundColor: '#F5EFFB',
  },
});
