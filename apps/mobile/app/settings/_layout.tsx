import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

export default function SettingsLayout() {
  const screens = [
    { name: "index", title: "Settings" },
    { name: "account", title: "Account" },
    { name: "password", title: "Password" },
    { name: "delete", title: "Delete Account" },
  ];

  return (
    <Stack>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => Platform.OS === "ios" && <CloseButton />,
          }}
        />
      ))}
    </Stack>
  );
}

const CloseButton = () => {
  const theme = UnistylesRuntime.getTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.getParent()?.goBack()}>
      <Ionicons name="close" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(() => ({
  closeButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
}));
