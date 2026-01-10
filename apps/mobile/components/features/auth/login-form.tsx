import { useState } from "react";
import { Alert, View } from "react-native";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useClerkAuth } from "@/hooks/auth/use-clerk-auth";
import { useForm } from "@/hooks/form/use-form";
import { loginSchema } from "@/utils/auth-schema";

export const LoginForm = () => {
  const { login, getError } = useClerkAuth();

  const { form, errors, update, validate } = useForm({
    schema: loginSchema,
    initialValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (e: any) {
      Alert.alert("Error", getError(e, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%", gap: 20 }}>
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

      <TextField
        label="Password"
        value={form.password}
        onChangeText={(t) => update("password", t)}
        error={errors.password}
        placeholder="Enter Password"
        autoCapitalize="none"
        autoComplete="password"
        iconName="lock-closed-outline"
        isPassword
      />

      <ElevatedButton title="Login" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};
