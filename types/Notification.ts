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
