import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface TextFieldProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string;
}

export function TextField({
  label,
  iconName,
  isPassword = false,
  error,
  style,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword && !showPassword;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={!!error ? "#FF3B30" : isFocused ? "#000000" : "#888888"}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          placeholderTextColor={"#888888"}
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={10}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={"#888888"}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.text,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.outline,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 16,
  },
  inputWrapperFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },
  inputWrapperError: {
    borderColor: "#FF3B30",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: theme.fonts.primary.medium,
    color: theme.colors.text,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: theme.fonts.primary.regular,
    color: "#FF3B30",
    marginLeft: 4,
  },
}));
