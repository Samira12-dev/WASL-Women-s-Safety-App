import { DarkTheme, DefaultTheme, LocaleProvider, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Palette } from '@/constants/design';
import { LocalizationProvider, useLocalization } from '@/hooks/use-localization';

SplashScreen.preventAutoHideAsync();

const SCREENS = [
  'index',
  'splash',
  'welcome',
  'account-soon',
  'home',
  'companion',
  'rights',
  'assistant',
  'help',
  'safe-space',
  'safety',
] as const;

function AppNavigation() {
  const { direction, isReady } = useLocalization();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LocaleProvider direction={direction}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            contentStyle: { backgroundColor: Palette.background },
          }}>
          {SCREENS.map((name) => (
            <Stack.Screen key={name} name={name} />
          ))}
        </Stack>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LocalizationProvider>
        <AppNavigation />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
