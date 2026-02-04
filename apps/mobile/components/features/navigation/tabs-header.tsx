import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { UniIcons } from "@/components/utils/uni-icons";

export const TabsHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.headerRight}>
      <Pressable onPress={() => router.push("/saved")}>
        <UniIcons name="bookmark-outline" size={24} color="text" />
      </Pressable>
      <Pressable onPress={() => router.push("/settings")}>
        <UniIcons name="person-circle-outline" size={26} color="text" />
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
