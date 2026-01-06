import { CompanyLogo } from "@/components/screens/tabs/stocks/company-logo";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const TickerHeader = ({ ticker, name }: { ticker: string; name?: string }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <CompanyLogo ticker={ticker} size="large" />
      </View>
      <Text style={styles.symbol}>{ticker}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  header: {
    alignItems: "center",
    paddingVertical: 8,
  },
  logoContainer: {
    padding: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  symbol: {
    fontSize: 28,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary.bold,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.regular,
    marginTop: 4,
    textAlign: "center",
  },
}));
