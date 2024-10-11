import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "./styles";

let interval: any = null;

interface INotificationProps {
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
}

const Notification: React.FC<INotificationProps> = ({
  time,
  app,
  title,
  titleBig,
  text,
  subText,
  summaryText,
  bigText,
  audioContentsURI,
  imageBackgroundURI,
  extraInfoText,
  icon,
  image,
  iconLarge,
}) => {
  return (
    <S.NotificationWrapper>
      <S.Notification>
        <S.ImageWrapper>
          {!!icon && (
            <S.IconWrapper>
              <S.Icon source={{ uri: icon }} />
            </S.IconWrapper>
          )}
          {!!image && (
            <S.IconWrapper>
              <S.Icon source={{ uri: image }} />
            </S.IconWrapper>
          )}
          {!!iconLarge && (
            <S.IconWrapper>
              <S.Icon source={{ uri: iconLarge }} />
            </S.IconWrapper>
          )}
        </S.ImageWrapper>
        <S.InfoWrapper>
          <S.InfoText>{`app: ${app}`}</S.InfoText>
          <S.InfoText>{`title: ${title}`}</S.InfoText>
          <S.InfoText>{`text: ${text}`}</S.InfoText>

          {!!time && <S.InfoText>{`time: ${time}`}</S.InfoText>}
          {!!titleBig && <S.InfoText>{`titleBig: ${titleBig}`}</S.InfoText>}
          {!!subText && <S.InfoText>{`subText: ${subText}`}</S.InfoText>}
          {!!summaryText && (
            <S.InfoText>{`summaryText: ${summaryText}`}</S.InfoText>
          )}
          {!!bigText && <S.InfoText>{`bigText: ${bigText}`}</S.InfoText>}
          {!!audioContentsURI && (
            <S.InfoText>{`audioContentsURI: ${audioContentsURI}`}</S.InfoText>
          )}
          {!!imageBackgroundURI && (
            <S.InfoText>{`imageBackgroundURI: ${imageBackgroundURI}`}</S.InfoText>
          )}
          {!!extraInfoText && (
            <S.InfoText>{`extraInfoText: ${extraInfoText}`}</S.InfoText>
          )}
        </S.InfoWrapper>
      </S.Notification>
    </S.NotificationWrapper>
  );
};

export default function NotificationView() {
  const [lastNotification, setLastNotification] = useState<any>(null);

  const handleCheckNotificationInterval = async () => {
    const lastStoredNotification = await AsyncStorage.getItem(
      "@lastNotification"
    );

    if (lastStoredNotification) {
      setLastNotification(JSON.parse(lastStoredNotification));
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

  const hasGroupedMessages =
    lastNotification &&
    lastNotification.groupedMessages &&
    lastNotification.groupedMessages.length > 0;

  return (
    <S.MainView>
      <S.NotificationsWrapper>
        {lastNotification && !hasGroupedMessages && (
          <S.ScrollableView>
            <Notification {...lastNotification} />
          </S.ScrollableView>
        )}
        {lastNotification && hasGroupedMessages && (
          <FlatList
            data={lastNotification.groupedMessages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Notification app={lastNotification.app} {...item} />
            )}
          />
        )}
      </S.NotificationsWrapper>
    </S.MainView>
  );
}
