import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { CompanyLogo } from "@/components/features/stocks/company-logo";

interface TickerHeaderProps {
  ticker: string;
  name?: string;
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
}

export const TickerHeader = ({
  ticker,
  name,
  isInWatchlist = false,
  onWatchlistToggle,
}: TickerHeaderProps) => {
  const theme = UnistylesRuntime.getTheme();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <CompanyLogo ticker={ticker} size="large" />
      </View>
      <Text style={styles.symbol}>{ticker}</Text>
      <Text style={styles.name}>{name}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.watchlistButton,
          isInWatchlist && styles.watchlistButtonActive,
          pressed && styles.watchlistButtonPressed,
        ]}
        onPress={onWatchlistToggle}
      >
        <Ionicons
          name={isInWatchlist ? "checkmark-circle" : "add-circle-outline"}
          size={20}
          color={isInWatchlist ? "#FFF" : theme.colors.primary}
        />
        <Text
          style={[styles.watchlistButtonText, isInWatchlist && styles.watchlistButtonTextActive]}
        >
          {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  header: {
    alignItems: "center",
    paddingVertical: 8,
  },
  logoContainer: {
    padding: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  symbol: {
    fontSize: 28,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.regular,
    marginTop: 4,
    textAlign: "center",
  },
  watchlistButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  watchlistButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  watchlistButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  watchlistButtonText: {
    fontSize: 15,
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.primary,
  },
  watchlistButtonTextActive: {
    color: "#FFF",
  },
}));
