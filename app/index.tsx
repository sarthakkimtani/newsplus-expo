import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Banner } from "@/components/auth/banner";

export default function AuthScreen() {
  return (
    <View style={styles.screen}>
      <Banner />
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

export const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
  },
}));
