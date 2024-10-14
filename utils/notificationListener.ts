import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification } from '@/types/Notification';

export const headlessNotificationListener = async ({ notification }: any) => {
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
