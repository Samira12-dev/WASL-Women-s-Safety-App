import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, TouchTarget, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import type { Language } from '@/types';

import { FilterChip } from './search-field';
import { ScreenShell } from './screen-shell';
import { NoticeCard } from './status-badge';
import { QuietButton, WaslButton } from './wasl-button';
import { WaslGuideImage } from './wasl-guide-image';

type Suggestion = 'rights' | 'help' | 'safety' | 'ask';

const SUGGESTIONS: {
  id: Suggestion;
  labelKey:
    | 'companion.suggestion.rights'
    | 'companion.suggestion.help'
    | 'companion.suggestion.safety'
    | 'companion.suggestion.ask';
}[] = [
  { id: 'rights', labelKey: 'companion.suggestion.rights' },
  { id: 'help', labelKey: 'companion.suggestion.help' },
  { id: 'safety', labelKey: 'companion.suggestion.safety' },
  { id: 'ask', labelKey: 'companion.suggestion.ask' },
];

const SPEECH_LANGUAGES: Record<Language, string> = {
  darija: 'ar-MA',
  ar: 'ar',
  en: 'en-US',
  fr: 'fr-FR',
};

export function CompanionScreen() {
  const { t, language } = useLocalization();
  const { direction, rowDirection, textAlign } = useLayoutDirection();
  const [draft, setDraft] = useState('');
  const [replies, setReplies] = useState<string[]>([]);
  const [voiceNotice, setVoiceNotice] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop().catch(() => undefined);
    };
  }, []);

  const handleSuggestion = (id: Suggestion, label: string) => {
    if (id === 'ask') {
      setVoiceNotice(false);
      setDraft(label);
      return;
    }

    if (id === 'rights') {
      router.push('/rights');
    } else if (id === 'help') {
      router.push('/help');
    } else {
      router.push('/safety');
    }
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setReplies((current) => [...current, text, t('companion.demoReply')]);
    setDraft('');
    setVoiceNotice(false);
  };

  const speakGreeting = () => {
    setSpeaking(true);
    Speech.speak(t('companion.greeting'), {
      language: SPEECH_LANGUAGES[language],
      rate: 0.95,
      onStart: () => setSpeaking(true),
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop().catch(() => undefined);
    setSpeaking(false);
  };

  return (
    <ScreenShell title={t('companion.sheetTitle')} showBack>
      <View style={[styles.hero, { flexDirection: rowDirection }]}>
        <WaslGuideImage
          width={142}
          height={190}
          accessibilityLabel={t('companion.sheetTitle')}
        />
        <View style={styles.heroCopy}>
          <Text style={[Typography.title, { textAlign }]}>{t('companion.greeting')}</Text>
          <Text style={[Typography.small, { textAlign, marginTop: Spacing.sm }]}>
            {t('home.companionDisclaimer')}
          </Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={[Typography.small, { textAlign }]}>{t('companion.demoNotice')}</Text>

        <Text style={[Typography.smallStrong, { textAlign, marginTop: Spacing.lg }]}>
          {t('companion.suggestionsTitle')}
        </Text>
        <View style={styles.suggestions}>
          {SUGGESTIONS.map((suggestion) => {
            const label = t(suggestion.labelKey);
            return (
              <FilterChip
                key={suggestion.id}
                label={label}
                selected={false}
                onPress={() => handleSuggestion(suggestion.id, label)}
              />
            );
          })}
        </View>

        {voiceNotice ? (
          <View style={styles.noticeWrap}>
            <NoticeCard
              title={t('common.notConnected')}
              message={t('companion.voiceUnavailable')}
              tone="amber"
              icon="mic"
            />
          </View>
        ) : null}

        {replies.length > 0 ? (
          <View style={styles.conversation}>
            {replies.map((reply, index) => {
              const isUser = index % 2 === 0;
              const alignSelf =
                direction === 'ltr'
                  ? isUser
                    ? ('flex-end' as const)
                    : ('flex-start' as const)
                  : isUser
                    ? ('flex-start' as const)
                    : ('flex-end' as const);
              return (
                <View
                  key={`${index}-${reply}`}
                  style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.guideBubble,
                    { alignSelf },
                  ]}>
                  <Text style={[Typography.small, { textAlign }]}>{reply}</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={styles.composer}>
          <View style={[styles.inputRow, { flexDirection: rowDirection }]}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder={t('companion.inputPlaceholder')}
              placeholderTextColor={Palette.textSecondary}
              accessibilityLabel={t('companion.inputPlaceholder')}
              multiline
              style={[styles.input, { textAlign }]}
            />
            <WaslButton
              label={t('companion.send')}
              icon="send"
              onPress={send}
              accessibilityLabel={t('companion.send')}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
            <QuietButton
              label={speaking ? t('companion.stopSpeaking') : t('companion.speak')}
              icon="audio"
              onPress={speaking ? stopSpeaking : speakGreeting}
            />
            <QuietButton
              label={t('companion.microphone')}
              icon="mic"
              onPress={() => setVoiceNotice(true)}
            />
            <QuietButton
              label={t('companion.openAssistant')}
              icon="chat"
              onPress={() => router.push('/assistant')}
            />
          </ScrollView>
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.lg,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    backgroundColor: Palette.surfaceMuted,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  heroCopy: {
    flex: 1,
  },
  panel: {
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Shadows.card,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  noticeWrap: {
    marginTop: Spacing.md,
  },
  conversation: {
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  bubble: {
    maxWidth: '86%',
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  userBubble: {
    backgroundColor: Palette.primarySoft,
  },
  guideBubble: {
    backgroundColor: Palette.surfaceMuted,
  },
  composer: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  inputRow: {
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: TouchTarget.minHeight,
    maxHeight: 120,
    backgroundColor: Palette.surfaceMuted,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Palette.text,
  },
  quickActions: {
    marginTop: Spacing.sm,
  },
});
