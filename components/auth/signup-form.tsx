import { useState } from "react";
import { Alert, View } from "react-native";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useClerkAuth } from "@/hooks/use-clerk-auth";
import { useForm } from "@/hooks/use-form";
import { signupSchema } from "@/utils/auth-schema";

export const SignupForm = ({ onPending }: { onPending: () => void }) => {
  const { signup, getError } = useClerkAuth();
  const { form, errors, update, validate } = useForm({
    schema: signupSchema,
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(form.firstName, form.lastName, form.email, form.password);
      onPending();
    } catch (e: any) {
      Alert.alert("Error", getError(e, "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%", gap: 20 }}>
      <View style={{ gap: 10, flexDirection: "row", width: "100%" }}>
        <View style={{ flex: 1 }}>
          <TextField
            label="First Name"
            value={form.firstName}
            onChangeText={(t) => update("firstName", t)}
            error={errors.firstName}
            placeholder="John"
            autoCapitalize="words"
            autoComplete="name-given"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextField
            label="Last Name"
            value={form.lastName}
            onChangeText={(t) => update("lastName", t)}
            error={errors.lastName}
            placeholder="Doe"
            autoCapitalize="words"
            autoComplete="name-family"
          />
        </View>
      </View>
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
      <ElevatedButton title="Signup" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};
