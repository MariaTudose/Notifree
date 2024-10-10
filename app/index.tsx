import { Link } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Link href="/notifications" style={styles.link}>
        Show notifications
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#262626",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    backgroundColor: "#ffc0cb",
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "500",
    borderRadius: 6,
    textTransform: 'uppercase'
  },
});
