import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { TickerAbout } from "@/components/features/stocks/ticker-about";
import { TickerHeader } from "@/components/features/stocks/ticker-header";
import { TickerStats } from "@/components/features/stocks/ticker-stats";
import { ElevatedButton } from "@/components/ui/elevated-button";
import { fetchStockProfile } from "@/lib/api-client";

export const Ticker = () => {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const theme = UnistylesRuntime.getTheme();
  const router = useRouter();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticker", ticker],
    queryFn: () => fetchStockProfile(ticker),
    enabled: !!ticker,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load stock profile</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {Platform.OS === "android" && (
        <View style={styles.backContainer}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
        </View>
      )}
      <TickerHeader ticker={profile?.ticker!} name={profile?.name} />

      <TickerStats
        industry={profile?.industry}
        sector={profile?.sector}
        employees={profile?.employees}
      />

      <TickerAbout about={profile?.about} />

      <ElevatedButton
        icon="globe-outline"
        title="Open Website"
        onPress={() => Linking.openURL(profile?.website!)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: "transparent",
      android: theme.colors.surface,
    }),
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20,
  },
  backContainer: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    minHeight: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.regular,
  },
}));
