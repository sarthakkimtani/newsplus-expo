import { Image } from "expo-image";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const Banner = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 40,
  },
  logo: {
    width: 140,
    height: 140,
  },
}));
