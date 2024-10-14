import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Notification } from '@/types/Notification';

import { NotificationItem } from './NotificationItem';

import * as S from './styles';

dayjs.extend(relativeTime);

let interval: any = null;

export default function NotificationView() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleCheckNotificationInterval = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  useEffect(() => {
    clearInterval(interval);
    handleCheckNotificationInterval();
    interval = setInterval(handleCheckNotificationInterval, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeNotifs = async (userNotifs: Notification[]) => {
    setNotifications(prevNotifications => {
      const newNotifs = prevNotifications.filter(notif => {
        return !userNotifs.find(userNotif => userNotif.key === notif.key);
      });
      AsyncStorage.setItem('notifications', JSON.stringify(newNotifs));
      return newNotifs;
    });
  };

  const processNotifications = (notifs: Notification[]) => {
    const sorted = notifs.sort((a: Notification, b: Notification) => (a.time < b.time ? 1 : -1));
    const grouped = sorted.reduce((res: Record<string, Notification[]>, n) => {
      (res[n.app] = res[n.app] || []).push(n);
      return res;
    }, {});
    return grouped;
  };

  return (
    <S.MainView>
      <S.NotificationsWrapper>
        <ScrollView>
          {Object.entries(processNotifications(notifications)).map(([app, notification]) => {
            return <NotificationItem key={app} app={app} notifs={notification} removeNotifs={removeNotifs} />;
          })}
        </ScrollView>
      </S.NotificationsWrapper>
    </S.MainView>
  );
}
