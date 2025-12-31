import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useForm } from "@/hooks/use-form";
import { passwordChangeSchema } from "@/utils/auth-schema";

export const Password = () => {
  const { form, errors, update, validate } = useForm({
    schema: passwordChangeSchema,
    initialValues: { currentPassword: "", newPassword: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const theme = UnistylesRuntime.getTheme();

  const handleUpdate = async () => {
    if (!user) return;
    if (!validate()) return;

    setIsLoading(true);
    try {
      await user.updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={100}>
      <View style={styles.header}>
        <Text style={styles.title}>Update Password</Text>
        <Text style={styles.subtitle}>Enter your existing password & your new password below</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="Current Password"
          value={form.currentPassword}
          onChangeText={(t) => update("currentPassword", t)}
          error={errors.currentPassword}
          placeholder="Current Password"
          autoCapitalize="none"
          autoComplete="password"
          iconName="lock-closed-outline"
          isPassword
        />
        <View style={{ height: theme.spacing.md }} />
        <TextField
          label="New Password"
          value={form.newPassword}
          onChangeText={(t) => update("newPassword", t)}
          error={errors.newPassword}
          placeholder="New Password"
          autoCapitalize="none"
          autoComplete="password"
          iconName="lock-closed-outline"
          isPassword
        />
      </View>
      <View style={styles.footer}>
        <ElevatedButton
          title="Save Changes"
          onPress={handleUpdate}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.primary.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.primary.regular,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  footer: {
    paddingBottom: 60,
    backgroundColor: theme.colors.background,
  },
}));
