import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

export default function RootLayout() {
  const theme = UnistylesRuntime.getTheme();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "News+",
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitleStyle: {
              color: theme.colors.text,
              fontFamily: theme.fonts.primary.bold,
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  gap: theme.spacing.lg,
                  paddingHorizontal: theme.spacing.sm,
                }}
              >
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="person-circle-outline" size={26} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
