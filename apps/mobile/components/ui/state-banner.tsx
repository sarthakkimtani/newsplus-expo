import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const StateBanner = ({
  state,
  onRefresh,
}: {
  state: "empty" | "error";
  onRefresh?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  const headerHeight = useHeaderHeight();
  const isError = state === "error";

  return (
    <View style={[styles.center, { paddingBottom: headerHeight }]}>
      <StatusBar style="dark" />
      <Image
        source={
          isError ? require("@/assets/images/error.png") : require("@/assets/images/empty.png")
        }
        style={styles.image}
      />
      <Text style={styles.title}>{isError ? "Something went wrong!" : "Uh oh..."}</Text>
      <Text style={styles.subtitle}>
        {isError ? "Could not fetch the requested resource." : "Nothing here yet."}
      </Text>
      {isError && (
        <TouchableOpacity onPress={onRefresh}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Retry Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create((theme) => ({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
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
