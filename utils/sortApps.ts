import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

export const sortApps = (apps: AppDetail[], checked: string[]) => {
  return apps.sort((a, b) => {
    if (!checked.includes(a.packageName) && checked.includes(b.packageName)) return 1;
    else if (checked.includes(a.packageName) && !checked.includes(b.packageName)) return -1;
    else return a.label < b.label ? -1 : 1;
  });
};
