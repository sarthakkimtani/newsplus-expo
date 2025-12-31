import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { StateBanner } from "@/components/common/state-banner";
import { ArticleCard } from "@/components/screens/tabs/article/article-card";
import { fetchSavedArticles } from "@/lib/db/articles";
import { Article } from "@/utils/types/article";

export const Saved = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useFocusEffect(
    useCallback(() => {
      setArticles(fetchSavedArticles());
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={articles}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={(item, index) => item.url || index.toString()}
        contentContainerStyle={articles.length > 0 ? styles.listContent : styles.empty}
        showsVerticalScrollIndicator={false}
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
