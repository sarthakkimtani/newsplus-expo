import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { relativeDate } from "@/utils/date";
import { Article } from "@/utils/types/news";

export const PrimaryNewsCard = ({ article }: { article: Article }) => {
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
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{relativeDate(article.publishedAt)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  contentContainer: {
    gap: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  source: {
    fontSize: 12,
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary.bold,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 12,
    color: theme.colors.textPlaceholder,
    fontFamily: theme.fonts.primary.regular,
  },
  title: {
    fontSize: 20,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
    lineHeight: 28,
  },
}));
