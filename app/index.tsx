import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Link href="/notifications" style={styles.link}>
        Show notifications
      </Link>
      <Link href="/settings" style={styles.link}>
        Settings
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#181818",
    flex: 1,
    justifyContent: "center",
    gap: 12,
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
