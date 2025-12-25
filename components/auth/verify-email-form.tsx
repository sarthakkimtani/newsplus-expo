import { useState } from "react";
import { Alert, View } from "react-native";

import { ElevatedButton } from "@/components/ui/elevated-button";
import { TextField } from "@/components/ui/text-field";
import { useClerkAuth } from "@/hooks/use-clerk-auth";

export const VerifyEmailForm = () => {
  const { verifyEmail, getError } = useClerkAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await verifyEmail(code);
    } catch (e: any) {
      Alert.alert("Error", getError(e, "Verification failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%", gap: 20 }}>
      <TextField
        label="Verification Code"
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        importantForAutofill="yes"
        iconName="key-outline"
      />

      <ElevatedButton title="Verify Email" onPress={onSubmit} isLoading={loading} />
    </View>
  );
};
