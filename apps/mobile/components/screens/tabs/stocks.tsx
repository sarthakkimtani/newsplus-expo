import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { StateBanner } from "@/components/common/state-banner";
import { StockCard } from "@/components/screens/tabs/stocks/stock-card";
import { StockShimmer } from "@/components/screens/tabs/stocks/stocks-shimmer";
import { fetchStocks } from "@/lib/api-client";

export const Stocks = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    staleTime: 30 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <StockShimmer />
      </View>
    );
  }

  if (error) return <StateBanner state="error" onRefresh={() => refetch()} />;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlashList
        data={data}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        ListHeaderComponent={<Text style={styles.title}>Top Tech Stocks</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.primary.bold,
    fontSize: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  listContent: {
    paddingTop: theme.spacing.sm,
    paddingBottom: 120,
  },
  separator: {
    height: theme.spacing.md,
  },
}));
