import { NativeTheme, theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppRegistry, View } from 'react-native';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { Notification } from './notifications/Notification';

const headlessNotificationListener = async ({ notification }: any) => {
  if (notification) {
    AsyncStorage.getItem('notifications')
      .then(res => {
        if (res) return JSON.parse(res);
        else return [];
      })
      .then(currentNotifs => {
        let newNotifs = [];
        const parsedNotif = JSON.parse(notification);
        const prevNotifIndex = currentNotifs.findIndex((notif: Notification) => notif.key === parsedNotif.key);
        if (prevNotifIndex > 0) {
          // If notification with key exists, overwrite it with the new one
          currentNotifs[prevNotifIndex] = parsedNotif;
          newNotifs = currentNotifs;
        } else {
          // Otherwise add the new notification normally
          newNotifs = [...currentNotifs, parsedNotif];
        }
        AsyncStorage.setItem('notifications', JSON.stringify(newNotifs));
      })
      .catch(error => console.log(error));
  }
};

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
    <View style={{ flex: 1, backgroundColor: '#2b2b2b' }}>
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
          </Stack>
        </ThemeProvider>
      </NativeThemeProvider>
    </View>
  );
}
