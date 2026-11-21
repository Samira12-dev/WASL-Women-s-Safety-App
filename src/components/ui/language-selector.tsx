import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, TouchTarget, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { LANGUAGE_OPTIONS } from '@/localization/translations';

import { WaslIcon } from './wasl-icon';

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLocalization();
  const { rowDirection, textAlign } = useLayoutDirection();
  const [open, setOpen] = useState(false);

  const current =
    LANGUAGE_OPTIONS.find((option) => option.code === language) ?? LANGUAGE_OPTIONS[0];
  const currentLabel = t(current.labelKey);

  const close = () => setOpen(false);
  const select = (code: (typeof LANGUAGE_OPTIONS)[number]['code']) => {
    setLanguage(code);
    close();
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${t('common.language')}: ${currentLabel}`}
        accessibilityHint={t('common.languageHint')}
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [
          styles.trigger,
          compact && styles.triggerCompact,
          pressed && styles.pressed,
        ]}>
        <View style={[styles.triggerContent, { flexDirection: rowDirection }]}>
          <WaslIcon name="language" size={18} color={Palette.primary} />
          <Text style={[styles.triggerText, compact && styles.triggerTextCompact, { textAlign }]}>
            {currentLabel}
          </Text>
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={close}
        statusBarTranslucent>
        <Pressable style={styles.overlay} onPress={close} accessibilityLabel={t('common.close')}>
          <Pressable
            style={[styles.panel, { flexDirection: rowDirection }]}
            onPress={(event) => event.stopPropagation()}
            accessible
            accessibilityViewIsModal
            accessibilityLabel={t('common.language')}>
            <View style={styles.panelBody}>
              <View style={[styles.panelHeader, { flexDirection: rowDirection }]}>
                <WaslIcon name="language" size={22} color={Palette.primary} />
                <Text style={[Typography.heading, { textAlign, flex: 1 }]}>
                  {t('common.language')}
                </Text>
                <Pressable
                  onPress={close}
                  accessibilityRole="button"
                  accessibilityLabel={t('common.close')}
                  hitSlop={8}
                  style={styles.closeButton}>
                  <WaslIcon name="close" size={20} color={Palette.textSecondary} />
                </Pressable>
              </View>

              <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
                {t('common.languageHint')}
              </Text>

              <View style={styles.options}>
                {LANGUAGE_OPTIONS.map((option) => {
                  const selected = option.code === language;
                  return (
                    <Pressable
                      key={option.code}
                      onPress={() => select(option.code)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      accessibilityLabel={t(option.labelKey)}
                      style={({ pressed }) => [
                        styles.option,
                        selected && styles.optionSelected,
                        pressed && styles.pressed,
                      ]}>
                      <View style={[styles.optionContent, { flexDirection: rowDirection }]}>
                        <Text
                          style={[
                            Typography.bodyStrong,
                            { textAlign, flex: 1 },
                            selected ? styles.optionTextSelected : styles.optionTextIdle,
                          ]}>
                          {t(option.labelKey)}
                        </Text>
                        {selected ? (
                          <WaslIcon name="check" size={20} color={Palette.onPrimary} />
                        ) : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: TouchTarget.minHeight,
    minWidth: 112,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  triggerCompact: {
    minHeight: 46,
    minWidth: 102,
    paddingHorizontal: Spacing.sm,
  },
  triggerContent: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  triggerText: {
    color: Palette.primaryDeep,
    fontSize: 15,
    fontWeight: '700',
  },
  triggerTextCompact: {
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(46, 37, 66, 0.34)',
    padding: Spacing.lg,
  },
  panel: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Palette.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.lifted,
  },
  panelBody: {
    flex: 1,
    padding: Spacing.lg,
  },
  panelHeader: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  closeButton: {
    minWidth: TouchTarget.compact,
    minHeight: TouchTarget.compact,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  option: {
    minHeight: TouchTarget.minHeight,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Palette.surfaceMuted,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  optionSelected: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  optionContent: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  optionTextSelected: {
    color: Palette.onPrimary,
  },
  optionTextIdle: {
    color: Palette.text,
  },
  pressed: {
    opacity: 0.78,
  },
});
