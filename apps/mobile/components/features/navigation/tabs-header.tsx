import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const TabsHeader = () => {
  const router = useRouter();
  const theme = UnistylesRuntime.getTheme();

  return (
    <View style={styles.headerRight}>
      <Pressable onPress={() => router.push("/saved")}>
        <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
      </Pressable>
      <Pressable onPress={() => router.push("/settings")}>
        <Ionicons name="person-circle-outline" size={26} color={theme.colors.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  headerRight: {
    flexDirection: "row",
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
  },
}));
