import { FlashList } from "@shopify/flash-list";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { StockCard } from "@/components/features/stocks/stock-card";
import { StockShimmer } from "@/components/features/stocks/stocks-shimmer";
import { StateBanner } from "@/components/ui/state-banner";
import { fetchWatchlist } from "@/lib/api-client";

export const Watchlist = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
    staleTime: 30 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    }, [queryClient])
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Watchlist</Text>
        <StockShimmer />
      </View>
    );
  }

  if (error) return <StateBanner state="error" onRefresh={() => refetch()} />;
  if (!data || data.length === 0) return <StateBanner state="empty" />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        ListHeaderComponent={<Text style={styles.title}>Watchlist</Text>}
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
    color: theme.colors.text,
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
