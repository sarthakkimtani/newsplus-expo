import { ShimmerView } from "@/components/ui/shimmer-view";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const StockShimmer = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.shimmerCard}>
          <View style={styles.shimmerHeader}>
            <View style={styles.shimmerInfo}>
              <ShimmerView width={60} height={20} style={styles.shimmerSymbol} />
              <ShimmerView width={120} height={16} />
            </View>
            <View style={styles.shimmerPriceContainer}>
              <ShimmerView width={70} height={20} style={styles.shimmerPrice} />
              <ShimmerView width={55} height={24} />
            </View>
          </View>
          <View style={styles.shimmerOhlc}>
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerView key={i} width={50} height={32} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  shimmerCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    marginBottom: theme.spacing.sm,
  },
  shimmerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  shimmerInfo: {
    flex: 1,
  },
  shimmerSymbol: {
    marginBottom: 6,
  },
  shimmerPriceContainer: {
    alignItems: "flex-end",
  },
  shimmerPrice: {
    marginBottom: 6,
  },
  shimmerOhlc: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
  },
}));
