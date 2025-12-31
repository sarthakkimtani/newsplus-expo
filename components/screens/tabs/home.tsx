import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ArticleCard } from "@/components/screens/tabs/article/article-card";
import { ArticleShimmer } from "@/components/screens/tabs/article/article-shimmer";
import { ErrorBanner } from "@/components/screens/tabs/article/error-banner";
import { PrimaryArticleCard } from "@/components/screens/tabs/article/primary-article-card";
import { useArticlesStore } from "@/lib/stores/use-article-store";
import { ArticleResponse, mapArticle } from "@/utils/types/article";

const fetchArticles = async (): Promise<ArticleResponse> => {
  const response = await fetch("/api/news");
  if (!response.ok) {
    throw new Error("Network response error");
  }
  return response.json();
};

export const Home = () => {
  const setArticles = useArticlesStore((s) => s.setArticles);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 15 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setArticles(data.articles.map(mapArticle));
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

  if (error) return <ErrorBanner onRefresh={() => refetch()} />;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlashList
        data={data?.articles}
        renderItem={({ item, index }) => {
          const article = mapArticle(item);
          return index === 0 ? (
            <PrimaryArticleCard article={article} />
          ) : (
            <ArticleCard article={article} />
          );
        }}
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
