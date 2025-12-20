import { Image } from "expo-image";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const Banner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.graphicsRow}>
        <Image style={styles.graphic} source={require("../assets/images/graphic.png")} />
        <Image
          style={[styles.graphic, styles.graphicRotated]}
          source={require("../assets/images/graphic.png")}
        />
      </View>
      <Image style={styles.logo} source={require("../assets/images/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 400,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 80,
  },
  graphicsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  graphic: {
    width: 140,
    height: 140,
  },
  graphicRotated: {
    transform: [{ rotate: "90deg" }],
  },
  logo: {
    width: 150,
    height: 150,
  },
}));
