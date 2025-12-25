import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Text>Home</Text>
    </View>
  );
}
