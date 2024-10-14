import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import Interactable, { ISnapEvent } from 'react-native-interactable';
import { InstalledApps, RNLauncherKitHelper } from 'react-native-launcher-kit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Notification } from '@/types/Notification';

import * as S from './styles';

dayjs.extend(relativeTime);
const apps = InstalledApps.getApps();
const windowWidth = Dimensions.get('window').width;

const getIcon = (primary: string, secondary: AppDetail | undefined) => {
  if (primary) {
    return <S.Icon source={{ uri: primary }} />;
  } else if (secondary && secondary.icon) {
    return <S.Icon source={{ uri: `data:image/png;base64,${secondary.icon}` }} />;
  }
};

interface NotificationItemProps {
  app: string;
  notifs: Notification[];
  removeNotifs: (userNotifs: Notification[]) => void;
}

export const NotificationItem = ({ app, notifs, removeNotifs }: NotificationItemProps) => {
  const groupByUser = (notifs: Notification[]) => {
    const grouped = notifs.reduce((res: Record<string, Notification[]>, n) => {
      (res[n.title] = res[n.title] || []).push(n);
      return res;
    }, {});
    return grouped;
  };

  const onSnap = (e: ISnapEvent, userNotifs: Notification[]) => {
    if (e.nativeEvent.index === 1) removeNotifs(userNotifs);
  };

  return (
    <>
      {Object.values(groupByUser(notifs)).map(userNotifs => {
        const { title, icon, image, iconLarge, time } = userNotifs[userNotifs.length - 1];
        const installedApp = apps.find(ap => ap.packageName === app);
        const mostRecentTime = Math.max(...userNotifs.map(n => Number(n.time)));
        const timeDiff = dayjs(mostRecentTime).fromNow(true);
        return (
          <Interactable.View
            horizontalOnly={true}
            snapPoints={[{ x: 0 }, { x: windowWidth }]}
            onSnap={e => onSnap(e, userNotifs)}
          >
            <Pressable onPress={() => () => RNLauncherKitHelper.launchApplication(app)}>
              <S.NotificationWrapper>
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
                  <S.InfoText key={notif.key}>{notif.text}</S.InfoText>
                ))}
              </S.InfoWrapper>
            </S.Notification>
          </S.NotificationWrapper>
            </Pressable>
          </Interactable.View>
        );
      })}
    </>
  );
};
