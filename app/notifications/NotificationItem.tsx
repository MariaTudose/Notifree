import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import Interactable, { ISnapEvent } from 'react-native-interactable';
import { InstalledApps, RNLauncherKitHelper } from 'react-native-launcher-kit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Notification } from '@/types/Notification';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

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
  notif: Notification;
  removeNotifs: (userNotifs: Notification) => void;
}

export const NotificationItem = ({ app, notif, removeNotifs }: NotificationItemProps) => {
  const { title, icon, image, iconLarge, time } = notif;
  const installedApp = apps.find(ap => ap.packageName === app);
  const timeDiff = dayjs(Number(time)).fromNow(true);

  /*const groupByUser = (notifs: Notification[]) => {
    const grouped = notifs.reduce((res: Record<string, Notification[]>, n) => {
      (res[n.title] = res[n.title] || []).push(n);
      return res;
    }, {});
    return grouped;
  };*/

  const rightAction = (prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value - 50 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <Text style={{ width: Dimensions.get('window').width - 30 }}></Text>
      </Reanimated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      friction={1}
      leftThreshold={Dimensions.get('window').width / 3}
      renderLeftActions={rightAction}
      onSwipeableWillOpen={() => removeNotifs(notif)}
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
              {notif.groupedMessages.length > 0 ? (
                <React.Fragment key={notif.key}>
                  {notif.groupedMessages.reverse().map((msg, i) => (
                    <S.InfoText key={i}>
                      {msg.title} - {msg.text}
                    </S.InfoText>
                  ))}
                </React.Fragment>
              ) : (
                <S.InfoText key={notif.key}>{notif.text}</S.InfoText>
              )}
            </S.InfoWrapper>
          </S.Notification>
        </S.NotificationWrapper>
      </Pressable>
    </ReanimatedSwipeable>
  );
};
