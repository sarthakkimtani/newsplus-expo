import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

import { AppLayout } from "@/components/layouts/app-layout";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <AppLayout />
      </ClerkProvider>
    </QueryClientProvider>
  );
}
