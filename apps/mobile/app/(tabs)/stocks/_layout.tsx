import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function StocksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[ticker]"
        options={{
          presentation: Platform.select({
            ios: "formSheet",
            android: "modal",
          }),
          sheetAllowedDetents: [0.75, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
