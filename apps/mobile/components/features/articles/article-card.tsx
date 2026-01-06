import type { Article } from "@newsplus/schemas";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { relativeDate } from "@/utils/date";

export const ArticleCard = ({ article }: { article: Article }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/webview",
      params: { url: article.url },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.source}>{article.source}</Text>
          <Text style={styles.title} numberOfLines={3}>
            {article.title}
          </Text>
          <Text style={styles.date}>{relativeDate(article.publishedAt)}</Text>
        </View>
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },
  contentContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  source: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.medium,
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
    lineHeight: 22,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textPlaceholder,
    fontFamily: theme.fonts.primary.regular,
    marginTop: theme.spacing.xs,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
}));
