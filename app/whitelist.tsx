import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components';
import { InstalledApps } from 'react-native-launcher-kit';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import { sortApps } from '@/utils/sortApps';

const StyledView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 16px;
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  margin-left: 24px;
  flex: 1;
`;

const Icon = styled(Image)`
  width: 45px;
  height: 45px;
`;

const Whitelist = () => {
  const [apps, setApps] = useState<AppDetail[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('apps')
      .then(res => {
        if (res) return JSON.parse(res);
        else return [];
      })
      .then(storedChecked => {
        setApps(sortApps(InstalledApps.getApps(), storedChecked));
        setChecked(storedChecked);
      });
  }, []);

  const updateWhitelist = (packageName: string) => {
    setChecked(prevChecked => {
      let newChecked;
      if (checked.includes(packageName)) {
        newChecked = prevChecked.filter(ch => ch !== packageName);
      } else {
        newChecked = [...prevChecked, packageName];
      }
      AsyncStorage.setItem('apps', JSON.stringify(newChecked));
      return newChecked;
    });
  };

  return (
    <View>
      <FlatList
        data={apps}
        renderItem={({ item }) => (
          <StyledView key={item.packageName} onPress={() => updateWhitelist(item.packageName)}>
            <Icon source={{ uri: `data:image/png;base64,${item.icon}` }}></Icon>
            <StyledText>{item.label}</StyledText>
            <CheckBox
              value={checked.includes(item.packageName)}
              onValueChange={() => updateWhitelist(item.packageName)}
              tintColors={{ true: '#ffc0cb', false: '#fff' }}
            />
          </StyledView>
        )}
      />
    </View>
  );
};

export default Whitelist;
