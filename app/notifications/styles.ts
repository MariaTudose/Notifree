import { SafeAreaView, View, Text, Image } from 'react-native';
import styled from 'styled-components';

export const NotificationWrapper = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.card};
  padding: 20px;
  margin: 4px 16px;
  border-radius: 18px;
`;

export const NotificationHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  max-width: 100%;
`;

export const AppLabel = styled(Text)`
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
`;

export const InfoTitle = styled(Text)`
  color: ${({ theme }) => theme.text};
  flex-shrink: 1;
`;

export const Notification = styled(View)`
  margin-top: 8px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

export const ImageWrapper = styled(View)`
  flex-direction: column;
`;

export const IconWrapper = styled(View)`
  width: 15px;
  height: 15px;
`;

export const Icon = styled(Image)`
  width: 15px;
  height: 15px;
`;

export const BigIcon = styled(Image)`
  width: 35px;
  height: 35px;
  margin-right: 8px;
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
