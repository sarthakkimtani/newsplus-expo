import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const ErrorBanner = ({
  onRefresh,
}: {
  onRefresh: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.center, { paddingBottom: headerHeight }]}>
      <StatusBar style="dark" />
      <Image source={require("@/assets/images/error.png")} style={styles.image} />
      <Text style={styles.title}>Something went wrong!</Text>
      <Text style={styles.subtitle}>Could not fetch the requested resource.</Text>
      <TouchableOpacity onPress={onRefresh}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Retry Now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create((theme) => ({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
}));
