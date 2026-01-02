import React from "react";
import { View } from "react-native";
import { ShimmerProvider } from "react-native-fast-shimmer";
import { StyleSheet } from "react-native-unistyles";

import { ShimmerView } from "@/components/ui/shimmer-view";

export const ArticleShimmer = () => {
  return (
    <ShimmerProvider>
      <View style={styles.container}>
        <View style={styles.primaryCard}>
          <ShimmerView width="100%" height={200} style={styles.image} />
          <View style={styles.content}>
            <ShimmerView width={100} height={12} />
            <ShimmerView width="90%" height={24} />
            <ShimmerView width="80%" height={24} />
            <ShimmerView width="100%" height={16} />
            <ShimmerView width="100%" height={16} />
          </View>
        </View>

        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <ShimmerView width={80} height={12} />
                <ShimmerView width="100%" height={16} />
                <ShimmerView width="80%" height={16} />
                <ShimmerView width={60} height={12} />
              </View>
              <ShimmerView width={100} height={100} style={styles.thumbnail} />
            </View>
          </View>
        ))}
      </View>
    </ShimmerProvider>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  primaryCard: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  image: {
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    gap: theme.spacing.sm,
  },
  card: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  cardContent: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  thumbnail: {
    borderRadius: theme.borderRadius.md,
  },
}));
