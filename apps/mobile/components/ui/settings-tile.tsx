import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

interface SettingsTileProps {
  title: string;
  onPress?: () => void;
  isDestructive?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function SettingsTile({ title, onPress, isDestructive = false, icon }: SettingsTileProps) {
  const theme = UnistylesRuntime.getTheme();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isDestructive ? theme.colors.danger : theme.colors.textSecondary}
            style={styles.icon}
          />
        )}
        <Text style={[styles.title, isDestructive && styles.destructiveText]}>{title}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={isDestructive ? theme.colors.danger : theme.colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.text,
  },
  destructiveText: {
    color: "#E53935",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.outline,
  },
}));
