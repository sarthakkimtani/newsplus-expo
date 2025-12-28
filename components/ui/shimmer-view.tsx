import { ViewStyle } from "react-native";
import { Shimmer } from "react-native-fast-shimmer";
import { StyleSheet } from "react-native-unistyles";

interface ShimmerProps {
  width: number | string;
  height: number;
  style?: ViewStyle;
}

export const ShimmerView = ({ width, height, style }: ShimmerProps) => {
  return (
    <Shimmer
      style={[styles.base, { width: width as any, height }, ...(style ? [style] : [])]}
      linearGradients={["transparent", "#FFFFFF40", "transparent"]} // override colors
      speed={1.2}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    backgroundColor: theme.colors.outline,
    borderRadius: theme.borderRadius.sm,
    overflow: "hidden",
  },
}));
