import React from 'react';
import { Pressable } from 'react-native';
import { InstalledApps, RNLauncherKitHelper } from 'react-native-launcher-kit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import * as S from './styles';

dayjs.extend(relativeTime);
const apps = InstalledApps.getApps();

type SubNotification = {
  title: string;
  text: string;
};

export type Notification = {
  key: string;
  time: string;
  app: string;
  title: string;
  titleBig: string;
  text: string;
  subText: string;
  summaryText: string;
  bigText: string;
  audioContentsURI: string;
  imageBackgroundURI: string;
  extraInfoText: string;
  icon: string;
  image: string;
  iconLarge: string;
  groupedMessages: SubNotification[];
};

const getIcon = (primary: string, secondary: AppDetail | undefined) => {
  if (primary) {
    return <S.Icon source={{ uri: primary }} />;
  } else if (secondary && secondary.icon) {
    return <S.Icon source={{ uri: `data:image/png;base64,${secondary.icon}` }} />;
  }
};

export const NotificationItem = ({ app, notifs }: { app: string; notifs: Notification[] }) => {
  const groupByUser = (notifs: Notification[]) => {
    const grouped = notifs.reduce((res: Record<string, Notification[]>, n) => {
      (res[n.title] = res[n.title] || []).push(n);
      return res;
    }, {});
    return grouped;
  };

  return (
    <Pressable onPress={() => RNLauncherKitHelper.launchApplication(app)}>
      {Object.values(groupByUser(notifs)).map(userNotifs => {
        const { title, icon, image, iconLarge, time } = userNotifs[userNotifs.length - 1];
        const installedApp = apps.find(ap => ap.packageName === app);
        const mostRecentTime = Math.max(...userNotifs.map(n => Number(n.time)));
        const timeDiff = dayjs(mostRecentTime).fromNow(true);
        return (
          <S.NotificationWrapper key={time}>
            <S.NotificationHeader>
              {getIcon(icon, installedApp)}
              <S.AppLabel>{installedApp?.label} -</S.AppLabel>
              <S.InfoTitle ellipsizeMode="tail" numberOfLines={1}>
                {title}
              </S.InfoTitle>
              <S.InfoText>- {timeDiff}</S.InfoText>
            </S.NotificationHeader>
            <S.Notification>
              <S.ImageWrapper>
                {!!image && <S.BigIcon source={{ uri: image }} />}
                {!!iconLarge && <S.BigIcon source={{ uri: iconLarge }} />}
              </S.ImageWrapper>
              <S.InfoWrapper>
                {userNotifs.map(notif => (
                  <S.InfoText key={notif.time}>{notif.text}</S.InfoText>
                ))}
              </S.InfoWrapper>
            </S.Notification>
          </S.NotificationWrapper>
        );
      })}
    </Pressable>
  );
};
