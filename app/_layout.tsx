import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

function AppLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const theme = UnistylesRuntime.getTheme();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn!}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "News+",
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitleStyle: styles.headerTitle,
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="bookmark-outline" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/settings")}>
                  <Ionicons name="person-circle-outline" size={26} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <AppLayout />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  headerTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
    fontWeight: "bold",
    fontSize: 20,
  },
  headerRight: {
    flexDirection: "row",
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
  },
}));
