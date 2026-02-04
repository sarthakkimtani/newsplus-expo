import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Linking, Platform, ScrollView, Text, View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

import { TickerAbout } from "@/components/features/ticker/ticker-about";
import { TickerHeader } from "@/components/features/ticker/ticker-header";
import { TickerStats } from "@/components/features/ticker/ticker-stats";
import { ElevatedButton } from "@/components/ui/elevated-button";
import { useApi } from "@/hooks/api/use-api";
import { useTickerPersistedToggle } from "@/hooks/persistence/use-ticker-persisted-toggle";

export const Ticker = () => {
  const { fetchStockProfile } = useApi();
  const { ticker } = useLocalSearchParams<{ ticker: string }>();

  const ThemedLoader = withUnistyles(ActivityIndicator, (theme) => ({
    color: theme.colors.primary,
  }));

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

  const tickerSaver = useTickerPersistedToggle(ticker, profile?.name);

  if (isLoading || tickerSaver.isLoading) {
    return (
      <View style={styles.center}>
        <ThemedLoader size="large" />
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
      <TickerHeader
        ticker={profile?.ticker!}
        name={profile?.name}
        saved={tickerSaver.isSaved}
        isLoading={tickerSaver.isToggling}
        onWatchlistToggle={tickerSaver.toggle}
      />

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
