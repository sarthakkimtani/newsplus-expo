import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const TabsHeader = () => {
  const router = useRouter();
  const theme = UnistylesRuntime.getTheme();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/settings")}>
        <Ionicons name="person-circle-outline" size={26} color={theme.colors.text} />
      </TouchableOpacity>
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
