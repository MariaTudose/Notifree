import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { NotificationItem, Notification } from './Notification';

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
        <FlatList
          data={Object.entries(processNotifications(notifications))}
          renderItem={({ item }) => {
            const [app, notification] = item;
            return <NotificationItem app={app} notifs={notification}></Notification>;
          }}
        />
      </S.NotificationsWrapper>
    </S.MainView>
  );
}
