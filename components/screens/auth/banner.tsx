import { Image } from "expo-image";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export const Banner = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo.png")}
        contentFit="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 250,
    flexShrink: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    width: 140,
    height: 140,
  },
}));
