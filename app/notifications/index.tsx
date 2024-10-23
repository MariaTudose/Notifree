import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { sortNotifications } from '@/utils/sortNotifications';
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
      setNotifications(sortNotifications(JSON.parse(storedNotifications)));
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

  const removeNotifs = async (userNotif: Notification) => {
    setNotifications(prevNotifications => {
      const newNotifs = prevNotifications.filter(notif => notif.key !== userNotif.key);
      AsyncStorage.setItem('notifications', JSON.stringify(newNotifs));
      return newNotifs;
    });
  };

  return (
    <S.MainView>
      <S.NotificationsWrapper>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem app={item.app} notif={item} removeNotifs={removeNotifs} />}
        />
      </S.NotificationsWrapper>
    </S.MainView>
  );
}
