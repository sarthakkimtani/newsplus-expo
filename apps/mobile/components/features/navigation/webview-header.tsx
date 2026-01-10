import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { useArticlePersistedToggle } from "@/hooks/persistence/use-article-persisted-toggle";
import { useArticlesStore } from "@/lib/stores/use-article-store";

interface HeaderProps {
  params?: {
    url?: string;
  };
}

export const WebviewHeader = ({ params }: HeaderProps) => {
  const getArticleByUrl = useArticlesStore((s) => s.getArticleByUrl);
  const theme = UnistylesRuntime.getTheme();

  const article = getArticleByUrl(params?.url!);
  const articleSaver = useArticlePersistedToggle(article);

  return (
    <View style={styles.headerRight}>
      <Pressable onPress={articleSaver.toggle}>
        <Ionicons
          name={articleSaver.isSaved ? "bookmark" : "bookmark-outline"}
          size={24}
          color={theme.colors.text}
        />
      </Pressable>
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
