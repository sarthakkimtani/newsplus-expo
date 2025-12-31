import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { UnistylesRuntime } from "react-native-unistyles";

import { TabsHeader } from "@/components/header/tabs-header";
import { WebviewHeader } from "@/components/header/webview-header";
import { initDatabase } from "@/lib/db";

export const AppLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const theme = UnistylesRuntime.getTheme();

  useEffect(() => {
    initDatabase();
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
            headerTitleStyle: {
              color: theme.colors.text,
              fontFamily: theme.fonts.primary.bold,
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            headerRight: () => <TabsHeader />,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="webview"
          options={({ route }) => ({
            headerTitle: "",
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => <WebviewHeader params={route.params} />,
          })}
        />
        <Stack.Screen
          name="saved"
          options={{
            headerTitle: "Saved Articles",
            headerBackButtonDisplayMode: "minimal",
            headerShadowVisible: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};
