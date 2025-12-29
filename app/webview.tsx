import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { WebView } from "react-native-webview";

export default function WebviewScreen() {
  const { url } = useLocalSearchParams<{ url?: string }>();
  const insets = useSafeAreaInsets();

  if (!url || typeof url !== "string") {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Invalid URL</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom, backgroundColor: "#FFF" }}>
      <WebView source={{ uri: url }} startInLoadingState style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.danger,
  },
}));
