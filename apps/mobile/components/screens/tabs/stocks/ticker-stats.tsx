import { StatRow } from "@/components/screens/tabs/stocks/stat-row";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

interface TickerStatsProps {
  industry?: string;
  sector?: string;
  employees?: string;
}

export const TickerStats = ({ industry, sector, employees }: TickerStatsProps) => {
  const theme = UnistylesRuntime.getTheme();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconContainer}>
          <Ionicons name="stats-chart" size={18} color={theme.colors.primary} />
        </View>
        <Text style={styles.cardTitle}>Key Information</Text>
      </View>
      <View style={styles.statsContainer}>
        <StatRow
          icon="business"
          iconBg="#E8F5E9"
          iconColor="#2E7D32"
          label="Industry"
          value={industry}
        />
        <View style={styles.divider} />
        <StatRow icon="layers" iconBg="#E3F2FD" iconColor="#1565C0" label="Sector" value={sector} />
        <View style={styles.divider} />
        <StatRow
          icon="people"
          iconBg="#FFF3E0"
          iconColor="#E65100"
          label="Employees"
          value={Number(employees).toLocaleString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 17,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
  },
  statsContainer: {
    gap: 0,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surface,
  },
}));
