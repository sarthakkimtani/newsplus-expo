import { UniIcons } from "@/components/utils/uni-icons";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const TickerAbout = ({ about }: { about?: string }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconContainer}>
          <UniIcons name="information-circle" size={18} color="primary" />
        </View>
        <Text style={styles.cardTitle}>About</Text>
      </View>
      <Text style={styles.description}>{about}</Text>
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
  description: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.regular,
    lineHeight: 23,
  },
}));
