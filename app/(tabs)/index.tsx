import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { NewsCard } from "@/components/news/news-card";
import { NewsShimmer } from "@/components/news/news-shimmer";
import { PrimaryNewsCard } from "@/components/news/primary-news-card";
import { NewsResponse } from "@/utils/types/news";

const fetchNews = async (): Promise<NewsResponse> => {
  const response = await fetch("/api/news");
  if (!response.ok) {
    throw new Error("Network response error");
  }
  return response.json();
};

export default function HomeScreen() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 15 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <NewsShimmer />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <Image source={require("@/assets/images/error.png")} style={styles.image} />
        <Text style={styles.title}>Something went wrong!</Text>
        <Text style={styles.subtitle}>Could not fetch the requested resource.</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Retry Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlashList
        data={data?.articles}
        renderItem={({ item, index }) =>
          index === 0 ? <PrimaryNewsCard article={item} /> : <NewsCard article={item} />
        }
        keyExtractor={(item, index) => item.url || index.toString()}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
}));
