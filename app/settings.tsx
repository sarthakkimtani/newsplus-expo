import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SettingsScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));
