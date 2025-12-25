import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { z } from "zod";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { nameChangeSchema, NameChangeSchema } from "@/utils/auth-schema";

export default function AccountScreen() {
  const { user } = useUser();
  const [form, setForm] = useState<NameChangeSchema>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });
  const [errors, setErrors] = useState<Partial<NameChangeSchema>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const theme = UnistylesRuntime.getTheme();

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleUpdate = async () => {
    if (!user) return;
    const result = nameChangeSchema.safeParse(form);
    if (!result.success) {
      const f = z.flattenError(result.error);
      const error = {
        firstName: f.fieldErrors.firstName?.[0],
        lastName: f.fieldErrors.lastName?.[0],
      };

      setErrors(error);
      return;
    }

    setIsLoading(true);
    try {
      await user.update({
        firstName: form.firstName,
        lastName: form.lastName,
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
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.subtitle}>Update your account details below.</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="First Name"
          value={form.firstName}
          onChangeText={(t) => update("firstName", t)}
          error={errors.firstName}
          placeholder="Enter your first name"
          autoCapitalize="words"
          autoComplete="name-given"
        />
        <View style={{ height: theme.spacing.md }} />
        <TextField
          label="Last Name"
          value={form.lastName}
          onChangeText={(t) => update("lastName", t)}
          error={errors.lastName}
          placeholder="Enter your last name"
          autoCapitalize="words"
          autoComplete="name-family"
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
}

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
