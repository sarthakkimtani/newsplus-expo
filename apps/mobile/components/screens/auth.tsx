import { Link } from "expo-router";
import { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet } from "react-native-unistyles";

import { Banner } from "@/components/features/auth/banner";
import { LoginForm } from "@/components/features/auth/login-form";
import { SignupForm } from "@/components/features/auth/signup-form";
import { VerifyEmailForm } from "@/components/features/auth/verify-email-form";

export const Auth = ({ mode }: { mode: "login" | "signup" }) => {
  const [pending, setPending] = useState(false);
  const isLogin = mode === "login";

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={24}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Banner />

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{isLogin ? "Login" : "Signup"} to News+</Text>

            <Text style={styles.subtitle}>
              {isLogin ? "Welcome back!" : "Welcome!"} Please enter your details.
            </Text>

            {isLogin ? (
              <LoginForm />
            ) : pending ? (
              <VerifyEmailForm />
            ) : (
              <SignupForm onPending={() => setPending(true)} />
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <Link href={isLogin ? "/signup" : "/login"} replace>
                <Text style={styles.linkBtn}>{isLogin ? "Sign Up" : "Login"}</Text>
              </Link>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create((theme) => ({
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
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
