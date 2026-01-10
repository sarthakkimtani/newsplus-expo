import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ArticleCard } from "@/components/features/articles/article-card";
import { ArticleShimmer } from "@/components/features/articles/article-shimmer";
import { PrimaryArticleCard } from "@/components/features/articles/primary-article-card";
import { StateBanner } from "@/components/ui/state-banner";
import { useApi } from "@/hooks/api/use-api";
import { useArticlesStore } from "@/lib/stores/use-article-store";

export const Home = () => {
  const { fetchArticles } = useApi();
  const setArticles = useArticlesStore((s) => s.setArticles);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 15 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setArticles(data);
    }
  }, [data, setArticles]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ArticleShimmer />
      </View>
    );
  }

  if (error) return <StateBanner state="error" onRefresh={() => refetch()} />;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlashList
        data={data}
        renderItem={({ item, index }) =>
          index === 0 ? <PrimaryArticleCard article={item} /> : <ArticleCard article={item} />
        }
        keyExtractor={(item, index) => item.url || index.toString()}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
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
  listContent: {
    paddingBottom: 120,
  },
}));
