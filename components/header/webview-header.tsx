import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { deleteArticle, isArticleSaved, saveArticle } from "@/lib/db/articles";
import { useArticlesStore } from "@/lib/stores/use-article-store";

interface HeaderProps {
  params?: {
    url?: string;
  };
}

export const WebviewHeader = ({ params }: HeaderProps) => {
  const getArticleByUrl = useArticlesStore((s) => s.getArticleByUrl);
  const [saved, setSaved] = useState(false);
  const theme = UnistylesRuntime.getTheme();
  const url = params?.url;

  useEffect(() => {
    if (!url) return;
    setSaved(isArticleSaved(url));
  }, [url]);

  const toggleSave = () => {
    if (!url) return;

    if (saved) {
      deleteArticle(url);
      setSaved(false);
    } else {
      const article = getArticleByUrl(url);
      saveArticle(article!);
      setSaved(true);
    }
  };

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={toggleSave}>
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  headerRight: {
    flexDirection: "row",
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
  },
}));
