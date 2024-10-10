import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNAndroidNotificationListener from "react-native-android-notification-listener";

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
    if (nextAppState === "active" || (force && RNAndroidNotificationListener)) {
      const status = await RNAndroidNotificationListener.getPermissionStatus();
      setHasPermission(status !== "denied");
    }
  };

  useEffect(() => {
    const listener = AppState.addEventListener("change", handleAppStateChange);

    handleAppStateChange("", true);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Text
          style={[
            styles.permissionStatus,
            { color: hasPermission ? "green" : "red" },
          ]}
        >
          {hasPermission
            ? "Allowed to handle notifications"
            : "NOT allowed to handle notifications"}
        </Text>
        <Button
          title="Open Configuration"
          onPress={handleOnPressPermissionButton}
          disabled={hasPermission}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  permissionStatus: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
});
