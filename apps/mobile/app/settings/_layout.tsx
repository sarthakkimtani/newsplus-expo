import { Stack, useNavigation } from "expo-router";
import { Platform, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { UniIcons } from "@/components/utils/uni-icons";

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
  const navigation = useNavigation();
  return (
    <Pressable style={styles.closeButton} onPress={() => navigation.getParent()?.goBack()}>
      <UniIcons name="close" size={24} color="text" />
    </Pressable>
  );
};

const styles = StyleSheet.create(() => ({
  closeButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
}));
