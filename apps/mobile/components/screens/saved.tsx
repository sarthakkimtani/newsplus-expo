import { FlashList } from "@shopify/flash-list";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ArticleCard } from "@/components/features/articles/article-card";
import { StateBanner } from "@/components/ui/state-banner";
import { fetchSavedArticles } from "@/lib/db/articles";

export const Saved = () => {
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["savedArticles"],
    queryFn: fetchSavedArticles,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["savedArticles"],
      });
    }, [queryClient])
  );

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <StateBanner state="error" />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={(item, index) => item.url || index.toString()}
        contentContainerStyle={data!.length > 0 ? styles.listContent : styles.empty}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        ListEmptyComponent={<StateBanner state="empty" />}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
  },
  empty: {
    flexGrow: 1,
  },
  listContent: {
    paddingBottom: 120,
  },
}));
