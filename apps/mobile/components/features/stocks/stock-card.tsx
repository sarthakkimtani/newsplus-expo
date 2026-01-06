import { Ionicons } from "@expo/vector-icons";
import { EodData } from "@newsplus/schemas";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { CompanyLogo } from "@/components/features/stocks/company-logo";

type StockItem = EodData[number];

export const StockCard = ({ stock }: { stock: StockItem }) => {
  const [showOhlc, setShowOhlc] = useState(false);
  const theme = UnistylesRuntime.getTheme();
  const router = useRouter();

  const priceChange = stock.close - stock.open;
  const priceChangePercent = ((priceChange / stock.open) * 100).toFixed(2);
  const isPositive = priceChange > 0;
  const isNegative = priceChange < 0;

  const handlePress = () => {
    router.push(`/stocks/${stock.symbol}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.stockInfo}>
          <View style={styles.row}>
            <CompanyLogo ticker={stock.symbol} />
            <View style={styles.content}>
              <Text style={styles.symbol}>{stock.symbol}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {stock.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${stock.close.toFixed(2)}</Text>
          <View
            style={[
              styles.changeBadge,
              isPositive && styles.changeBadgePositive,
              isNegative && styles.changeBadgeNegative,
              !isPositive && !isNegative && styles.changeBadgeNeutral,
            ]}
          >
            <Text
              style={[
                styles.changeText,
                isPositive && styles.changeTextPositive,
                isNegative && styles.changeTextNegative,
                !isPositive && !isNegative && styles.changeTextNeutral,
              ]}
            >
              {isPositive ? "+" : ""}
              {priceChangePercent}%
            </Text>
          </View>
        </View>
        <Pressable onPress={() => setShowOhlc(!showOhlc)} style={styles.chevronButton} hitSlop={8}>
          <Ionicons
            name={showOhlc ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.textSecondary}
          />
        </Pressable>
      </View>

      {showOhlc && (
        <View style={styles.ohlcContainer}>
          <View style={styles.ohlcItem}>
            <Text style={styles.ohlcLabel}>Open</Text>
            <Text style={styles.ohlcValue}>${stock.open.toFixed(2)}</Text>
          </View>
          <View style={styles.ohlcItem}>
            <Text style={styles.ohlcLabel}>High</Text>
            <Text style={styles.ohlcValue}>${stock.high.toFixed(2)}</Text>
          </View>
          <View style={styles.ohlcItem}>
            <Text style={styles.ohlcLabel}>Low</Text>
            <Text style={styles.ohlcValue}>${stock.low.toFixed(2)}</Text>
          </View>
          <View style={styles.ohlcItem}>
            <Text style={styles.ohlcLabel}>Close</Text>
            <Text style={styles.ohlcValue}>${stock.close.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stockInfo: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  content: {
    flexDirection: "column",
  },
  symbol: {
    fontSize: 18,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  chevronButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing.sm,
  },
  price: {
    fontSize: 18,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  changeBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  changeBadgePositive: {
    backgroundColor: theme.colors.positiveSurface,
  },
  changeBadgeNegative: {
    backgroundColor: theme.colors.negativeSurface,
  },
  changeBadgeNeutral: {
    backgroundColor: theme.colors.neutralSurface,
  },
  changeText: {
    fontSize: 13,
    fontFamily: theme.fonts.primary.medium,
  },
  changeTextPositive: {
    color: theme.colors.positive,
  },
  changeTextNegative: {
    color: theme.colors.negative,
  },
  changeTextNeutral: {
    color: theme.colors.neutral,
  },
  ohlcContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  ohlcItem: {
    alignItems: "center",
    flex: 1,
  },
  ohlcLabel: {
    fontSize: 11,
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.textSecondary,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ohlcValue: {
    fontSize: 14,
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.text,
  },
}));
