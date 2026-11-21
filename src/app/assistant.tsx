import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Palette, Radius, Shadows, Spacing, TouchTarget, Typography } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';
import { useLayoutDirection } from '@/hooks/use-layout';
import { useNotice } from '@/hooks/use-notice';
import { createMessage, type AssistantMessage } from '@/services/assistant';

import { NoticeCard, StatusBadge } from '@/components/ui/status-badge';
import { ScreenShell } from '@/components/ui/screen-shell';
import { SectionTitle } from '@/components/ui/search-field';
import { SurfaceCard } from '@/components/ui/wasl-card';
import { QuietButton, WaslButton } from '@/components/ui/wasl-button';

export default function AssistantScreen() {
  const { t } = useLocalization();
  const { direction, rowDirection, textAlign } = useLayoutDirection();
  const { notice, showNotice } = useNotice();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const sendDraft = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      createMessage('user', text),
      createMessage('assistant', t('assistant.demoReply')),
    ]);
    setDraft('');
  };

  return (
    <ScreenShell
      title={t('nav.assistant')}
      subtitle={t('assistant.subtitle')}>
      <View style={styles.section}>
        <StatusBadge label={t('common.notConnected')} tone="blush" icon="info" />
      </View>

      <View style={styles.section}>
        <NoticeCard
          title={t('assistant.notConnectedTitle')}
          message={t('assistant.notConnectedBody')}
          tone="blush"
          icon="info"
        />
      </View>

      {notice ? (
        <View style={styles.section}>
          <NoticeCard title={t('common.comingSoon')} message={notice} tone="amber" icon="sparkle" />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionTitle>{t('assistant.conversationTitle')}</SectionTitle>
        <SurfaceCard>
          {messages.length === 0 ? (
            <Text style={[Typography.small, { textAlign }]}>{t('assistant.emptyConversation')}</Text>
          ) : (
            <View style={styles.messages}>
              {messages.map((message) => {
                const isUser = message.role === 'user';
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
                    key={message.id}
                    style={[
                      styles.bubble,
                      isUser ? styles.userBubble : styles.assistantBubble,
                      { alignSelf },
                    ]}>
                    <Text style={[Typography.caption, { textAlign, color: Palette.primary }]}>
                      {isUser ? t('assistant.you') : t('common.appName')}
                    </Text>
                    <Text style={[Typography.small, { textAlign, marginTop: Spacing.xs }]}>
                      {message.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </SurfaceCard>
      </View>

      <View style={styles.section}>
        <View style={[styles.composer, { flexDirection: rowDirection }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder={t('assistant.inputPlaceholder')}
            placeholderTextColor={Palette.textSecondary}
            accessibilityLabel={t('assistant.inputPlaceholder')}
            multiline
            style={[styles.input, { textAlign }]}
          />
          <WaslButton
            label={t('common.send')}
            icon="send"
            onPress={sendDraft}
            accessibilityLabel={t('common.send')}
          />
        </View>
      </View>

      <View style={styles.quickActions}>
        <QuietButton
          label={t('assistant.voiceButton')}
          icon="mic"
          onPress={() => showNotice(t('companion.voiceUnavailable'))}
        />
        <QuietButton
          label={t('assistant.audioResponse')}
          icon="audio"
          onPress={() => showNotice(t('common.featureUnavailable'))}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  messages: {
    gap: Spacing.md,
  },
  bubble: {
    maxWidth: '86%',
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.card,
  },
  userBubble: {
    backgroundColor: Palette.primarySoft,
  },
  assistantBubble: {
    backgroundColor: Palette.surfaceMuted,
  },
  composer: {
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    minHeight: TouchTarget.minHeight,
    maxHeight: 140,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Palette.text,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});
