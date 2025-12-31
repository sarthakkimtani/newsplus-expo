import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ArticleCard } from "@/components/article/article-card";
import { fetchSavedArticles } from "@/lib/db/articles";
import { Article } from "@/utils/types/article";

export default function SavedScreen() {
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

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
