import { NativeTheme, theme } from '@/constants/theme';
import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { headlessNotificationListener } from '@/utils/notificationListener';

// Register notification listener
AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName, () => headlessNotificationListener);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#2b2b2b' }}>
      <NativeThemeProvider value={NativeTheme}>
        <ThemeProvider theme={theme}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="notifications/index"
              options={{
                title: 'Notifications',
                headerStyle: { backgroundColor: '#2b2b2b' },
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: 'Settings',
                headerStyle: { backgroundColor: '#2b2b2b' },
              }}
            />
            <Stack.Screen
              name="whitelist"
              options={{
                title: 'Whitelist',
                headerStyle: { backgroundColor: '#2b2b2b' },
              }}
            />
          </Stack>
        </ThemeProvider>
      </NativeThemeProvider>
    </GestureHandlerRootView>
  );
}
