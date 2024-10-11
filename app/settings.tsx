import { useEffect, useState } from 'react';
import { View, Text, Button, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import styled from 'styled-components';

const MainContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const PermissionText = styled(Text)<{ hasPermission: boolean }>`
  color: ${props => (props.hasPermission ? 'green' : 'red')};
  margin-bottom: 20px;
  font-size: 18px;
`;

const ButtonWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 0px 50px;
`;

export default function Settings() {
  const [hasPermission, setHasPermission] = useState(false);

  const handleOnPressPermissionButton = async () => {
    /**
     * Open the notification settings so the user
     * so the user can enable it
     */
    RNAndroidNotificationListener.requestPermission();
  };

  const handleAppStateChange = async (nextAppState: string, force = false) => {
    if (nextAppState === 'active' || (force && RNAndroidNotificationListener)) {
      const status = await RNAndroidNotificationListener.getPermissionStatus();
      setHasPermission(status !== 'denied');
    }
  };

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    handleAppStateChange('', true);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <MainContainer>
      <ButtonWrapper>
        <PermissionText hasPermission={hasPermission}>
          {hasPermission ? 'Allowed to handle notifications' : 'NOT allowed to handle notifications'}
        </PermissionText>
        <Button title="Open Configuration" onPress={handleOnPressPermissionButton} disabled={hasPermission} />
      </ButtonWrapper>
    </MainContainer>
  );
}
