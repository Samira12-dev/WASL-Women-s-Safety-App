import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/ui/screen-shell';
import { NoticeCard } from '@/components/ui/status-badge';
import { WaslButton } from '@/components/ui/wasl-button';
import { Spacing } from '@/constants/design';
import { useLocalization } from '@/hooks/use-localization';

export default function AccountSoonScreen() {
  const { t } = useLocalization();

  const backToWelcome = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/welcome');
    }
  };

  return (
    <ScreenShell title={t('welcome.account.button')}>
      <View style={styles.section}>
        <NoticeCard
          title={t('welcome.account.soon.title')}
          message={t('welcome.account.soon.body')}
          tone="amber"
          icon="info"
        />
      </View>
      <View style={styles.section}>
        <WaslButton
          label={t('welcome.account.soon.back')}
          icon="back"
          fullWidth
          onPress={backToWelcome}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.xl,
  },
});
