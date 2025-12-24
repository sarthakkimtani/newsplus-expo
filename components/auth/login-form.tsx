import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { z } from "zod";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useClerkAuth } from "@/hooks/use-clerk-auth";
import { loginSchema } from "@/utils/auth-schema";

export const LoginForm = () => {
  const router = useRouter();
  const { login, getError } = useClerkAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async () => {
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const f = z.flattenError(result.error);
      const error = {
        email: f.fieldErrors.email?.[0],
        password: f.fieldErrors.password?.[0],
      };

      setErrors(error);
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      router.replace("/");
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
