import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const StatRow = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  value?: string | number;
}) => {
  if (!value) return null;
  return (
    <View style={styles.statRow}>
      <View style={[styles.statIconCircle, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statLabel: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.regular,
  },
  statValue: {
    fontSize: 15,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
  },
}));
