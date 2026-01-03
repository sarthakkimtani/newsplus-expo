import { ActivityIndicator, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface ElevatedButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ElevatedButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: ElevatedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? <ActivityIndicator color={"#FFF"} /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.white,
  },
}));
