import { Platform } from "react-native";

export const lightTheme = {
  colors: {
    primary: "#000000",
    text: "#000000",
    textSecondary: "#666666",
    textPlaceholder: "#888888",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    outline: "#e5e5e5",
    danger: "#E53935",
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  fonts: {
    primary: {
      regular: Platform.select({
        ios: "PlusJakartaSans-Regular",
        android: "PlusJakartaSans_400Regular",
      }),
      medium: Platform.select({
        ios: "PlusJakartaSans-Medium",
        android: "PlusJakartaSans_500Medium",
      }),
      bold: Platform.select({
        ios: "PlusJakartaSans-Bold",
        android: "PlusJakartaSans_700Bold",
      }),
    },
  },
};
