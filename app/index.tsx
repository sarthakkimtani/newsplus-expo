import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Banner } from "@/components/auth/banner";
import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Banner />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Login to News+</Text>
            <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

            <View style={styles.form}>
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                iconName="mail-outline"
              />

              <TextField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                autoCapitalize="none"
                autoComplete="password"
                iconName="lock-closed-outline"
                isPassword
              />

              <ElevatedButton title="Login" onPress={handleLogin} isLoading={isLoading} />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account? </Text>
              <Pressable hitSlop={10}>
                <Text style={styles.linkBtn}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    width: "100%",
    gap: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
  footerText: {
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  linkBtn: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary.bold,
    fontSize: 14,
  },
}));
