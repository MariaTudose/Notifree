import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components";

export const NotificationWrapper = styled(SafeAreaView)`
  flex-direction: column;
  width: width;
  background-color: ${({ theme }) => theme.card};
  padding: 20px;
  margin: 16px;
  border-radius: 18px;
  flex: 1;
`;

export const Notification = styled(View)`
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const ImageWrapper = styled(View)`
  flex-direction: "column";
`;

export const IconWrapper = styled(View)`
  background-color: #aaa;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  margin-right: 15px;
  justify-content: center;
`;

export const Icon = styled(Image)`
  width: 30px;
  height: 30px;
`;

export const InfoWrapper = styled(View)`
  flex: 1;
`;

export const InfoText = styled(Text)`
  color: ${({ theme }) => theme.text};
`;

export const MainView = styled(View)`
  flex: 1;
  background: ${({ theme }) => theme.background};
`;

export const NotificationsWrapper = styled(View)`
  flex: 1;
`;

export const ScrollableView = styled(ScrollView)`
  flex: 1;
`;
