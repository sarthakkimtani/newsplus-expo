import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useForm } from "@/hooks/form/use-form";

export const Delete = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const { form, update, errors, validate } = useForm({
    schema: z.object({
      email: z.email().refine((v) => v === userEmail, {
        message: "Please enter correct email",
      }),
    }),
    initialValues: { email: "" },
  });

  const handleUpdate = async () => {
    if (!user) return;
    if (!validate()) return;

    setIsLoading(true);
    try {
      await user.delete();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={100}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirm Account Deletion</Text>
        <Text style={styles.subtitle}>Type your email to confirm deleting your account below.</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="Email"
          value={form.email}
          onChangeText={(t) => update("email", t)}
          error={errors.email}
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          iconName="mail-outline"
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
  },
  form: {
    flex: 1,
  },
  footer: {
    paddingBottom: 60,
    backgroundColor: theme.colors.background,
  },
}));
