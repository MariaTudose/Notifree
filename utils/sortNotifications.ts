import { Notification } from '@/types/Notification';

export const sortNotifications = (notifs: Notification[]) => {
  const sorted = notifs.sort((a: Notification, b: Notification) => (a.time < b.time ? 1 : -1));
  const grouped = sorted.reduce((res: Record<string, Notification[]>, n) => {
    (res[n.app] = res[n.app] || []).push(n);
    return res;
  }, {});

  return Object.values(grouped).flat();
};
